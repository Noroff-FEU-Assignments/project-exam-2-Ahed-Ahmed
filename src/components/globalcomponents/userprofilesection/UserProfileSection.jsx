import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { NavLink } from "react-router-dom";
import NoProfile from "../../../assets/images/noprofile.jpeg";
import { useGetUserDataFromCookies } from "../../../customhooks/currentuserhook/useGetUserDataFromCookies";
import { useGeneralFunction } from "../../../customhooks/generalhook/useGeneralFunction";
import "./userprofilesection.scss";
const UserProfileSection = () => {
  const { handleGoBackProfile } = useGeneralFunction();

  const { currentUser } = useGetUserDataFromCookies();
  if (!currentUser) {
    return null;
  }

  return (
    <div className="leftbar">
      <div className="container">
        <div className="logousercontainer">
          {/* <div className="logo">
            <img src={Logo} alt="logo" />
          </div> */}
          <div className="user" onClick={handleGoBackProfile}>
            {currentUser?.avatar !== null ? (
              <img src={currentUser?.avatar} alt="user" />
            ) : (
              <img src={NoProfile} alt="user" />
            )}
            <p>{currentUser.name}</p>
          </div>
        </div>
        <div className="menucontainer">
          <NavLink to="/" className="navlink">
            <div className="item">
              <HomeOutlinedIcon />
            </div>
          </NavLink>
          <NavLink to="/profile" className="navlink">
            <div className="item">
              <PermIdentityRoundedIcon />
            </div>
          </NavLink>
          <NavLink to="/userprofiles" className="navlink">
            <div className="item">
              <Diversity3OutlinedIcon />
            </div>
          </NavLink>
          <NavLink className="navlink">
            <div className="item">
              <NotificationsNoneRoundedIcon />
            </div>
          </NavLink>
          <NavLink to="/addpost" className="navlink">
            <div className="item">
              <ControlPointRoundedIcon />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
