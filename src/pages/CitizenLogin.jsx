import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../components/RegisterAccount";
import { auth } from "../utils/Firebase";
import { loginCitizen } from "../utils/FirebaseFunctions";
import SpinnerModal from "../components/SpinnerModal";

const CitizenLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [spinner, setSpinner] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // Check if citizen already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await loginCitizen({ email: user.email, password: "dummy" }).catch(() => null);
        if (userRef?.citizen) navigate("/citizen-dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setErr("");

    try {
      const user = await loginCitizen(formData);
      if (user.citizen) {
        navigate("/citizen-dashboard");
      } else {
        await auth.signOut();
        setErr("Invalid user type");
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

      {/* Card */}
      <div className="w-[90%] sm:w-[400px]  bg-gradient-to-r from-teal-700/70 to-sky-600/70  rounded-2xl shadow-xl p-8 flex flex-col items-center">
        {/* User icon */}
        <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center -mt-14 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.364 4.561 9 9 0 015.121 17.804z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white mb-6">Citizen Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {/* Email */}
          <TextField
            variant="outlined"
            placeholder="Email ID"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={spinner}
            InputProps={{
              style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" },
            }}
            InputLabelProps={{
              style: { color: "#bbb" },
            }}
          />

          {/* Password */}
          <TextField
            variant="outlined"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={spinner}
            InputProps={{
              style: { backgroundColor: "#1E2A47", color: "white", borderRadius: "8px" },
            }}
            InputLabelProps={{
              style: { color: "#bbb" },
            }}
          />

          {/* Error */}
          {err && <p className="text-red-400 text-sm">{err}</p>}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-200">
            <FormControlLabel
              control={<Checkbox sx={{ color: "white" }} />}
              label={<span className="text-gray-200">Remember me</span>}
            />
            <button type="button" className="text-gray-300 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            variant="contained"
            type="submit"
            disabled={spinner}
            className="bg-blue-900 hover:!bg-blue-800 !rounded-lg !py-3 !font-bold"
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CitizenLogin;
