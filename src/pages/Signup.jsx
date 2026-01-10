import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./up.css";

const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            };

            await api.post("/users", userData);
            console.log("Signup Data:", userData);

            alert("Signup successful! Please sign in.");
            navigate("/sign");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed! Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /^[A-Za-z\s]*$/,
                                message: "Only letters and spaces are allowed",
                            },
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
                                value: /^\S+@\S+\.\S+$/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <select
                        {...register("role", { required: "Role is required" })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <span className="error">{errors.role.message}</span>}
                </div>

                <div className="form-group">
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
