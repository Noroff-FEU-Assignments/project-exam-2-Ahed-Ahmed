import { useState } from "react";
import { useEmojiReactions } from "../../../customhooks/postshook/useEmojiReactions";
import "./emojis.scss";

const Emojis = ({ postId }) => {
  const { heartCount, likeCount, dislikeCount, reactWithEmoji } =
    useEmojiReactions(postId);

  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emojiType, emoji) => {
    if (selectedEmoji === null) {
      reactWithEmoji(emoji);
      setSelectedEmoji(emojiType);
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
        width: "280px",
        height: "40px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontSize: "20px",
          marginRight: "10px",
          cursor: selectedEmoji === null ? "pointer" : "not-allowed",
        }}
        onClick={() => handleEmojiClick("heart", "❤️")}
      >
        <div className="icontext-container">
          <div className="emoji-container">
            {" "}
            <span>❤️</span>
          </div>
          <div className="text">{heartCount}</div>
        </div>
      </span>
      <span
        style={{
          fontSize: "20px",
          marginRight: "10px",
          cursor: selectedEmoji === null ? "pointer" : "not-allowed",
        }}
        onClick={() => handleEmojiClick("like", "👍")}
      >
        <div className="icontext-container">
          <div className="emoji-container">
            {" "}
            <span>👍</span>
          </div>
          <div className="text">{likeCount}</div>
        </div>
      </span>
      <span
        style={{
          fontSize: "20px",
          marginRight: "10px",
          cursor: selectedEmoji === null ? "pointer" : "not-allowed",
        }}
        onClick={() => handleEmojiClick("dislike", "👎")}
      >
        <div className="icontext-container">
          <div className="emoji-container">
            {" "}
            <span>👎</span>
          </div>
          <div className="text">{dislikeCount}</div>
        </div>
      </span>
    </div>
  );
};

export default Emojis;
