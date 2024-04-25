import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './useAuth.jsx';

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">React App</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Only show Signup and Login links if the user is not authenticated */}
                        {!isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                        {/* Only show Logout button if the user is authenticated */}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" style={{ color: 'rgba(255,255,255,.55)' }} onClick={logout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
