import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Mentors from "./pages/Mentors";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import TaskDetailPage from './pages/TaskDetailPage';
import "./App.css"; // Your global styles

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root" style={{ display: "flex" }}>
        {/* Sidebar remains visible */}
        <Sidebar />

        {/* Main content area */}
        <div className="app-content" style={{ flex: 1, marginLeft: "250px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/task/:id" element={<TaskDetailPage />} />
            {/* Add 404 or Redirect route if needed */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
