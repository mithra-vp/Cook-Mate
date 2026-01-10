import React from 'react';
import { FiUsers, FiBook, FiPlusSquare, FiLogOut } from 'react-icons/fi';
import './admin.css';

const Sidebar = ({ activeTab, setActiveTab, handleLogout, navigate }) => {
    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h3>Admin Panel</h3>
            </div>
            <ul className="sidebar-menu">
                <li
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    <FiUsers /> Users
                </li>
                <li
                    className={activeTab === 'recipes' ? 'active' : ''}
                    onClick={() => setActiveTab('recipes')}
                >
                    <FiBook /> Recipes
                </li>
                <li onClick={() => navigate('/admin/add')}>
                    <FiPlusSquare /> Add Recipe
                </li>
                <li
                    className={activeTab === 'profile' ? 'active' : ''}
                    onClick={() => setActiveTab('profile')}
                >
                    <FiUsers /> Profile
                </li>
                <li
                    className={activeTab === 'edit-profile' ? 'active' : ''}
                    onClick={() => setActiveTab('edit-profile')}
                >
                    <FiUsers /> Edit Profile
                </li>
            </ul>
            <div className="sidebar-footer">
                <button onClick={handleLogout} className="sidebar-logout">
                    <FiLogOut /> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
