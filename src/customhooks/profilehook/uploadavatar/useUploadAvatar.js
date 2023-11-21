import React from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase/Firebase";
import toast from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { useUpdateUserProfileMutation } from "../../../features/profile/profileApiSlice";
import { updateAvatar } from "../../../features/posts/updateProfileSlice";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const useUploadAvatar = () => {
  const dispatch = useDispatch();
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString) || null;
  let userName;
  if (currentUser !== null) {
    userName = currentUser?.name;
  }

  let avatarimage = "";
  if (currentUser) {
    if (currentUser.avatar !== null) {
      avatarimage = currentUser.avatar;
    }
  }
  const [avatar, setAvatar] = React.useState(avatarimage);
  const [avatarurl, setAvatarUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isImageUploaded, setIsImageUploaded] = React.useState(true);

  const [updateProfile] = useUpdateUserProfileMutation();
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setIsImageUploaded(false);
    setIsLoading(true);
    const userStorageRef = ref(storage, `usersprofile/${userName}`);
    const imageRef = ref(userStorageRef, file.name);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        // console.log("Image uploaded successfully");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setAvatarUrl(downloadURL);
          setIsImageUploaded(true);
          setIsLoading(false);
          // console.log("File available at", downloadURL);
        });
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      avatar: avatarurl !== null ? avatarurl : currentUser.avatar,
      banner: currentUser.banner || null,
      name: currentUser.name,
    };

    try {
      setIsLoading(true);
      const response = await updateProfile({ data });
      console.log(response.data);
      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        const updatedUser = {
          ...currentUser,
          avatar: avatarurl || (currentUser && currentUser.avatar),
        };
        // console.log("Response", response);
        // console.log("Avatar", avatar);
        // console.log("Avatar url", avatarurl);
        dispatch(updateAvatar(avatarurl));

        Cookies.set("userData", JSON.stringify(updatedUser), { expires: 7 });
        // console.log("updated User", updatedUser);
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const isImageUploadedSuccessfully = isImageUploaded && avatarurl !== "";
  return {
    avatar,
    isImageUploaded,
    handleAvatarChange,
    isloading: isLoading,
    handleSubmit,
    isImageUploadedSuccessfully,
    avatarurl,
  };
};
