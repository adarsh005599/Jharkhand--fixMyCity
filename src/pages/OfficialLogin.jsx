import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../components/RegisterAccount";
import { auth } from "../utils/Firebase";
import SpinnerModal from "../components/SpinnerModal";
import { handleLoginOrRegisterOfficial, isOfficial } from "../utils/FirebaseFunctions";
import ComradeAIWidget from "../components/ComradeAIWidget";

const OfficialLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [err, setErr] = useState(""); 
  const [spinner, setSpinner] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect if already logged in as official
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const officialOrNot = await isOfficial(user.uid);
          if (officialOrNot) {
            navigate("/official-dashboard");
          } else {
            await auth.signOut(); // not an official, sign out
          }
        } catch (error) {
          console.error("Error checking official:", error);
        }
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
      const user = await handleLoginOrRegisterOfficial(formData);

      // Always redirect if official
      if (user.official) {
        if (user.metadata?.creationTime === user.metadata?.lastSignInTime) {
          setSuccessMsg("New official account created successfully!");
        }
        navigate("/official-dashboard");
      } else {
        setErr("This account is not registered as an official.");
        await auth.signOut();
      }
    } catch (error) {
      const message = error?.message?.split(": ")[1] || error.message;
      setErr(message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center overflow-y-auto"
      style={{ backgroundColor: "#eff6ff" }}
    >
      <SpinnerModal visible={spinner} />

      <div className="w-[90%] sm:w-[400px] rounded-2xl bg-gradient-to-r from-teal-700/70 to-sky-600/70 shadow-xl p-8 flex flex-col items-center">
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

        <h2 className="text-xl font-bold text-white mb-6">Official Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <TextField
            variant="outlined"
            placeholder="Email ID"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={spinner}
            InputProps={{ style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
          />

          <TextField
            variant="outlined"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={spinner}
            InputProps={{ style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
          />

          {err && <p className="text-red-400 text-sm">{err}</p>}
          {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

          <div className="flex items-center justify-between text-sm text-gray-200">
            <FormControlLabel
              control={<Checkbox sx={{ color: "white" }} />}
              label={<span className="text-gray-200">Remember me</span>}
            />
            <button type="button" className="text-gray-300 hover:underline">Forgot Password?</button>
          </div>

          <Button
            variant="contained"
            type="submit"
            disabled={spinner}
            className="bg-blue-900 !rounded-lg !py-3 !font-bold"
          >
            Login 
          </Button>
        </form>
      </div>
      <ComradeAIWidget/>
    </div>
  );
};

export default OfficialLogin;
