import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/authentication/authApiSlice";
import { loginUser } from "../../features/authentication/userSlice";
import { useDispatch } from "react-redux";
import { setProfile } from "../../features/posts/updateProfileSlice";
import toast from "react-hot-toast";
export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);
  const [loginUserMutation] = useLoginUserMutation();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUserMutation(data).unwrap();
      if (response) {
        dispatch(loginUser(response));
        dispatch(setProfile(response));
        Cookies.set("userData", JSON.stringify(response), { expires: 7 });

        toast.success("User login successfully");
        navigate("/");
        reset();
      }
    } catch (error) {
      toast.error(error.data.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
};
