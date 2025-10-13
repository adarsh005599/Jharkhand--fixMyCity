import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../components/RegisterAccount";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import SpinnerModal from "../components/SpinnerModal";
import ComradeAIWidget from "../components/ComradeAIWidget";
import { auth } from "../utils/Firebase";
import { handleLoginOrRegisterOfficial, isOfficial } from "../utils/FirebaseFunctions";

import { useTranslation } from "react-i18next";
import i18n from "../i18n"; // import i18n instance

const OfficialLogin = () => {
  const { t } = useTranslation(); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [spinner, setSpinner] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in as official
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = auth.currentUser;
      if (user) {
        const officialOrNot = await isOfficial(user.uid);
        if (officialOrNot) navigate("/official-dashboard");
      }
    };
    checkLoggedIn();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setErr("");
    setSuccessMsg("");

    try {
      const result = await handleLoginOrRegisterOfficial(formData);
      if (result.official) {
        // Check if this is a new account by comparing metadata timestamps
        const { creationTime, lastSignInTime } = result.metadata || {};
        if (creationTime && lastSignInTime && creationTime === lastSignInTime) {
          setSuccessMsg(t("newOfficialCreated"));
        }
        navigate("/official-dashboard");
      } else {

        setErr(t("notRegisteredOfficial"));
        await signOut(auth);
      }
    } catch (error) {
      setErr(error.message);
    } finally {
      setSpinner(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-y-auto bg-gradient-to-br from-sky-100 to-blue-50 relative">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,#00000011_25%,transparent_25%,transparent_50%,#00000011_50%,#00000011_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>

      <SpinnerModal visible={spinner} />

      <div className="w-[90%] sm:w-[400px] rounded-2xl bg-gradient-to-r from-teal-700/70 to-sky-600/70 shadow-xl p-8 flex flex-col items-center">
        {/* User Icon */}
        <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center -mt-14 mb-6">
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

        <h2 className="text-xl font-bold text-white mb-6">{t("officialLogin")}</h2>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="mb-4 px-3 py-1 bg-white text-blue-700 rounded font-semibold"
        >
          {i18n.language === "en" ? "हिंदी" : "English"}
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {/* Email */}
          <TextField
            variant="outlined"
            placeholder={t("email")}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={spinner}
            InputProps={{ style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
          />

          {/* Password */}
          <TextField
            variant="outlined"
            placeholder={t("password")} 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={spinner}
            InputProps={{ style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
          />

          {/* Errors/Success */}
          {err && <p className="text-red-400 text-sm">{err}</p>}
          {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-200">
            <FormControlLabel
              control={<Checkbox sx={{ color: "white" }} />}
              label={<span className="text-gray-200">{t("rememberMe")}</span>}
            />
            <button type="button" className="text-gray-300 hover:underline">
              {t("forgotPassword")}
            </button>
          </div>

          {/* Login Button */}
          <Button
            variant="contained"
            type="submit"
            disabled={spinner}
            className="bg-blue-900 !rounded-lg !py-3 !font-bold"
          >
            {t("login")}
          </Button>
        </form>
      </div>
      <ComradeAIWidget />
    </div>
  );
};

export default OfficialLogin;
