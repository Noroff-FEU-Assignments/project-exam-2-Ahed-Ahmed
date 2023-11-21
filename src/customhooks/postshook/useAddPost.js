import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../../firebase/Firebase";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { useAddPostDataMutation } from "../../features/posts/PostApiSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const useAddPost = () => {
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString) || null;
  let userName;
  if (currentUser !== null) {
    userName = currentUser?.name;
  }
  const navigate = useNavigate();
  const [media, setMedia] = React.useState("");
  const [mediaurl, setMediaUrl] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [isImageUploaded, setIsImageUploaded] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [addpost] = useAddPostDataMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    setIsImageUploaded(false);
    setIsLoading(true);
    const userStorageRef = ref(storage, `users/${userName}`);
    const imageRef = ref(userStorageRef, file.name);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        // console.log("Image uploaded successfully");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setMediaUrl(downloadURL);
          setIsImageUploaded(true);
          setIsLoading(false);
          // console.log("File available at", downloadURL);
        });
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      data.tags = tags;
      if (media) {
        const imageUrl = mediaurl;
        data.media = imageUrl;
      }

      const response = await addpost({ data });

      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("Post Added Successfully");
        navigate("/");
        setMediaUrl("");
        setMedia("");
        reset();
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    media,
    setMedia,
    tags,
    setTags,
    handleImageChange,
    isImageUploaded,
    isloading: isLoading,
  };
};
