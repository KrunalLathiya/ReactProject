import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{ width: "280px", height: "100vh" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Admin Dashboard</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link text-white"} end>
                        <i className="bi bi-house-door pe-2"></i>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create" className={({ isActive }) => isActive ? "nav-link active" : "nav-link text-white"}>
                        <i className="bi bi-plus-circle pe-2"></i>
                        Create
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index" className={({ isActive }) => isActive ? "nav-link active" : "nav-link text-white"}>
                        <i className="bi bi-layout-text-sidebar-reverse pe-2"></i>
                        Index
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;