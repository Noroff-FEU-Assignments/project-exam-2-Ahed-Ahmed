import React from "react";
import { useGetProfileFollowed } from "../../../customhooks/profilehook/profiles/useFollowedProfile";
import CircularProgress from "@mui/material/CircularProgress";
import "./followedprofiles.scss";
import { useUnFollowProfile } from "../../../customhooks/profilehook/profiles/useUnFollowProfile";
const FollowedAccount = () => {
  const { data, isloading, issuccess } = useGetProfileFollowed();
  const { handleUnFollowedAccount } = useUnFollowProfile();
  React.useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);
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
          <p className="toptext">Accounts Followed By You</p>

          <span>{data?._count?.following}</span>
        </div>
        {data?.following &&
          Array.isArray(data.following) &&
          data.following.map((singleprofile, index) => (
            <div className="info-main" key={index}>
              <div className="image-text-container">
                <div className="image">
                  <img src={singleprofile?.avatar} alt="user" />
                </div>
                <div className="text">
                  <p>{singleprofile?.name}</p>
                </div>
              </div>
              <div
                className="unfollow"
                onClick={() => {
                  handleUnFollowedAccount(singleprofile?.name);
                }}
              >
                <p>unfollow</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
};

export default FollowedAccount;
