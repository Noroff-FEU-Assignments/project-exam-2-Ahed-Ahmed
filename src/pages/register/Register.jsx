import React from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import { useRegister } from "../../customhooks/authhook/useRegister";

const Register = () => {
  const {
    isLoading,
    register,
    handleSubmit,
    onSubmit,
    errors,
    setAvatar,
    setBanner,
  } = useRegister();

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>So Space</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="User Name"
              {...register("name", { required: "Name is required" })}
              autoComplete="name"
            />
            <p className="error">{errors.name?.message}</p>
            <input
              type="email"
              placeholder="User Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@stud.noroff.no$/,
                  message: "Invalid email. Please use an @stud.noroff.no email",
                },
              })}
            />
            <p className="error">{errors.email?.message}</p>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              autoComplete="password"
            />
            <p className="error">{errors.password?.message}</p>
            <div className="custominput">
              <label>Avatar Image</label>
              <input
                type="file"
                name="avatar"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
                className="noborderinput"
              />
            </div>

            <div className="custominput">
              <label>Banner Image</label>
              <input
                type="file"
                name="banner"
                onChange={(e) => {
                  setBanner(e.target.files[0]);
                }}
                className="noborderinput"
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
