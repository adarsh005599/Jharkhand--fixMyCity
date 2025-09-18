import styled from "@emotion/styled";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MuiButton from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import Logo from "/src/assets/logo1.png";

// Styled gov-like button
export const Button = styled(MuiButton)(() => ({
  borderRadius: "6px",
  backgroundColor: "#1f3c88", // deep gov blue
  color: "#fff",
  fontSize: "0.875rem", // smaller
  padding: "6px 16px",
  fontWeight: 500,
  border: "1px solid transparent",
  textTransform: "none",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: "#153369", // slightly darker on hover
    textDecoration: "underline",
  },
}));

const Navbar = ({ onRegisterClick }) => {
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
        isOfficial(user.uid).then((res) => setOfficial(res));
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
      <div
        className={`Navbar fixed top-0 left-0 w-full flex justify-between items-center px-4 
          ${scrolled ? "py-1 glass-morphism shadow-md" : "py-1 glass-morphism shadow-md"}
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
          <div className="ButtonGroup gap-4 hidden lg:flex">
            <Button
              component={Link}
              to={Official ? "/official-dashboard" : "/citizen-dashboard"}
            >
              Dashboard
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="ButtonGroup gap-4 hidden lg:flex">
            <Button onClick={onRegisterClick}>Register</Button>
            <Button component={Link} to={"/citizen-login"}>
              Citizen Login
            </Button>
            <Button component={Link} to={"/official-login"}>
              Official Login
            </Button>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          className="lg:hidden text-white text-xl"
          icon={Visible ? faClose : faBars}
          onClick={() => setVisible(!Visible)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`MenuMobile lg:hidden w-full text-center py-20 absolute bg-gradient-to-b from-black to-sky-200 z-10 cursor-pointer rounded-3xl transition-all duration-500 ${
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
              <button
                onClick={onRegisterClick}
                className="text-sky-700 hover:text-emerald-700 transition"
              >
                Register
              </button>
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
