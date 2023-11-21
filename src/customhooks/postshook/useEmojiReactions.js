import { useState } from "react";
import Cookies from "js-cookie";

export const useEmojiReactions = (postId, emojicount) => {
  const baseurl = process.env.REACT_APP_API_URL;
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const token = currentUser?.accessToken || null;

  const [heartCount, setHeartCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const reactWithEmoji = async (emoji) => {
    try {
      const response = await fetch(
        `${baseurl}posts/${postId}/react/${encodeURIComponent(emoji)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const reactedEmoji = await response.json();
        // console.log(
        //   `Reacted to post ${postId} with emoji ${reactedEmoji.symbol}. Reaction count: ${reactedEmoji.count}`
        // );

        // Update counts based on emoji reaction
        switch (emoji) {
          case "❤️":
            setHeartCount(reactedEmoji.count);
            break;
          case "👍":
            setLikeCount(reactedEmoji.count);
            break;
          case "👎":
            setDislikeCount(reactedEmoji.count);
            break;
          default:
            break;
        }
      } else {
        console.error("Failed to react with emoji");
      }
    } catch (error) {
      console.error("Error reacting with emoji:", error);
    }
  };

  return { heartCount, likeCount, dislikeCount, reactWithEmoji };
};
