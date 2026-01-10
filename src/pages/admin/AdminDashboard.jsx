



import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./admin.css";

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  // Fetch data from JSON Server
  const fetchData = async () => {
    try {
      const [recipesRes, usersRes] = await Promise.all([
        api.get("/recipes"),
        api.get("/users")
      ]);
      setRecipes(recipesRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Protect route: if not logged in or not admin, redirect to Sign In
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user || user.role !== "admin") {
      navigate("/sign");
      return;
    }
    fetchData();
  }, [navigate]);

  const deleteRecipe = async (id) => {
    if (window.confirm("Delete this recipe?")) {
      await api.delete(`/recipes/${id}`);
      fetchData();
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await api.delete(`/users/${id}`);
      fetchData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/sign");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        navigate={navigate}
      />

      <div className="admin-content">
        {activeTab === 'users' && (
          <div>
            <h2>Manage Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role || "user"}</td>
                    <td>
                      <button className="action-btn delete-btn" onClick={() => deleteUser(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'recipes' && (
          <div>
            <h2>Manage Recipes</h2>
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
              {/* Sidebar has Add button, but keeping one here if needed or relying on Sidebar */}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((r) => (
                  <tr key={r.id}>
                    <td>{r.title}</td>
                    <td>{r.category}</td>
                    <td>
                      <button className="action-btn edit-btn" onClick={() => navigate(`/admin/edit/${r.id}`)}>Edit</button>
                      <button className="action-btn delete-btn" onClick={() => deleteRecipe(r.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Admin Profile</h2>
            {users.find(u => u.email === JSON.parse(localStorage.getItem("user"))?.email) ? (
              <div className="profile-details">
                {(() => {
                  const currentUser = users.find(u => u.email === JSON.parse(localStorage.getItem("user"))?.email);
                  return (
                    <>
                      {currentUser.image && (
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                          <img
                            src={currentUser.image}
                            alt="Profile"
                            className="profile-img-display"
                          />
                        </div>
                      )}
                      <p><strong>Name:</strong> {currentUser.name}</p>
                      <p><strong>Email:</strong> {currentUser.email}</p>
                      <p><strong>Role:</strong> {currentUser.role}</p>
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button className="action-btn edit-btn" onClick={() => setActiveTab('edit-profile')}>Edit Profile</button>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        )}

        {activeTab === 'edit-profile' && (
          <AdminEditProfile user={users.find(u => u.email === JSON.parse(localStorage.getItem("user"))?.email)} refreshData={fetchData} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
};

const AdminEditProfile = ({ user, refreshData, setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    image: user?.image || ''
  });
  const [imagePreview, setImagePreview] = useState(user?.image || null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: user.password || '',
        image: user.image || ''
      });
      setImagePreview(user.image || null);
    }
  }, [user]);

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
      setFormData(prev => ({ ...prev, image: base64 }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await api.put(`/users/${user.id}`, { ...user, ...formData });
      alert("Profile updated successfully!");
      refreshData();

      // Update local storage if email/name changed
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser.email === user.email) {
        localStorage.setItem("user", JSON.stringify({ ...currentUser, ...formData }));
      }
      setActiveTab('profile');
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
            />
          )}
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', cursor: 'pointer', color: '#3498db' }}>
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn" style={{ marginTop: '10px' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
