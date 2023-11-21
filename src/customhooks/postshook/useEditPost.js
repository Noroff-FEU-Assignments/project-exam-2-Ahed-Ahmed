import React from "react";
import {
  useEditPostDataMutation,
  useGetCurrentUserSinglePostDataQuery,
} from "../../features/posts/PostApiSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../../firebase/Firebase";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const useEditPost = (id) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const currentUserString = Cookies.get("userData") || null;
  const currentUser = JSON.parse(currentUserString) || null;
  let userName;
  if (currentUser !== null) {
    userName = currentUser?.name;
  }

  const [postData, setPostData] = React.useState({
    title: "",
    body: "",
    tags: "",
    media: null,
  });

  const { data: fetchedPostData, isSuccess } =
    useGetCurrentUserSinglePostDataQuery(id);
  const [updatePost] = useEditPostDataMutation();
  const [media, setMedia] = React.useState("");
  const [mediaurl, setMediaUrl] = React.useState("");
  const [defaultMediaUrl, setDefaultMediaUrl] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [isImageUploaded, setIsImageUploaded] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (fetchedPostData) {
      setPostData({
        title: fetchedPostData.title,
        body: fetchedPostData.body,
        media: fetchedPostData.media,
      });
      setDefaultMediaUrl(fetchedPostData.media || "");
      setTags(fetchedPostData.tags || []);

      reset({
        title: fetchedPostData.title,
        body: fetchedPostData.body,
        tags: fetchedPostData?.tags,
      });
    }
  }, [fetchedPostData, reset]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    setIsImageUploaded(false);
    setIsLoading(true);

    const userStorageRef = ref(storage, `users/${userName}`);
    const imageRef = ref(userStorageRef, file.name);

    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setMediaUrl(downloadURL);
          setIsImageUploaded(true);
          setIsLoading(false);
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
      if (!media && defaultMediaUrl) {
        data.media = defaultMediaUrl;
      } else if (media) {
        data.media = mediaurl;
      }

      const response = await updatePost({ id, data });

      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("Post updated Successfully");
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
    handleSubmit: handleSubmit(onSubmit),
    errors,
    postData,
    setValue,
    tags,
    setTags,
    handleInputChange,
    handleImageChange,
    isloading: isLoading,
    issuccess: isSuccess,
    isImageUploaded,
  };
};
