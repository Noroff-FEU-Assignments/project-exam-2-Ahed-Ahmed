import React from "react";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { useGetCurrentUserPosts } from "../../../customhooks/postshook/useGetCurrentUserPosts";
import "./currentuserposts.scss";
import SinglePostModal from "../../generalcomponents/singlepostmodal/SinglePostModal";

const CurrentUserPosts = () => {
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString);
  const [singleData, SetSingleID] = React.useState(null);
  const { currentData, isloading, issuccess } = useGetCurrentUserPosts();
  const [openModal, setOpenModal] = React.useState(false);
  const handleSinglePostById = (postId) => {
    setOpenModal(true);
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
        <div>
          {currentData.map((data, index) => (
            <React.Fragment key={index}>
              <div className="userinfocontainer">
                <div className="acountcontainer">
                  <img src={currentUser?.avatar} alt={currentUser?.username} />
                </div>
                <div className="leftrightcontainer">
                  <div className="leftcontainer">
                    <div className="datelinecontainer">
                      <div className="datecontainer">
                        <p>{data?.created}</p>
                      </div>
                      <div className="rightcontainer">
                        <div
                          className="topbottomcontainer"
                          onClick={() => {
                            handleSinglePostById(data?.id);
                            SetSingleID(data);
                          }}
                        >
                          <div className="postimagecontainer">
                            <img src={data?.image} alt={data?.title} />
                          </div>

                          <div className="countscontainer">
                            <div className="countsection">
                              <RateReviewOutlinedIcon />
                              <p>{data?.count?.comments}</p>
                            </div>
                            <div className="countsection">
                              <RepeatRoundedIcon />
                              <p>{data?.count?.reactions}</p>
                            </div>
                          </div>
                          <div className="tagcontainer">
                            {data?.tag.map((tag, index) => (
                              <div key={index}>
                                <p>{tag}</p>
                              </div>
                            ))}
                          </div>
                          <div className="titlecontainer">
                            <h5>{data?.title}</h5>
                          </div>
                          <div className="descriptioncontainer">
                            <p>{data?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
          {openModal && (
            <div className="singlepostbyid">
              <SinglePostModal
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                  SetSingleID(null);
                }}
                data={singleData}
              />
            </div>
          )}
        </div>
      </>
    );
  }
};

export default CurrentUserPosts;
