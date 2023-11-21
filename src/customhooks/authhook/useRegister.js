import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../features/authentication/authApiSlice";
import toast from "react-hot-toast";
export const useRegister = () => {
  const [avatar, setAvatar] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [isLoading, setLoading] = React.useState(false);
  const [registerUser] = useRegisterUserMutation();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await registerUser(data);
      if (response.error) {
        toast.error(response.error.data.errors[0].message);
      } else {
        toast.success("User Registered Successfully");
        navigate("/login");
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    avatar,
    setAvatar,
    banner,
    setBanner,
    isLoading,
  };
};
