import React from "react";
import { Box, Modal } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAddComment } from "../../../customhooks/postshook/useCommentOnPost";
import Emojis from "../emojis/Emojis";
import Cookies from "js-cookie";
import "./singlepostmodalbyid.scss";
const SinglePostModal = ({ open, onClose, data }) => {
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString) || null;
  const { body, setBody, handleSubmit, isPostLoading } = useAddComment();
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
            </div>
            <div className="singlepostdatacontainer">
              <div className="image-container">
                <img
                  src={data?.media}
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
                <p>{data?.body}</p>
              </div>
              <div className="count-container">
                <p>
                  {" "}
                  Comments:<span> {data?._count?.comments}</span>
                </p>
                <p>
                  {" "}
                  Reactions:<span> {data?._count?.reactions} </span>
                </p>
              </div>
            </div>
            <div className="emojis-container">
              <Emojis postId={data.id} />
            </div>
            <div className="replycontainer">
              <div className="currentuser">
                <img src={currentUser?.avatar} alt="user" />
              </div>
              <form
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <textarea
                  required
                  placeholder="comment here..."
                  rows={2}
                  onChange={(e) => setBody(e.target.value)}
                  name="body"
                  value={body}
                />

                <button
                  className="post-button"
                  type="submit"
                  disabled={isPostLoading}
                  onClick={(e) => handleSubmit(e, data.id)}
                >
                  {isPostLoading ? "Loading.." : "Post"}
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SinglePostModal;
