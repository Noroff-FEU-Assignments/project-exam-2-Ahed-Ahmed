import React from "react";
import "./recentcomments.scss";
import NoAvatar from "../../../assets/images/noprofile.jpeg";
import { useGeneralFunction } from "../../../customhooks/generalhook/useGeneralFunction";

const RecentComments = ({ comments }) => {
  const { handleViewProfileByName } = useGeneralFunction();
  const recentComments =
    comments && comments.length > 0 ? comments.slice(0, 5) : [];

  return (
    <div className="main-comment-container">
      {recentComments && recentComments.length > 0 ? (
        <p>Recent Comments</p>
      ) : null}

      {recentComments &&
        recentComments.map((comment) => (
          <div className="comments-info-container" key={comment?.id}>
            <div
              className="image-text-container"
              onClick={() => {
                handleViewProfileByName(comment?.author?.name);
              }}
            >
              <div className="profile-image-container">
                {comment?.author?.avatar ? (
                  <img src={comment.author.avatar} alt="user" />
                ) : (
                  <img src={NoAvatar} alt="default user" />
                )}
              </div>
              <div className="user">
                <p>{comment?.author?.name}</p>
              </div>
            </div>
            <div className="comment-body">
              <p>{comment?.body}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecentComments;
