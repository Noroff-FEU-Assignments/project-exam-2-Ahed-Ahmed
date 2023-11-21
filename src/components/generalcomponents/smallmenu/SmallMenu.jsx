import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./smallmenu.scss";
import { useDeletePost } from "../../../customhooks/postshook/useDeletePost";
import { useNavigate } from "react-router-dom";

const SmallMenu = ({ data, setIsModalOpen }) => {
  const { id } = data;
  const nivagate = useNavigate();
  const { handleOpenMenu, handleCloseMenu, handleAdd, handleDelete, anchorEl } =
    useDeletePost(() => {
      setIsModalOpen(false);
    });

  const handleEdit = (id) => {
    nivagate(`/editpost/${id}`);
  };
  return (
    <div className="change">
      <MoreVertIcon onClick={handleOpenMenu} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleAdd}>Add</MenuItem>
        <MenuItem
          onClick={() => {
            handleEdit(id);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SmallMenu;
