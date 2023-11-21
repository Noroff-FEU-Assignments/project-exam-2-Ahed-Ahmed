import React, { useState, useEffect } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import "./navbartesting.scss";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import useGetProfileSearch from "../../../customhooks/profilehook/profiles/useGetProfileByName";
import LogoBlack from "../../../assets/images/logoblack.png";
import LogoWhite from "../../../assets/images/logowhite.png";
import SearchedUserAccountModal from "../../generalcomponents/searchuseraccountmodal/SearchedUserAccountModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    searchResults,
    username,
    showComponent,
    setShowComponent,
    setUsername,
    error,
    searchProfiles,
  } = useGetProfileSearch();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 4) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleSearch = () => {
    searchProfiles(username);
  };

  const handleLogOut = () => {
    Cookies.remove("userData", "");
    navigate("/login");
    toast.success("User Logout Successfully");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          <div className="logo">
            {scrolled ? (
              <img src={LogoBlack} alt="" />
            ) : (
              <img src={LogoWhite} alt="" />
            )}
          </div>
          <div className="search-bar">
            <SearchOutlined onClick={handleSearch} sx={{ cursor: "pointer" }} />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              style={{ color: scrolled ? "white" : "black" }}
            />
          </div>
          <div className="logout-button">
            <button onClick={handleLogOut}>
              <ExitToAppOutlinedIcon
                sx={{ color: scrolled ? "white" : "black" }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="profile-component">
        {showComponent && (
          <SearchedUserAccountModal
            username={searchResults?.name}
            userImage={searchResults?.avatar}
            email={searchResults?.email}
            open={showComponent}
            onClose={() => setShowComponent(false)}
            error={error}
            searchResults={searchResults}
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
