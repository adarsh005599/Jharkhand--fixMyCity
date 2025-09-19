import { Dialog, CircularProgress } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

// The following imports were handled internally to resolve previous compilation errors.
// import { useNavigate } from "react-router-dom";
// import ComplaintDetailModal from "./components/ComplaintDetailModal";
// import SpinnerModal from "./components/SpinnerModal";
// import { auth } from "./utils/Firebase";
// import { fetchComplaints, isOfficial } from "./utils/FirebaseFunctions";
// import { Statuses, statusColors } from "./utils/enums";

// ----------------------------------------------------
// All necessary components, utilities, and logic are now
// defined within this single file to resolve import errors.
// ----------------------------------------------------

// Custom Tailwind-like color palette for a professional, "gov" feel
const officialPalette = {
  primary: "#1e3a8a", // Dark Blue
  secondary: "#d97706", // Gold/Amber
  accent: "#38bdf8", // Sky Blue
  background: "#f3f4f6", // Light Gray
  card: "#ffffff", // White
  text: "#1f2937", // Dark Gray
};

// Keyframes for a subtle fade-in animation
const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Utility Enums - Recreated from the original file
const Statuses = {
  inProgress: "In Progress",
  rejected: "Rejected",
  solved: "Solved",
};

const statusColors = {
  inProgress: "rgb(234 179 8)", // yellow-600
  rejected: "rgb(239 68 68)", // red-500
  solved: "rgb(34 197 94)", // green-500
};

// Mock Firebase Functions and Data
// In a real application, you would connect to a live Firebase project.
// This mock data is for demonstration and to make the app runnable.
const auth = {
  onAuthStateChanged: (callback) => {
    // Mock user for testing purposes
    callback({ uid: "mock-official-user" });
  },
};
const isOfficial = async (uid) => {
  // A mock function that always returns true for a successful login
  return true;
};
// Create exact timestamp for 19 Sept 2025, 2:00 PM
const fixedDate = new Date();
fixedDate.setFullYear(2025);   // Year
fixedDate.setMonth(8);         // Month → 8 = September (0-based)
fixedDate.setDate(19);         // Day
fixedDate.setHours(14, 0, 0, 0); // 2:00 PM sharp

const complaintsData = [
  { 
    id: 1, 
    reason: "Pothole on Main Street", 
    author: "Priya Sharma", 
    location: { name: "Dhanbad, Jharkhand" }, 
    timestamp: fixedDate.getTime(),   // ✅ exact 19-09 at 2PM
    status: Statuses.inProgress 
  },
  { 
    id: 2, 
    reason: "Damaged public bench", 
    author: "Shaurya Singh", 
    location: { name: "Jamshedpur, Jharkhand" }, 
    timestamp: Date.now() - 172800000, 
    status: Statuses.solved 
  },
  { 
    id: 3, 
    reason: "Streetlight not working", 
    author: "Anil Deshmukh", 
    location: { name: "Ranchi, Jharkhand" }, 
    timestamp: Date.now() - 259200000, 
    status: Statuses.rejected 
  },
  { 
    id: 4, 
    reason: "Illegal dumping", 
    author: "Soyam Singh", 
    location: { name: "Bokaro" }, 
    timestamp: Date.now() - 345600000, 
    status: Statuses.inProgress 
  },
];


const fetchComplaints = (callback) => {
  // Mock a real-time listener by calling the callback immediately with data.
  callback(complaintsData);
  return () => {}; // Return a mock unsubscribe function
};

// Component for a simple loading spinner modal
const SpinnerModal = ({ visible }) => (
  <Dialog open={visible}>
    <div className="p-8 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
      <CircularProgress />
      <p className="mt-4 text-gray-700">Loading...</p>
    </div>
  </Dialog>
);

