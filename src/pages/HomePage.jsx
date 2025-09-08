import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterAccount from "../components/RegisterAccount";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import TrafficArt from "/src/assets/traffic-art.png";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const official = await isOfficial(user.uid);
        if (official) {
          navigate("/official-dashboard");
        } else {
          navigate("/citizen-dashboard");
        }
      }
    });
  }, [navigate]);

  return (
    <div className="HomePage">
      

        {/* Right side content */}
        <div>
          {/* <h3 className="slogan mt-[25%] lg:mt-0 leading-normal font-bold text-center text-base lg:text-[2rem]">
            Your City, Your Voice 🚦📣
          </h3> */}
          <RegisterAccount />
        </div>
    
    </div>
  );
};

export default HomePage;
