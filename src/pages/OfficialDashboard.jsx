import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SpinnerModal from "../components/SpinnerModal";
import { auth } from "../utils/Firebase";
import { isOfficial, fetchComplaints, Statuses } from "../utils/FirebaseFunctions";

const OfficialDashboard = () => {
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeComplaints = null;
    let unsubscribeAuth = null;

    const initializeDashboard = async () => {
      unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
        if (!user) {
          navigate("/official-login");
          return;
        }

        try {
          const official = await isOfficial(user.uid);
          if (!official) {
            toast.error("Not authorized as official");
            await auth.signOut();
            navigate("/official-login");
            return;
          }

          // Subscribe to all complaints with error handling
          try {
            unsubscribeComplaints = fetchComplaints((complaintsList) => {
              setComplaints(complaintsList);
              setSpinnerVisible(false);
            });
          } catch (fetchError) {
            console.error("Error fetching complaints:", fetchError);
            toast.error("Permission denied. Please check Firestore rules.");
            setSpinnerVisible(false);
          }
        } catch (error) {
          console.error("Error checking authorization:", error);
          toast.error("Error loading dashboard: " + error.message);
          setSpinnerVisible(false);
        }
      });
    };

    initializeDashboard();

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeComplaints) unsubscribeComplaints();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/official-login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case Statuses.pending:
        return "#fbbf24"; // yellow
      case Statuses.inProgress:
        return "#3b82f6"; // blue
      case Statuses.solved:
        return "#10b981"; // green
      case Statuses.rejected:
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  };

  const getStatusBadgeStyle = (status) => ({
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "600",
    backgroundColor: getStatusColor(status),
    color: "white",
  });

  return (
    <div
      style={{
        backgroundColor: "#dff2f7",
        minHeight: "100vh",
        padding: "90px",
      }}
    >
      <SpinnerModal visible={spinnerVisible} />
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

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1e40af",
          }}
        >
          Official Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faSignOut} />
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            Total Complaints
          </h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e40af" }}>
            {complaints.length}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            Pending
          </h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#fbbf24" }}>
            {complaints.filter((c) => c.status === Statuses.pending).length}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            In Progress
          </h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>
            {complaints.filter((c) => c.status === Statuses.inProgress).length}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            Solved
          </h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>
            {complaints.filter((c) => c.status === Statuses.solved).length}
          </p>
        </div>
      </div>

      {/* Complaints List */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#1e40af",
          }}
        >
          All Complaints
        </h2>

        {complaints.length === 0 ? (
          <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
            No complaints found
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => setSelectedComplaint(complaint)}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                      {complaint.reason}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Reported by: {complaint.author || "Unknown"}
                    </p>
                  </div>
                  <span style={getStatusBadgeStyle(complaint.status)}>
                    {complaint.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#374151", marginBottom: "0.5rem" }}>
                  {complaint.additionalInfo}
                </p>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  <span>📍 {typeof complaint.location === 'object' ? complaint.location.name || 'Unknown Location' : complaint.location || 'Unknown Location'}</span>
                  <span style={{ marginLeft: "1rem" }}>
                    🕐 {complaint.timestamp ? new Date(complaint.timestamp).toLocaleString() : "N/A"}
                  </span>
                </div>
                {complaint.comments && complaint.comments.length > 0 && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#6b7280" }}>
                    💬 {complaint.comments.length} comment(s)
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div
          onClick={() => setSelectedComplaint(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              padding: "2rem",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
              {selectedComplaint.reason}
            </h2>
            <div style={{ marginBottom: "1rem" }}>
              <span style={getStatusBadgeStyle(selectedComplaint.status)}>
                {selectedComplaint.status}
              </span>
            </div>
            <p style={{ marginBottom: "1rem" }}>{selectedComplaint.additionalInfo}</p>
            <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>
              📍 Location: {typeof selectedComplaint.location === 'object' 
                ? selectedComplaint.location.name || 'Unknown Location' 
                : selectedComplaint.location || 'Unknown Location'}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
              👤 Reported by: {selectedComplaint.author}
            </p>
            {selectedComplaint.mediaPath && (
              <img
                src={selectedComplaint.mediaPath}
                alt="Complaint"
                style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }}
              />
            )}
            <button
              onClick={() => setSelectedComplaint(null)}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficialDashboard;
