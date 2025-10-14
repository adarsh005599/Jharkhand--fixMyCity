import {
  faEdit,
  faMobileScreen,
  faSignOut,
  faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DashboardLinkButton from "../components/DashboardLinkButton";
import SpinnerModal from "../components/SpinnerModal";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import { fetchComplaintsByUser } from "../utils/FirebaseFunctions"; // ✅ your function

const CitizenDashboard = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [SpinnerVisible, setSpinnerVisible] = useState(false);
  const [complaints, setComplaints] = useState([]); // ✅ state for complaints
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    setSpinnerVisible(true);

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/citizen-login");
      } else {
        isOfficial(user.uid).then((res) => {
          if (res) {
            navigate("/citizen-login");
          } else {
            // ✅ subscribe to this citizen's complaints
            const unsubscribeComplaints = fetchComplaintsByUser(
              user.uid,
              (complaintsList) => {
                setComplaints(complaintsList);
              }
            );
            setSpinnerVisible(false);

            // cleanup
            return () => unsubscribeComplaints();
          }
        });
      }

      if (params.get("newUser")) {
        toast.success("Registration Successful, Welcome to citizen dashboard", {
          icon: "👋",
        });
      }
    });

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      unsubscribeAuth();
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [navigate, params]);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#dff2f7",
        minHeight: "100vh",
        paddingTop: "90px",
      }}
    >
      <SpinnerModal visible={SpinnerVisible} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h2
        
        style={{
          marginBottom: "2rem",
          fontWeight: "bold",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.8fr 0.6fr",
          gap: "2rem",
          marginLeft: "2.5rem",
          marginRight: "2.5rem",
        }}
      >
        {/* Left panel - New Complaint Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
            minHeight: "300px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <DashboardLinkButton
            icon={faEdit}
            name={"New Complaint"}
            link={"/report"}
          />
          <DashboardLinkButton
            icon={faTrafficLight}
            name={"Track Reported Complaints"}
            link={"/track-complaints"}
            className={"lg:hidden"}
          />
          <DashboardLinkButton
            icon={faMobileScreen}
            name={"Install as an app (Mobile)"}
            onClick={handleInstall}
            className={"lg:hidden"}
          />
          <DashboardLinkButton
            icon={faSignOut}
            name={"Logout"}
            onClick={handleLogout}
            className={"lg:hidden"}
          />
        </div>

        {/* Right panel - Reported Complaints */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
            minHeight: "300px",
            width: "100%",
            border: "none",
            padding: "1rem",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Your Complaints
          </h3>
          {complaints.length === 0 ? (
            <p style={{ color: "#777" }}>No complaints submitted yet.</p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {complaints.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#f0f6fa",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{c.topic}</span>
                  <span>Status: {c.status}</span>
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>
                    {new Date(c.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
