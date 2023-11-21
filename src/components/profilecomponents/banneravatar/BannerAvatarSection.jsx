import React from "react";
import "./banneravatarsection.scss";
import Cookies from "js-cookie";
import NoAvatar from "../../../assets/images/noprofile.jpeg";

import AvatarModel from "../../generalcomponents/avatarmodel/AvatarModel";
import BannerModel from "../../generalcomponents/bannermodel/BannerModel";

const BannerAvatarSection = () => {
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString);
  const [avatarOpen, setAvatarOpen] = React.useState(false);
  const [bannerOpen, setBannerOpen] = React.useState(false);

  const openModal = () => {
    console.log("open Modal");
    setAvatarOpen(true);
  };
  const openBannerModal = () => {
    console.log("open Modal");
    setBannerOpen(true);
  };
  return (
    <>
      <div className="profile">
        <div className="images" onClick={openBannerModal}>
          {currentUser?.banner === null ? (
            <img src={NoAvatar} alt="" className="cover" />
          ) : (
            <img src={currentUser?.banner} alt="Banner" className="cover" />
          )}
        </div>
        <div className="images-avatar" onClick={openModal}>
          {currentUser?.avatar === null ? (
            <img src={NoAvatar} alt="" className="profilePic" />
          ) : (
            <img
              src={currentUser?.avatar}
              alt="Avatar"
              className="profilePic"
            />
          )}
        </div>
      </div>
      {avatarOpen && <AvatarModel setAvatarOpen={setAvatarOpen} />}
      {bannerOpen && <BannerModel setBannerOpen={setBannerOpen} />}
    </>
  );
};

export default BannerAvatarSection;
