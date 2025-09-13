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
import ReportedComplaints from "../components/ReportedComplaints";
import SpinnerModal from "../components/SpinnerModal";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";

const CitizenDashboard = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [SpinnerVisible, setSpinnerVisible] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    setSpinnerVisible(true);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/citizen-login");
      } else {
        isOfficial(user.uid).then((res) => {
          if (res) {
            navigate("/official-dashboard");
          } else {
            setSpinnerVisible(false);
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
        paddingTop: "90px", // ✅ prevents overlap with navbar
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
     // ✅ removes black outline
    display: "flex",            // ✅ centers content
    flexDirection: "column",    // ✅ stack buttons vertically
    justifyContent: "center",   // ✅ vertical center
    alignItems: "center",       // ✅ horizontal center
    padding: "1rem",            // ✅ balance spacing
  }}
  
>
  
  <DashboardLinkButton
    icon={faEdit}
    name={"New Complaint"}
    link={"/report"}
  />
  <DashboardLinkButton
    icon={faTrafficLight}
    name={"Track Reported complaints"}
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
            border: "none", // ✅ removes black outline
          }}
        >
          <ReportedComplaints />
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
