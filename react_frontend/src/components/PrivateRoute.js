import React from 'react';
import { Route, Navigate,Routes, BrowserRouter, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" replace />
    );
}

export default PrivateRoute;
