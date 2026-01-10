import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = React.useState(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImagePreview(base64);
      setValue("image", base64, { shouldValidate: true }); // Set the base64 string to the form data and validate
    }
  };

  const onSubmit = async (data) => {
    // Basic ingredient parsing logic if entered as comma separated string
    const formattedData = {
      ...data,
      ingredients: data.ingredients ? data.ingredients.split(',').map(i => ({ name: i.trim(), measure: "" })) : []
    };
    await api.post("/recipes", formattedData);
    navigate("/admin");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="recipe-form">
      <h2>Add Recipe</h2>

      <div className="form-group">
        <input
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Title must be at least 3 characters" }
          })}
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <p className="error-message">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <input
          placeholder="Category"
          {...register("category", { required: "Category is required" })}
          className={errors.category ? "input-error" : ""}
        />
        {errors.category && <p className="error-message">{errors.category.message}</p>}
      </div>

      {/* File Upload Input */}
      <div style={{ marginBottom: '10px' }} className="form-group">
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Recipe Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ padding: '10px', background: '#f9f9fb' }}
        />
        {/* Hidden input to store base64 string for form submission */}
        <input
          type="hidden"
          {...register("image", { required: "Recipe image is required" })}
        />
        {errors.image && <p className="error-message">{errors.image.message}</p>}
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
        />
      )}

      {/* Price removed as per request */}
      <div className="form-group">
        <textarea
          placeholder="Ingredients (comma separated)"
          {...register("ingredients", { required: "Ingredients are required" })}
          className={errors.ingredients ? "input-error" : ""}
        />
        {errors.ingredients && <p className="error-message">{errors.ingredients.message}</p>}
      </div>

      <div className="form-group">
        <textarea
          placeholder="Instructions"
          {...register("instructions", {
            required: "Instructions are required",
            minLength: { value: 10, message: "Instructions must be at least 10 characters" }
          })}
          className={errors.instructions ? "input-error" : ""}
        />
        {errors.instructions && <p className="error-message">{errors.instructions.message}</p>}
      </div>

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
