import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import "./mobilebottombar.scss";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const MobileBottomBar = () => {
  const naviagte = useNavigate();
  const handleLogOut = () => {
    Cookies.remove("userData", "");
    naviagte("/login");
    toast.success("User Logout Successfully");
  };
  return (
    <div className="bottom-bar">
      <NavLink to="/" className="navlink">
        <div className="bottom-link">
          <HomeOutlinedIcon />
        </div>
      </NavLink>
      <NavLink to="/userprofiles" className="navlink">
        <div className="bottom-link">
          <Diversity3OutlinedIcon />
        </div>
      </NavLink>
      <NavLink to="/addpost" className="navlink">
        <div className="bottom-link">
          <ControlPointRoundedIcon />
        </div>
      </NavLink>
      <NavLink to="/profile" className="navlink">
        <div className="bottom-link">
          <PermIdentityRoundedIcon />
        </div>
      </NavLink>
      <div
        className="navlink"
        style={{ cursor: "pointer" }}
        onClick={handleLogOut}
      >
        <div className="bottom-link">
          <ExitToAppOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default MobileBottomBar;
