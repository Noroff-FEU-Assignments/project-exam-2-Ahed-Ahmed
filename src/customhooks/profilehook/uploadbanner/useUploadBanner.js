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
import {
  setProfile,
  updateBanner,
} from "../../../features/posts/updateProfileSlice";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const useUploadBanner = (onUpdateSuccess) => {
  const dispatch = useDispatch();
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString) || null;
  let userName;
  if (currentUser !== null) {
    userName = currentUser?.name;
  }

  let bannerimage = "";
  if (currentUser) {
    if (currentUser.avatar !== null) {
      bannerimage = currentUser.banner;
    }
  }
  const [banner, setBanner] = React.useState(bannerimage);
  const [bannerurl, setBannerUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isImageUploaded, setIsImageUploaded] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [updateProfile] = useUpdateUserProfileMutation();
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
    setIsImageUploaded(false);
    setIsLoading(true);
    const userStorageRef = ref(storage, `usersprofile/${userName}`);
    const imageRef = ref(userStorageRef, file.name);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        // console.log("Image uploaded successfully");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setBannerUrl(downloadURL);
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
      avatar: currentUser.banner || null,
      banner: bannerurl !== null ? bannerurl : currentUser.banner,
      name: currentUser.name,
    };

    try {
      setIsLoading(true);
      const response = await updateProfile({ data });
      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        console.log(response);
        const updatedUser = {
          ...currentUser,
          banner: bannerurl || (currentUser && currentUser.banner),
        };
        dispatch(updateBanner(response));
        dispatch(setProfile(response));
        Cookies.set("userData", JSON.stringify(updatedUser), { expires: 7 });
        onUpdateSuccess();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const isImageUploadedSuccessfully = isImageUploaded && bannerurl !== "";
  return {
    banner,
    isImageUploaded,
    handleAvatarChange,
    isloading: isLoading,
    handleSubmit,
    isImageUploadedSuccessfully,
    bannerurl,
    isModalOpen,
  };
};
