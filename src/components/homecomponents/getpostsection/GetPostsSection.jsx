import React from "react";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import CircularProgress from "@mui/material/CircularProgress";
import NoProfile from "../../../assets/images/noprofile.jpeg";
import { useGetPosts } from "../../../customhooks/postshook/useGetPosts";
import { useAddComment } from "../../../customhooks/postshook/useCommentOnPost";
import Emojis from "../../generalcomponents/emojis/Emojis";
import Cookies from "js-cookie";
import "./getpostssection.scss";

import { useGeneralFunction } from "../../../customhooks/generalhook/useGeneralFunction";
const GetPostSections = () => {
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString) || null;

  const { postData, postDate, postTime, isloading, issuccess } = useGetPosts();
  const { body, setBody, handleSubmit, isPostLoading } = useAddComment();
  const {
    handleGoBackProfile,
    handleGoSinglePostPage,
    handleViewProfileByName,
  } = useGeneralFunction();

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
      <div>
        <div className="home">
          {postData.map((data, index) => (
            <div className="userinfocontainer" key={index}>
              <div className="acountcontainer">
                {data?.user?.avatar ? (
                  <img
                    src={data?.user?.avatar}
                    alt=""
                    onClick={() => {
                      handleViewProfileByName(data?.user?.name);
                    }}
                  />
                ) : (
                  <img
                    src={NoProfile}
                    alt="user"
                    onClick={() => {
                      handleViewProfileByName(data?.user?.name);
                    }}
                  />
                )}
                <div className="usename-time-container">
                  <div
                    className="username-container"
                    onClick={() => {
                      handleViewProfileByName(data?.user?.name);
                    }}
                  >
                    <p>{data?.user?.name}</p>
                  </div>
                  <div className="datetimecontainer">
                    <div className="datecontainer">
                      <p>{postDate(data?.time)} &nbsp;&nbsp;</p>
                    </div>
                    <div className="timecontainer">
                      <p style={{ fontWeight: 500, color: "#404040" }}>
                        {postTime(data?.time)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="leftrightcontainer">
                <div className="leftcontainer">
                  <div className="datelinecontainer">
                    <div className="datecontainer">
                      {/* <p>{Date(data?.created)}</p> */}
                    </div>
                    <div className="rightcontainer">
                      <div className="topbottomcontainer">
                        <div
                          className="postimagecontainer"
                          onClick={() => {
                            handleGoSinglePostPage(data?.id);
                          }}
                        >
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
                        <div className="titlecontainer">
                          <h5>{data?.title}</h5>
                        </div>
                        <div className="descriptioncontainer">
                          <p>{data?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="emoji-container">
                    <Emojis postId={data.id} />
                  </div>
                  {/* <div className="comments">
                    <RecentComments comments={data?.comments} />
                  </div> */}
                  <div className="replycontainer">
                    <div className="currentuser" onClick={handleGoBackProfile}>
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
                  <div className="border-bottom"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {showComponent && (
          <div className="singlepostbyid">
            <SinglePostModalById
              open={showComponent}
              onClose={() => setShowComponent(false)}
              data={singledata}
            />
          </div>
        )} */}
      </div>
    );
  }
};

export default GetPostSections;
