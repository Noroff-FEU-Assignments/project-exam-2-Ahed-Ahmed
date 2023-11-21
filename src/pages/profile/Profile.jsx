import React from "react";
import BannerAvatarSection from "../../components/profilecomponents/banneravatar/BannerAvatarSection";
import CurrentUserPosts from "../../components/profilecomponents/currentuserposts/CurrentUserPosts";

import "./profile.scss";
import { useGetProfileFollowed } from "../../customhooks/profilehook/profiles/useFollowedProfile";

const Profile = () => {
  const { handleFollowedAccount } = useGetProfileFollowed();
  React.useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);
  return (
    <>
      <BannerAvatarSection />
      <div className="following-container">
        <p className="following-text">Current Following</p>
        <span
          className="following-button"
          onClick={() => {
            handleFollowedAccount("testing1");
          }}
        >
          see all
        </span>
      </div>
      <div className="current-userpost-container">
        <CurrentUserPosts />
      </div>
    </>
  );
};

export default Profile;