// Component for the complaint detail modal
const ComplaintDetailModal = ({ setDialogOpen, complaint }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
      <h3 className="text-xl font-bold mb-4">Complaint Details</h3>
      <p><strong>Reason:</strong> {complaint.reason}</p>
      <p><strong>Reported By:</strong> {complaint.author}</p>
      <p><strong>Location:</strong> {complaint.location?.name}</p>
      <p><strong>Date & Time:</strong> {new Date(complaint.timestamp).toLocaleString()}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      <button
        onClick={() => setDialogOpen(false)}
        className="mt-6 w-full py-2 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-200"
      >
        Close
      </button>
    </div>
  );
};

const OfficialDashboard = () => {
  const [Complaints, setComplaints] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [complaint, setComplaint] = useState({});
  const [SpinnerVisible, setSpinnerVisible] = useState(false);
  // Replaced `useNavigate` as it's part of a router setup.
  const navigate = (path) => console.log(`Navigating to ${path}`);

  useEffect(() => {
    setSpinnerVisible(true);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/official-login");
      } else {
        isOfficial(user.uid).then((res) => {
          if (!res) {
            navigate("/official-login");
          } else {
            setSpinnerVisible(false);
          }
        });
      }
    });

    const unsubscribe = fetchComplaints(handleComplaintsUpdate);
    return () => unsubscribe(); // cleanup listener
  }, []);

  const handleComplaintsUpdate = (updatedComplaints) => {
    setComplaints(updatedComplaints);
  };

  // columns configuration is now for a standard table header
  let columns = [
    { headerName: "Complaint Reason", field: "reason", width: "w-2/6" },
    { headerName: "Reported By", field: "author", width: "w-1/6" },
    { headerName: "Reported Location", field: "location", width: "w-1/6" },
    { headerName: "Reported Date & Time", field: "timestamp", width: "w-1/6" },
    { headerName: "Status", field: "status", width: "w-1/6" },
  ];

  return (
    <>
      <style>{fadeIn}</style>
      <SpinnerModal visible={SpinnerVisible} />
      <div className={`min-h-screen bg-[#dff2f7] text-slate-800 p-4 sm:p-8 md:p-12 lg:p-16`}>
        <header className="flex items-center justify-center lg:justify-start gap-4 mb-8 lg:mb-12 animate-fadeIn">
          {/* Simple SVG icon for a "seal" feel */}
          <svg className="h-10 w-10 text-sky-700 md:h-14 md:w-14" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 112 0 1 1 0 01-2 0zm-3 0a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z"
              clipRule="evenodd"
            />
          </svg>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center lg:text-left text-slate-900 transition-colors duration-500 hover:text-sky-700"
            style={{ animation: 'fadeIn 0.5s ease-in-out' }}
          >
            Official Dashboard
          </h2>
        </header>

        <Dialog
          open={ModalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="complaint-detail-modal"
        >
          <ComplaintDetailModal
            setDialogOpen={setModalOpen}
            complaint={complaint}
          />
        </Dialog>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg transition-transform duration-500 hover:scale-[1.005]">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white font-bold uppercase text-sm">
                <th className="p-4 rounded-tl-xl">Complaint Reason</th>
                <th className="p-4">Reported By</th>
                <th className="p-4">Reported Location</th>
                <th className="p-4">Reported Date & Time</th>
                <th className="p-4 rounded-tr-xl text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {Complaints.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white border-b border-gray-200 transition-colors duration-200 hover:bg-sky-50 cursor-pointer"
                  onClick={() => {
                    setComplaint(row);
                    setModalOpen(true);
                  }}
                >
                  <td className="p-4">{row.reason}</td>
                  <td className="p-4">{row.author}</td>
                  <td className="p-4">{row.location?.name}</td>
                  <td className="p-4">
                    {new Date(row.timestamp).toLocaleDateString()} ,{" "}
                    {new Date(row.timestamp).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={clsx(
                        "StatusCol inline-block px-4 py-1 text-xs font-semibold rounded-full text-white",
                        {
                          "bg-yellow-600": row.status === Statuses.inProgress,
                          "bg-red-500": row.status === Statuses.rejected,
                          "bg-green-500": row.status === Statuses.solved,
                        }
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OfficialDashboard;
