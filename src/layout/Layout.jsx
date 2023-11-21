import React from "react";
import UserProfileSection from "../components/globalcomponents/userprofilesection/UserProfileSection";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import UserRightSection from "../components/globalcomponents/userrightsection/UserRightSection";
import MobileBottomBar from "../components/globalcomponents/mobilebottombar/MobileBottomBar";
import Navbar from "../components/globalcomponents/navbar/Navbar";
// import NavbarTesting from "../components/globalcomponents/navbar/NavbarTesting";

const Layout = () => {
  const [showMobileBottomBar, setShowMobileBottomBar] = React.useState(
    window.innerWidth <= 820
  );

  React.useEffect(() => {
    const handleResize = () => {
      setShowMobileBottomBar(window.innerWidth <= 820);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="leftdivision">
          <div className="leftcontent">
            <UserProfileSection />
          </div>
        </div>
        <div className="centerdivision">
          <Outlet />
        </div>
        <div className="rightdivision">
          <div className="rightcontent">
            <UserRightSection />
          </div>
        </div>
        {showMobileBottomBar && <MobileBottomBar />}
      </div>
    </>
  );
};

export default Layout;
