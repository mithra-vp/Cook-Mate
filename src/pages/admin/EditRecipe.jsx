import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
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
      setValue("image", base64);
    }
  };

  useEffect(() => {
    api.get(`/recipes/${id}`).then((res) => {
      const data = res.data;
      setValue("title", data.title);
      setValue("category", data.category);
      setValue("image", data.image);
      setImagePreview(data.image); // Set initial preview
      // Price removed
      setValue("instructions", data.instructions);
      if (data.ingredients && Array.isArray(data.ingredients)) {
        setValue("ingredients", data.ingredients.map(i => i.name).join(', '));
      }
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      ingredients: data.ingredients ? data.ingredients.split(',').map(i => ({ name: i.trim(), measure: "" })) : []
    };
    await api.put(`/recipes/${id}`, formattedData);
    navigate("/admin");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="recipe-form">
      <h2>Edit Recipe</h2>

      <input placeholder="Title" {...register("title", { required: true })} />
      <input placeholder="Category" {...register("category", { required: true })} />

      {/* File Upload Input */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Recipe Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ padding: '10px', background: '#f9f9fb' }}
        />
        {/* Hidden input to store base64 string for form submission */}
        <input type="hidden" {...register("image", { required: true })} />
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
        />
      )}

      {/* Price removed as per request */}
      <textarea placeholder="Ingredients (comma separated)" {...register("ingredients")} />
      <textarea placeholder="Instructions" {...register("instructions")} />

      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipe;
