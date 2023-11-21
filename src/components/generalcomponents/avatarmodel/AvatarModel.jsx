import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./avatarmodel.scss";
import { useUploadAvatar } from "../../../customhooks/profilehook/uploadavatar/useUploadAvatar";
import Cookies from "js-cookie";
const AvatarModel = ({ setAvatarOpen }) => {
  const currentUserString = Cookies.get("userData");
  const currentUser = JSON.parse(currentUserString);
  const fileInputRef = React.useRef(null);
  const {
    handleAvatarChange,
    isImageUploaded,
    handleSubmit,
    isImageUploadedSuccessfully,
    isloading,
  } = useUploadAvatar();
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleClose = () => {
    setAvatarOpen(false);
  };
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Box className="mainavatar-form">
          <div className="mainformcontainer">
            <div className="topclose">
              <CloseRoundedIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={handleClose}
              />
            </div>
            <div className="toptext">
              <span>Update Avatar</span>
              <p className="username">{currentUser?.name}</p>
            </div>
            <div className="form">
              <div className="images">
                {currentUser?.avatar === null ? (
                  <p>No Avatar Yet Uploaded</p>
                ) : (
                  <img
                    src={currentUser?.avatar}
                    alt="Avatar"
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

export default AvatarModel;
