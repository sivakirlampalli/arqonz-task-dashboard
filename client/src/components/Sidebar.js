import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Groups";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-text">DNX</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link" end>
          <DashboardIcon className="sidebar-icn" />
          Overview
        </NavLink>
        <NavLink to="/tasks" className="sidebar-link">
          <AssignmentIcon className="sidebar-icn" />
          Task
        </NavLink>
        <NavLink to="/mentors" className="sidebar-link">
          <GroupIcon className="sidebar-icn" />
          Mentors
        </NavLink>
        <NavLink to="/messages" className="sidebar-link">
          <ChatBubbleIcon className="sidebar-icn" />
          Message
        </NavLink>
        <NavLink to="/settings" className="sidebar-link">
          <SettingsIcon className="sidebar-icn" />
          Settings
        </NavLink>
      </nav>
      <div className="sidebar-help">
        <div className="sidebar-help-card">
          <HelpOutlineIcon className="sidebar-help-icn" />
          <p className="help-title">Help Center</p>
          <p className="help-desc">
            Having trouble in learning? <br /> Please contact us for more questions.
          </p>
          <button className="sidebar-help-btn">Go To Help Center</button>
        </div>
      </div>
    </aside>
  );
}
