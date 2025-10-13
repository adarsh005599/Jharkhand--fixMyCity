// firebaseHelpers.js

import { 
  doc, getDoc, setDoc, collection, addDoc, onSnapshot, query, where, getDocs, updateDoc, serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./Firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const userTypes = { official: "official", citizen: "citizen" };

/* ----------------------- CITIZEN REGISTRATION ----------------------- */
export const registerCitizen = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: formData.name });

    await setDoc(doc(db, "users", user.uid), {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile || "",
      type: userTypes.citizen,
      createdAt: new Date(),
    });

    return { uid: user.uid, email: user.email, type: userTypes.citizen };
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ----------------------- CHECK USER TYPE ----------------------- */
export const isOfficial = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) return false;
    return userDoc.data().type === userTypes.official;
  } catch (error) {
    console.error("Error checking user type:", error);
    return false;
  }
};

export const getUserType = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) return null;
    return userDoc.data().type || null;
  } catch (error) {
    console.error("Error getting user type:", error);
    return null;
  }
};

/* ----------------------- OFFICIAL LOGIN / REGISTRATION ----------------------- */
export const handleLoginOrRegisterOfficial = async (formData) => {
  try {
    await setPersistence(auth, browserLocalPersistence);

    let userCredential;

    try {
      // Attempt login
      userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (loginError) {
      if (loginError.code === "auth/user-not-found") {
        // First-time official creation
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: formData.email,
          type: userTypes.official,
          createdAt: new Date(),
        });
      } else {
        throw loginError;
      }
    }

    const user = userCredential.user;
    const official = await isOfficial(user.uid);

    if (!official) {
      throw new Error("This account is not registered as an official.");
    }

    return { uid: user.uid, email: user.email, official, metadata: user.metadata };
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ----------------------- CITIZEN LOGIN ----------------------- */
export const loginCitizen = async (formData) => {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await auth.signOut();
      throw new Error("User does not exist in database.");
    }

    const userData = userDoc.data();
    if (userData.type !== userTypes.citizen) {
      await auth.signOut();
      throw new Error("Not a citizen account.");
    }

    return { uid: user.uid, email: user.email, citizen: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ----------------------- COMPLAINTS ----------------------- */
export const Statuses = {
  pending: "pending",
  inProgress: "In Progress",
  solved: "Solved",
  rejected: "Rejected",
};

export const createComplaint = async (formData, media) => {
  try {
    let mediaPath = "";
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");

    // ✅ Upload media if exists
    if (media) {
      const data = new FormData();
      data.append("file", media);
      data.append("upload_preset", "fixMyCity_preset");
      data.append("cloud_name", "dnkuwjegy");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnkuwjegy/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await res.json();
      if (!uploaded.secure_url) throw new Error("Upload to Cloudinary failed");

      mediaPath = uploaded.secure_url;
    }

    // ✅ Save complaint in Firestore
    const updatedFormData = {
      reason: formData.reason,
      additionalInfo: formData.additionalInfo,
      location: formData.location,
      reportedBy: user.uid,
      createdAt: serverTimestamp(),
      timestamp: Date.now(),
      mediaPath,
      mediaType: formData.mediaType || "",
      status: Statuses.pending,
    };

    const docRef = await addDoc(collection(db, "complaints"), updatedFormData);
    console.log("✅ Complaint created with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("❌ Error creating complaint:", error);
    throw new Error(error.message);
  }
};

export const fetchComplaintsByUser = (uid, handleComplaintsUpdate) => {
  const complaintsRef = collection(db, "complaints");
  const q = query(complaintsRef, where("reportedBy", "==", uid));

  return onSnapshot(q, async (querySnapshot) => {
    const complaints = [];

    for (const complaintDoc of querySnapshot.docs) {
      const complaintData = complaintDoc.data();
      const complaintId = complaintDoc.id;

      // Fetch comments for each complaint
      const commentsRef = collection(db, "complaints", complaintId, "comments");
      const commentsQuerySnapshot = await getDocs(commentsRef);

      const comments = commentsQuerySnapshot.docs.map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }));

      complaints.push({
        id: complaintId,
        ...complaintData,
        comments,
      });
    }

    handleComplaintsUpdate(complaints);
  });
};

export const fetchComplaints = (handleComplaintsUpdate) => {
  const complaintsCollection = collection(db, "complaints");

  return onSnapshot(
    complaintsCollection, 
    async (complaintsSnapshot) => {
      try {
        const updatedComplaints = [];

        for (const complaintDoc of complaintsSnapshot.docs) {
          const complaintData = complaintDoc.data();
          const complaintId = complaintDoc.id;
          const reportedByUserId = complaintData.reportedBy;

          // Fetch complaint author details
          let userData = { name: "Unknown" };
          try {
            const userDoc = await getDoc(doc(db, "users", reportedByUserId));
            if (userDoc.exists()) {
              userData = userDoc.data();
            }
          } catch (userError) {
            console.error("Error fetching user:", userError);
          }

          const complaintWithAuthor = {
            id: complaintId,
            author: userData.name,
            ...complaintData,
            comments: [],
          };

          // Fetch comments for this complaint
          try {
            const commentsCollection = collection(
              db,
              "complaints",
              complaintId,
              "comments"
            );

            const commentsSnapshot = await getDocs(commentsCollection);
            const comments = commentsSnapshot.docs.map((commentDoc) => ({
              id: commentDoc.id,
              ...commentDoc.data(),
            }));

            complaintWithAuthor.comments = comments;
          } catch (commentError) {
            console.error("Error fetching comments:", commentError);
          }

          updatedComplaints.push(complaintWithAuthor);
        }

        handleComplaintsUpdate(updatedComplaints);
      } catch (error) {
        console.error("Error processing complaints:", error);
      }
    },
    (error) => {
      // Error callback for onSnapshot
      console.error("Firebase listener error:", error);
      throw error;
    }
  );
};

/* ----------------------- COMMENTS ----------------------- */
export const addComment = async (complaintID, comment) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");

    const commentsCollection = collection(
      db,
      "complaints",
      complaintID,
      "comments"
    );

    const newComment = {
      author: user.uid,
      comment,
      timestamp: Date.now(),
    };

    await addDoc(commentsCollection, newComment);
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ----------------------- USERS ----------------------- */
export const fetchUserById = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.exists() ? userDocSnapshot.data() : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

/* ----------------------- STATUS UPDATES ----------------------- */
export const markAsSolved = async (complaintID) => {
  try {
    const complaint = doc(db, "complaints", complaintID);
    await updateDoc(complaint, { status: Statuses.solved });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const markAsRejected = async (complaintID) => {
  try {
    const complaint = doc(db, "complaints", complaintID);
    await updateDoc(complaint, { status: Statuses.rejected });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const markAsInProgress = async (complaintID) => {
  try {
    const complaint = doc(db, "complaints", complaintID);
    await updateDoc(complaint, { status: Statuses.inProgress });
  } catch (error) {
    throw new Error(error.message);
  }
};