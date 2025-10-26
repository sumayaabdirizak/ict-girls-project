// src/Admin/components/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 transition-all duration-300 ml-64">
                <Header />
                <main className="flex-1 mt-16 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;