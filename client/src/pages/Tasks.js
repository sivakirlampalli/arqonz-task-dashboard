import React, { useState, useEffect } from "react";
import "./Tasks.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";

const CATEGORY_OPTIONS = [
  "Frontend Developer",
  "Backend Engineer",
  "QA Engineer",
  "Full Stack Developer",
  "Cybersecurity Analyst",
  "Scrum Master"
];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("deadline");

  useEffect(() => {
    // Build query string for category & sort
    let query = `?sort=${sortOption}`;
    if (selectedCategory) query += `&category=${encodeURIComponent(selectedCategory)}`;
    fetch(`/api/tasks${query}`)
      .then((res) => res.json())
      .then(setTasks);
  }, [selectedCategory, sortOption]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const firstRowTitles = [
    "Daily Standup Meeting Website",
    "API Integration Sprint",
    "Security Audit Review",
  ];

  const firstRowTasks = firstRowTitles
    .map((title) => filteredTasks.find((t) => t.title === title))
    .filter(Boolean);

  const secondRowTasks = filteredTasks.filter(
    (t) => !firstRowTitles.includes(t.title)
  );

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h2 className="tasks-title">Explore Tasks</h2>
        <div className="tasks-controls">

          {/* Search */}
          <div className="tasks-search">
            <SearchIcon className="tasks-search-icon" />
            <input
              type="search"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tasks-search-input"
            />
          </div>

          {/* Category Dropdown */}
          <select
            className="btn"
            value={selectedCategory}
            onChange={e => { 
              setSelectedCategory(e.target.value);
              const categoryVal = e.target.value;
              let query = `?sort=${sortOption}`;
              if (categoryVal) query += `&category=${encodeURIComponent(categoryVal)}`;
              fetch(`/api/tasks${query}`)
                .then((res) => res.json())
                .then(setTasks);
            
            }}
            style={{ minWidth: 140 }}
          >
            <option value="">Category</option>
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort By Deadline Button */}
          <button
            className="btn btn-sort"
            onClick={() => { setSortOption(sortOption === "deadline" ? "deadline_desc" : "deadline")
              const newSort = sortOption === "deadline" ? "deadline_desc" : "deadline";
              setSortOption(newSort);
              let query = `?sort=${newSort}`;
              if (selectedCategory) query += `&category=${encodeURIComponent(selectedCategory)}`;
              fetch(`/api/tasks${query}`)
                .then((res) => res.json())
                .then(setTasks);



            }}
            title="Sort by Deadline"
          >
            <FilterAltIcon />
            Sort By Deadline {sortOption === "deadline_desc" ? "▼" : "▲"}
          </button>

          <NotificationsIcon className="btn-notif" />
          <img src="assets/profile.jpg" alt="Profile" className="profile-avatar" />
        </div>
      </header>

      {/* First Row */}
      <section className="tasks-section">
        <h3 className="tasks-section-title">Important Tasks</h3>
        <div className="tasks-row">
          {firstRowTasks.map((task) => (
            <article
              key={task._id}
              className="task-card"
              onClick={() => {
                if (task.url) window.open(task.url, "_blank");
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={task.image} alt={task.title} className="task-card-image" />
              <div className="task-card-content">
                <h4 className="task-card-title">{task.title}</h4>
                <p className="task-card-profession">{task.job || task.profession}</p>
                <div className="progress-wrapper">
                  <span>Progress</span>
                  <div className="progress-bar">
                    <div style={{ width: `${task.progress}%` }} />
                  </div>
                  <span className="progress-text">{task.progress}%</span>
                </div>
                <div className="task-meta">
                  <span>{task.daysLeft} Days Left</span>
                  <div className="avatars-group">
                    {task.avatars?.map((avatar, idx) => (
                      <img key={idx} src={avatar} alt="Avatar" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Second Row */}
      <section className="tasks-section">
        <h3 className="tasks-section-title">Other Tasks</h3>
        <div className="tasks-row">
          {secondRowTasks.map((task) => (
            <article
              key={task._id}
              className="task-card"
              onClick={() => {
                if (task.url) window.open(task.url, "_blank");
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={task.image} alt={task.title} className="task-card-image" />
              <div className="task-card-content">
                <h4 className="task-card-title">{task.title}</h4>
                <p className="task-card-profession">{task.job || task.profession}</p>
                <div className="progress-wrapper">
                  <span>Progress</span>
                  <div className="progress-bar">
                    <div style={{ width: `${task.progress}%` }} />
                  </div>
                  <span className="progress-text">{task.progress}%</span>
                </div>
                <div className="task-meta">
                  <span>{task.daysLeft} Days Left</span>
                  <div className="avatars-group">
                    {task.avatars?.map((avatar, idx) => (
                      <img key={idx} src={avatar} alt="Avatar" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
