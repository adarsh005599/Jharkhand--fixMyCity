import styled from "@emotion/styled";
import { Button } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCitizen } from "../utils/FirebaseFunctions";
import SpinnerModal from "../components/SpinnerModal";
import CivicReportingPlatform from "./CivicReportingPlatform";
import ComradeAIWidget from "../components/ComradeAIWidget";
import SocketChatWidget from "./SocketChatWidget";
import Navbar from "./Navbar";
import { useTranslation } from "react-i18next"; // ✅ import

// Styled TextField
export const TextField = styled(MuiTextField)(() => ({
  width: "100%",
  [`& fieldset`]: {
    borderRadius: "12px",
  },
}));

const RegisterAccount = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation(); // ✅ use translation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    setSpinner(true);
    setErr(null);
    try {
      await registerCitizen(formData);
      navigate("/citizen-dashboard?newUser=true");
    } catch (error) {
      const message = error?.message?.split(": ")[1] || error.message;
      setErr(message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-auto">
      <SpinnerModal visible={spinner} />
      <Navbar onRegisterClick={() => setShowForm(true)} />

      {/* FULLSCREEN BACKGROUND */}
      <div className="absolute inset-0">
        <CivicReportingPlatform />
      </div>

      {/* Registration Modal */}
      {showForm && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[400px] bg-teal-700 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center z-20">
          <p
            className="text-sm text-blue-200 cursor-pointer hover:underline self-start mb-2"
            onClick={() => setShowForm(false)}
          >
            {t("back")}
          </p>

          <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center -mt-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1118.364 4.561 9 9 0 015.121 17.804z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-white mb-6 text-center">
            {t("registerAccount")}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <TextField
              variant="outlined"
              placeholder={t("fullName")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={spinner}
              InputProps={{
                style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" },
              }}
            />
            <TextField
              variant="outlined"
              placeholder={t("email")}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={spinner}
              InputProps={{
                style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" },
              }}
            />
            <TextField
              variant="outlined"
              placeholder={t("phone")}
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              required
              disabled={spinner}
              InputProps={{
                style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" },
              }}
            />
            <TextField
              variant="outlined"
              placeholder={t("password")}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={spinner}
              InputProps={{
                style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" },
              }}
            />
            <TextField
              variant="outlined"
              placeholder={t("confirmPassword")}
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              disabled={spinner}
              InputProps={{
                style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" },
              }}
            />

            {err && <p className="text-red-400 text-sm text-center">{err}</p>}

            <Button
              variant="contained"
              type="submit"
              disabled={spinner || !!err}
              className="!bg-blue-700 hover:!bg-blue-800 !rounded-lg !py-3 !font-bold"
            >
              {spinner ? t("registering") : t("register")}
            </Button>
          </form>
        </div>
      )}

      <ComradeAIWidget />
      <SocketChatWidget />
    </div>
  );
};

export default RegisterAccount;
