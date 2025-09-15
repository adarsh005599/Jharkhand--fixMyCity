import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [hidden, setHidden] = useState(false);


  return (
   <footer
  // style={{
  //   background: "linear-gradient(90deg, #334155, #0d9488)",
  // }}
  className="w-full text-black rounded-md backdrop-blur-md glass-morphism shadow-md  px-4 py-3 lg:px-6"
>
      <div className="flex flex-col rounded-md glass-morphism lg:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">

         <img

  className="h-8 lg:h-9 drop-shadow-md"
  src="/logo1.png"
  alt="FixMyCity Logo"
/>

          <h2 className="font-bold text-lg tracking-wide bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            FixMyCity
          </h2>
        </div>
    
        {/* Quick Links */}
        <ul className="flex gap-5 text-sm font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Report Issue", path: "/citizen-login" },
            { name: "Track Complaints", path: "/track-complaints" },
            { name: "Citizen Login", path: "/citizen-login" },
            { name: "Official Login", path: "/official-login" },
          ].map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                className="relative group text-black hover:text-blue-900 transition duration-300"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 text-black">
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
              className="p-2 rounded-full bg-white/10 hover:bg-blue-900 hover:text-white transition duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-black text-center lg:text-right">
          © {new Date().getFullYear()} <span className="text-rose-700 font-extrabold">FixMyCity</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
