import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllProfiles } from "../../customhooks/profilehook/profiles/useGetAllProfiles";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import useFollowProfiles from "../../customhooks/profilehook/profiles/useFollowProfile";
import { useNavigate } from "react-router-dom";
import NoAvatar from "../../assets/images/noprofile.jpeg";
import "./alluserprofiles.scss";
const AllUserPrfofiles = () => {
  const navigate = useNavigate();
  const { ProfileData, isloading, issuccess } = useGetAllProfiles();
  const { handleFollowedAccount } = useFollowProfiles();

  React.useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);

  const handleViewProfileByName = (username) => {
    navigate(`/singleprofile/${username}`);
  };
  if (isloading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "8vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (issuccess) {
    return (
      <div className="followed-profiles">
        <div className="top-text-container">
          <p className="toptext">All User Profiles</p>

          {/* <span>{data?._count?.following}</span> */}
        </div>
        {ProfileData &&
          Array.isArray(ProfileData) &&
          ProfileData.map((singleprofile, index) => (
            <div className="info-main" key={index}>
              <div
                className="image-text-container"
                onClick={() => {
                  handleViewProfileByName(singleprofile?.name);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="image">
                  {singleprofile?.avatar !== null ? (
                    <img src={singleprofile?.avatar} alt="user" />
                  ) : (
                    <img src={NoAvatar} alt="user" />
                  )}
                </div>
                <div className="namefollowing-container">
                  <div className="text">
                    <p>{singleprofile?.name}</p>
                  </div>
                  <div className="followers-container">
                    <span>Followers</span>
                    <p>{singleprofile?.count?.following}</p>
                  </div>
                </div>
              </div>
              <div className="follow">
                <LibraryAddOutlinedIcon
                  style={{
                    fontSize: "18px",
                    marginTop: "8px",
                    color: "#404040",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    handleFollowedAccount(singleprofile?.name);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    );
  }
};

export default AllUserPrfofiles;
