import styled from "@emotion/styled";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MuiButton from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import Logo from "/src/assets/logo1.png";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'


// Styled gov-like button
export const Button = styled(MuiButton)(() => ({
  borderRadius: "6px",
  backgroundColor: "#1f3c88",
  color: "#fff",
  fontSize: "0.875rem",
  padding: "6px 16px",
  fontWeight: 500,
  border: "1px solid transparent",
  textTransform: "none",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: "#153369",
    textDecoration: "underline",
  },
}));

const Navbar = ({ onRegisterClick }) => {
  const [Visible, setVisible] = useState(false);
  const [User, setUser] = useState(null);
  const [Official, setOfficial] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation(); // ✅ i18next
  const [lang, setLang] = useState(i18n.language);

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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
  const newLang = i18n.language === 'en' ? 'hi' : 'en';
  i18n.changeLanguage(newLang);
  setLang(newLang); // force re-render
};

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
          <div className="ButtonGroup gap-4 hidden lg:flex items-center">
            <Button
              component={Link}
              to={Official ? "/official-dashboard" : "/citizen-dashboard"}
            >
              {t('dashboard')}
            </Button>
            <Button onClick={handleLogout}>{t('logout')}</Button>
            <button
              onClick={toggleLanguage}
              className="ml-2 px-2 py-1 bg-white text-blue-700 rounded font-semibold"
            >
              {i18n.language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        ) : (
          <div className="ButtonGroup gap-4 hidden lg:flex items-center">
            <Button onClick={onRegisterClick}>{t('register')}</Button>
            <Button component={Link} to={"/citizen-login"}>{t('citizenLogin')}</Button>
            <Button component={Link} to={"/official-login"}>{t('officialLogin')}</Button>
            <button
              onClick={toggleLanguage}
              className="ml-2 px-2 py-1 bg-white text-blue-700 rounded font-semibold"
            >
              {i18n.language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          className="lg:hidden text-white text-xl z-50"
          icon={Visible ? faClose : faBars}
          onClick={() => setVisible(!Visible)}
        />
      </div>

      {/* Mobile Menu */}
      <div

        className={`MenuMobile lg:hidden fixed inset-0 bg-gradient-to-b from-black to-sky-200 z-40 flex flex-col justify-center items-center transition-all duration-500 ${Visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        className={`MenuMobile lg:hidden fixed inset-0 bg-gradient-to-b from-black to-sky-200 z-40 flex flex-col justify-center items-center transition-all duration-500 ${
          Visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}

      >
        <ul className="flex flex-col gap-10 font-bold text-lg text-center">
          {User ? (
            <>
              <Link
                to={Official ? "/official-dashboard" : "/citizen-dashboard"}
                className="text-sky-700 hover:text-emerald-700 transition"
                onClick={() => setVisible(false)}
              >
                {t('dashboard')}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setVisible(false);
                }}

                className="text-sky-700 hover:text-emerald-700 transition"
              >
                {t('logout')}
              </button>
              <button
                onClick={() => {
                  toggleLanguage();
                  setVisible(false);
                }}

                className="text-sky-700 hover:text-emerald-700 transition"
              >
                {i18n.language === 'en' ? 'हिंदी' : 'English'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onRegisterClick();
                  setVisible(false);
                }}
                className="text-sky-700 hover:text-emerald-700 transition"
              >
                {t('register')}
              </button>
              <Link
                to={"/citizen-login"}
                className="text-sky-700 hover:text-emerald-700 transition"
                onClick={() => setVisible(false)}
              >
                {t('citizenLogin')}
              </Link>
              <Link
                to={"/official-login"}
                className="text-sky-700 hover:text-emerald-700 transition"
                onClick={() => setVisible(false)}
              >
                {t('officialLogin')}
              </Link>
               <button
    onClick={toggleLanguage}
    className="ml-2 px-2 py-1 bg-white text-blue-700 rounded font-semibold"
  >
    {i18n.language === 'en' ? 'हिंदी' : 'English'}
  </button>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

