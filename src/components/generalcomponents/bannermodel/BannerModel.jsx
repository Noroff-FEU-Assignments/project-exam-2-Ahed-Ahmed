import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./bannermodel.scss";
import Cookies from "js-cookie";
import { useUploadBanner } from "../../../customhooks/profilehook/uploadbanner/useUploadBanner";

const BannerModel = ({ setBannerOpen }) => {
  const currentUserString = Cookies.get("userData");
  const currentUser = JSON.parse(currentUserString);
  const fileInputRef = React.useRef(null);
  const {
    handleAvatarChange,
    isImageUploaded,
    handleSubmit,
    isImageUploadedSuccessfully,
    isloading,
  } = useUploadBanner(() => setBannerOpen(false));
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleClose = () => {
    setBannerOpen(false);
  };
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Box className="mainbanner-form ">
          <div className="mainformcontainer">
            <div className="topclose">
              <CloseRoundedIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={handleClose}
              />
            </div>
            <div className="toptext">
              <span>Update Banner</span>
              <p className="username">{currentUser?.name}</p>
            </div>
            <div className="form">
              <div className="images">
                {currentUser?.banner === null ? (
                  <p>No Avatar Yet Uploaded</p>
                ) : (
                  <img
                    src={currentUser?.banner}
                    alt="banner"
                    className="cover"
                  />
                )}
              </div>
              <div className="button-section">
                {isImageUploadedSuccessfully ? (
                  <button onClick={handleSubmit} disabled={isloading}>
                    {isloading ? "Loading..." : "Update"}
                  </button>
                ) : (
                  <button
                    onClick={handleAvatarClick}
                    disabled={!isImageUploaded}
                  >
                    {isImageUploaded ? " + Upload Image" : "Loading..."}
                  </button>
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                  ref={fileInputRef}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BannerModel;
