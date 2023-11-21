import { useDeletePostMutation } from "../../features/posts/PostApiSlice";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const useDeletePost = (onUpdateSuccess) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deletepost] = useDeletePostMutation();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    navigate("/addpost");
  };

  const handleDelete = async (id) => {
    try {
      setAnchorEl(null);
      setLoading(true);
      const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (!confirmed) {
        return;
      }
      const response = await deletepost(id);
      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        toast.success("Record Deleted Successfully");
        onUpdateSuccess();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleOpenMenu,
    handleCloseMenu,
    handleAdd,
    handleDelete,
    anchorEl,
    isloading: isLoading,
    isModalOpen,
  };
};
