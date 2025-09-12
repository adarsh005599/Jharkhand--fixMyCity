import styled from "@emotion/styled";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MuiButton from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import Logo from "/src/assets/logo1.png";

export const Button = styled(MuiButton)((props) => ({
  borderRadius: "10px",background: "linear-gradient(90deg, #0f766e, #0284c7)",
  color: "#fff",
  borderColor: "transparent",
  padding: "10px 28px",
  fontWeight: "600",
  background: "linear-gradient(90deg, #0f766e, #0284c7)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
  ":hover": {
    background: "linear-gradient(90deg, #0284c7, #0ea5e9)",
    transform: "scale(1.05)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
  },
}));
const Navbar = () => {
  const [Visible, setVisible] = useState(false);
  const [User, setUser] = useState(null);
  const [Official, setOfficial] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        isOfficial(user.uid).then((res) => {
          setOfficial(res);
        });
      }
    });
  }, []);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      {/* Navbar container with premium gradient */}
      <div
  className={`Navbar fixed top-0 left-0 w-full flex justify-between items-center px-4 
              ${scrolled ? "py-2 glass-morphism shadow-md" : "py-1 glass-morphism shadow-md"}
              lg:px-8 text-white rounded-b-3xl backdrop-blur-md transition-all duration-500 z-50`}
>
        <Link to="/">
          <div className="LogoGroup flex items-center gap-3">
            <img className="logo h-8 lg:h-12 drop-shadow-lg" src={Logo} />
            <h2 className="font-bold text-red-900 text-sm animate-typing whitespace-nowrap overflow-hidden lg:text-lg">
              FixMyCity
            </h2>
          </div>
        </Link>
        {/* Desktop Buttons */}
        {User ? (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button
              component={Link}
              to={Official ? "/official-dashboard" : "/citizen-dashboard"}
              variant="outlined"
            >
              Dashboard
            </Button>
            <Button onClick={handleLogout} variant="outlined">
              Logout
            </Button>
          </div>
        ) : (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button component={Link} to={"/official-login"} variant="outlined">
              Official Login
            </Button>
            <Button component={Link} to={"/citizen-login"} variant="outlined">
              Citizen Login
            </Button>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          className="lg:hidden text-white text-xl"
          icon={Visible ? faClose : faBars}
          onClick={() => {
            setVisible(!Visible);
          }}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`MenuMobile lg:hidden w-full text-center py-20 absolute bg-gradient-to-b from-white to-sky-50 z-10 rounded-3xl shadow-lg transition-all duration-500 ${
          Visible ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-10 font-bold text-lg">
          {User ? (
            <>
              <Link
                to={Official ? "/official-dashboard" : "/citizen-dashboard"}
                className="text-sky-700 hover:text-emerald-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sky-700 hover:text-emerald-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/citizen-login"}
                className="text-sky-700 hover:text-emerald-700 transition"
              >
                Citizen Login
              </Link>
              <Link
                to={"/official-login"}
                className="text-sky-700 hover:text-emerald-700 transition"
              >
                Official Login
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
