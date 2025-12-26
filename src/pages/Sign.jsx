import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./sign.css";

const Sign = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("signupUser"));

    if (
      user?.email === data.email &&
      user?.password === data.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Are you new here? please sign up first!");
    }
  };



  return (
    <div className="sign-container">
      <div className="sign-box">
        <h2>Sign In</h2>
        <p>Sign in to taste more of what you love</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              validate: (value) => {
                if (!/[A-Za-z]/.test(value)) {
                  return "Password must include a letter";
                }
                if (!/\d/.test(value)) {
                  return "Password must include a number";
                }
                if (!/[@$!%*?&]/.test(value)) {
                  return "Password must include a special character";
                }
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                return true;
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <button type="submit">Sign In</button>
        </form>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Sign;
