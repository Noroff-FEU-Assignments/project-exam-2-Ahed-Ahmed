import React from "react";
import "./searcheduseraccountmodal.scss";
import { Box, Modal } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "24%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 290,
  height: 200,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  padding: "5px 5px 20px 15px",
  outline: "none",
};
const SearchedUserAccountModal = ({
  userImage,
  username,
  email,
  open,
  onClose,
  error,
  searchResults,
}) => {
  const navigate = useNavigate();
  const handleAccount = (username) => {
    navigate(`singleprofile/${username}`);
    onClose();
  };
  return (
    <Modal
      open={open}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <Box sx={style} className="mainform">
        <div className="profile-container">
          <div className="topclose" onClick={onClose}>
            <CloseRoundedIcon sx={{ color: "red" }} />
          </div>
          {searchResults !== null ? (
            <div
              className="user-profile-card"
              onClick={() => {
                handleAccount(username);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="user-image-container">
                <img src={userImage} alt="User" className="user-image" />
              </div>
              <div className="email-name-container">
                <p className="username">{username}</p>
                <p className="email">{email}</p>
              </div>
            </div>
          ) : (
            <div className="error-message">
              <p>No user data available</p>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default SearchedUserAccountModal;
