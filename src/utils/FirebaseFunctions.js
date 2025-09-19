// firebaseHelpers.js

import { 
  doc, 
  getDoc, 
  setDoc, 
  collection,   // ✅ add this
  addDoc,       // if you use addDoc for complaints
  onSnapshot,   // if you use real-time listeners
  query,        // if you use queries
  where,        // if you use filters
  getDocs       // if you fetch documents
} from "firebase/firestore";


import { auth, db } from "./Firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

export const userTypes = { official: "official", citizen: "citizen" };

/* ----------------------- USER AUTH ----------------------- */

// Citizen registration
export const registerCitizen = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: formData.name });

    // Save citizen profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile || "",
      type: userTypes.citizen,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Check if a user is official
export const isOfficial = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) return false;


        // !== for the official login donot login the citizen
        // === for the user one
    const userData = userDocSnapshot.data();
    return userData.type === userTypes.official;
  } catch (error) {
    console.error("Error checking user type:", error);
    return false;
  }
};
export const getUserType = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) return null;

    const userData = userDocSnapshot.data();
    return userData.type || null;
  } catch (error) {
    console.error("Error getting user type:", error);
    return null;
  }
};

/* ----------------------- OFFICIAL LOGIN / FIRST-TIME CREATION ----------------------- */
// firebaseHelpers.js
export const handleLoginOrRegisterOfficial = async (formData) => {
  try {
    await setPersistence(auth, browserLocalPersistence);

    let userCredential;

    try {
      // Try login first
      userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
    } catch (loginError) {
      if (loginError.code === "auth/user-not-found") {
        // First-time official registration
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
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

    // ✅ return a safe plain object
    return {
      uid: user.uid,
      email: user.email,
      official,
      metadata: user.metadata,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


/* ----------------------- CITIZEN LOGIN ----------------------- */
export const loginCitizen = async (formData) => {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      await auth.signOut();
      throw new Error("User does not exist in database.");
    }

    const userData = userDocSnapshot.data();
    if (userData.type !== userTypes.citizen) {
      await auth.signOut();
      throw new Error("Not a citizen account.");
    }

    return { ...user, citizen: true };
  } catch (error) {
    throw new Error(error.message);
  }
   
};
/* ----------------------- COMPLAINTS ----------------------- */
export const createComplaint = async (formData, media) => {
  try {
    let mediaPath = "";

    // Upload media if exists
    if (media) {
      const data = new FormData();
      data.append("file", media);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      });

      const uploaded = await res.json();
      if (!uploaded.url) throw new Error("Upload to Cloudinary failed");

      mediaPath = uploaded.url;
    }

    // Save complaint in Firestore
    const updatedFormData = {
      ...formData,
      timestamp: Date.now(),
      mediaPath, // Cloudinary URL or empty string
      status: Statuses.pending,
    };

    await addDoc(collection(db, "complaints"), updatedFormData);
  } catch (error) {
    console.error("Error creating complaint:", error);
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

  return onSnapshot(complaintsCollection, async (complaintsSnapshot) => {
    const updatedComplaints = [];

    for (const complaintDoc of complaintsSnapshot.docs) {
      const complaintData = complaintDoc.data();
      const complaintId = complaintDoc.id;
      const reportedByUserId = complaintData.reportedBy;

      // Fetch complaint author details
      const userDoc = await getDoc(doc(db, "users", reportedByUserId));
      const userData = userDoc.exists() ? userDoc.data() : { name: "Unknown" };

      const complaintWithAuthor = {
        id: complaintId,
        author: userData.name,
        ...complaintData,
        comments: [],
      };

      // Subscribe to comments for this complaint
      const commentsCollection = collection(
        db,
        "complaints",
        complaintId,
        "comments"
      );

      onSnapshot(commentsCollection, (commentsSnapshot) => {
        const comments = commentsSnapshot.docs.map((commentDoc) => ({
          id: commentDoc.id,
          ...commentDoc.data(),
        }));

        complaintWithAuthor.comments = comments;
        handleComplaintsUpdate([...updatedComplaints, complaintWithAuthor]);
      });

      updatedComplaints.push(complaintWithAuthor);
    }

    handleComplaintsUpdate(updatedComplaints);
  });
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
