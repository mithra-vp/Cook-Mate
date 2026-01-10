import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import "./sign.css";

const Sign = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.get("/users", {
        params: {
          email: data.email,
          password: data.password,
        },
      });
      const users = res.data;

      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong!");
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
