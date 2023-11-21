import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllProfiles } from "../../../customhooks/profilehook/profiles/useGetAllProfiles";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import useFollowProfiles from "../../../customhooks/profilehook/profiles/useFollowProfile";
import { useNavigate } from "react-router-dom";
import NoAvatar from "../../../assets/images/noprofile.jpeg";
import "./allprofiles.scss";

const AllProfiles = () => {
  const navigate = useNavigate();
  const { ProfileData, isloading, issuccess } = useGetAllProfiles();
  const { profiled, handleFollowedAccount, setProfiles } = useFollowProfiles();
  React.useEffect(() => {
    if (issuccess && ProfileData) {
      setProfiles(ProfileData);
    }
  }, [ProfileData]);
  const handleViewProfileByName = (username) => {
    navigate(`/singleprofile/${username}`);
  };

  const handleNavigate = () => {
    navigate("/userprofiles");
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
      <>
        <div className="main-container">
          {profiled.slice(0, 7).map((profile, index) => (
            <React.Fragment key={index}>
              <div className="info-container">
                <div
                  className="image-info-container"
                  onClick={() => {
                    handleViewProfileByName(profile?.name);
                  }}
                >
                  <div className="image-container">
                    {profile?.avatar !== null ? (
                      <img src={profile?.avatar} alt="user" />
                    ) : (
                      <img src={NoAvatar} alt="user" />
                    )}
                  </div>
                  <div className="right-text">
                    <div className="name">
                      <p>{profile?.name}</p>
                    </div>
                    <div className="followers">
                      <span>Followers : </span>{" "}
                      <p>{profile?.count?.followers}</p>
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
                      handleFollowedAccount(profile?.name);
                    }}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
          <span className="following-button" onClick={handleNavigate}>
            See All User Profiles
          </span>
        </div>
      </>
    );
  }
};

export default AllProfiles;
