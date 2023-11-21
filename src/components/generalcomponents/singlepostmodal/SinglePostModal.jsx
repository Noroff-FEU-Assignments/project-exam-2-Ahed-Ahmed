import React from "react";
import { Box, Modal } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./singlepostmodal.scss";
import SmallMenu from "../smallmenu/SmallMenu";
const SinglePostModal = ({ open, onClose, data }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Box className="mainform">
          <div className="profile-container">
            <div className="top-header-container">
              <div className="topclose" onClick={onClose}>
                <CloseRoundedIcon sx={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="change">
                <SmallMenu data={data} setIsModalOpen={onClose} />
              </div>
            </div>
            <div className="singlepostdatacontainer">
              <div className="image-container">
                <img
                  src={data?.image}
                  alt={data?.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="title-container">
                <p>{data?.title}</p>
              </div>
              <div className="description-container">
                <p>{data?.description}</p>
              </div>
              <div className="count-container">
                <p>
                  {" "}
                  Comments:<span> {data?.count?.comments}</span>
                </p>
                <p>
                  {" "}
                  Reactions:<span> {data?.count?.reactions} </span>
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SinglePostModal;
