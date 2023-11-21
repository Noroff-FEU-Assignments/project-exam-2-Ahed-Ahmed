import { Link } from "react-router-dom";
import "./login.scss";
import { useLogin } from "../../customhooks/authhook/useLogin";

const Login = () => {
  const { register, onSubmit, handleSubmit, isLoading, errors } = useLogin();

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>SO Space</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="User Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@stud.noroff.no$/,
                  message: "Invalid email",
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
