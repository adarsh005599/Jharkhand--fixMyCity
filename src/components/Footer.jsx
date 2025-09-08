import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [hidden, setHidden] = useState(false);


  return (
   <footer
  style={{
    background: "linear-gradient(90deg, #334155, #0d9488)",
  }}
  className="w-full rounded-md backdrop-blur-md shadow-xl border-t border-gray-700 px-4 py-3 lg:px-6"
>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
         
          <h2 className="font-bold text-lg tracking-wide bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            FixMyCity
          </h2>
        </div>

        {/* Quick Links */}
        <ul className="flex gap-5 text-sm font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Report Issue", path: "/report" },
            { name: "Track Complaints", path: "/track-complaints" },
            { name: "Citizen Login", path: "/citizen-login" },
            { name: "Official Login", path: "/official-login" },
          ].map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                className="relative group text-gray-200 hover:text-teal-400 transition duration-300"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-300">
          {[
            { Icon: FaFacebookF, link: "https://facebook.com" },
            { Icon: FaTwitter, link: "https://twitter.com" },
            { Icon: FaLinkedinIn, link: "https://linkedin.com" },
            { Icon: FaInstagram, link: "https://instagram.com" },
          ].map(({ Icon, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-teal-500 hover:text-white transition duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-300 text-center lg:text-right">
          © {new Date().getFullYear()} <span className="text-rose-700 font-extrabold">FixMyCity</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
