import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CitizenLogin from "./pages/CitizenLogin";
import OfficialLogin from "./pages/OfficialLogin";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import ReportComplaint from "./pages/ReportComplaint";
import ReportedComplaints from "./components/ReportedComplaints";
import './i18n'

const router = createBrowserRouter([
  {
    element: <Layout/>,   // Navbar + Footer for all child pages
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/citizen-login", element: <CitizenLogin /> },
      { path: "/official-login", element: <OfficialLogin /> },
      { path: "/citizen-dashboard", element: <CitizenDashboard /> },
      { path: "/official-dashboard", element: <OfficialDashboard /> },
      { path: "/report", element: <ReportComplaint /> },
      { path: "/track-complaints", element: <ReportedComplaints /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
