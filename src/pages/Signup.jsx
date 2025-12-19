import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./up.css";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);

    // simulate success
    alert("Signup Successful!");

    // redirect to home page
    navigate("/");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Account</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="error">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
