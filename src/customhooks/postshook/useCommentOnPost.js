import React from "react";
import { useAddCommentMutation } from "../../features/posts/PostApiSlice";
import toast from "react-hot-toast";

export const useAddComment = () => {
  const [body, setBody] = React.useState("");
  const [isPostLoading, setIsPostLoading] = React.useState(false);
  const [addComment] = useAddCommentMutation();

  const handleSubmit = async (e, postId) => {
    e.preventDefault();
    if (body.trim() === "") {
      toast.error("Please Add Your Comment ");
      return;
    }
    setIsPostLoading(true);
    const data = {
      body: body,
    };

    try {
      const response = await addComment({ postId, ...data }).unwrap();
      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        toast.success("Comment Added ");
        setBody("");
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsPostLoading(false);
    }
  };

  return {
    body,
    setBody,
    handleSubmit,
    isPostLoading,
  };
};
