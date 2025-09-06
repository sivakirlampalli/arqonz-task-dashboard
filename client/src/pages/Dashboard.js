import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
   const navigate = useNavigate();

  const [runningTasks, setRunningTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [averageProgress, setAverageProgress] = useState(0);
  const [monthlyMentors, setMonthlyMentors] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [todayTask, setTodayTask] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mentorCarouselIndex, setMentorCarouselIndex] = useState(0);
  const visibleCount = 2; // Number of visible upcoming task cards
  const visibleMentorCount = 2; // Number of visible mentor cards
  const [openTask, setOpenTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2022-07-14"); // Default selected date for calendar]
 
  useEffect(() => {
    // Initial fetch
    fetchSummary();

    // Poll every 5 seconds for real-time progress
    const interval = setInterval(() => {
      fetchSummary();
    }, 5000);

    // Initial fetch of mentors and upcoming tasks
    fetch("/api/mentors")
      .then((res) => res.json())
      .then(setMonthlyMentors);

    fetch("/api/tasks/upcoming")
      .then((res) => res.json())
      .then(setUpcomingTasks);

    return () => clearInterval(interval);
  }, []);

  const fetchSummary = () => {
    fetch("/api/tasks/summary")
      .then((res) => res.json())
      .then((data) => {
        setRunningTasks(data.runningCount || 0);
        setCompletedTasks(data.completedCount || 0);
        setAverageProgress(data.averageProgress || 0);
      });
  };

  // Fetch today's task based on selectedDate
  useEffect(() => {
    if (!selectedDate) {
      setTodayTask(null);
      return;
    }
    fetch(`/api/tasks/by-date?date=${selectedDate}`)
      .then((res) => {
        if (res.status === 404) return null;
        return res.json();
      })
      .then(setTodayTask)
      .catch(() => setTodayTask(null));
  }, [selectedDate]);

  const totalTasks = runningTasks + completedTasks;
  const runningPercent = averageProgress;

  // Task carousel handlers
  const handlePrev = () => setCarouselIndex((prev) => Math.max(prev - visibleCount, 0));
  const handleNext = () =>
    setCarouselIndex((prev) => Math.min(prev + visibleCount, upcomingTasks.length - visibleCount));

  // Mentor carousel handlers
  const handleMentorPrev = () => setMentorCarouselIndex((prev) => Math.max(prev - visibleMentorCount, 0));
  const handleMentorNext = () =>
    setMentorCarouselIndex((prev) =>
      Math.min(prev + visibleMentorCount, monthlyMentors.length - visibleMentorCount)
    );

  const handleToggleFollow = async (mentorId, currentFollowed) => {
    const newFollowState = !currentFollowed;
    setMonthlyMentors((prev) =>
      prev.map((m) => (m._id === mentorId ? { ...m, followed: newFollowState } : m))
    );
    try {
      const res = await fetch(`/api/mentors/${mentorId}/follow`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followed: newFollowState }),
      });
      if (!res.ok) throw new Error("Failed to update follow status");
    } catch (err) {
      setMonthlyMentors((prev) =>
        prev.map((m) => (m._id === mentorId ? { ...m, followed: currentFollowed } : m))
      );
      alert("Error updating follow status. Please try again.");
    }
  };

  const isSelectedDate = (day) => {
    const dayStr = `2022-07-${day.toString().padStart(2, "0")}`;
    return dayStr === selectedDate;
  };

  return (
    <main className="dashboard-content">
      <div className="dashboard-main">
        <div className="feed-header">
          <section className="running-task-card">
            <h3>Running Task</h3>
            <svg width={85} height={85} viewBox="0 0 65 65">
              <circle cx={32.5} cy={32.5} r={29} fill="none" stroke="#ececec" strokeWidth={7} />
              <circle
                cx={32.5}
                cy={32.5}
                r={29}
                fill="none"
                stroke="#3D56F0"
                strokeWidth={7}
                strokeDasharray={2 * Math.PI * 29}
                strokeDashoffset={2 * Math.PI * 29 * (1 - runningPercent / 100)}
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
              <text x={32.5} y={38} textAnchor="middle" fontSize={24} fill="#3D56F0" fontWeight={700}>
                {runningTasks}
              </text>
            </svg>
            <div className="running-task-info">
              <span>{runningPercent}%</span>
              <span>{totalTasks} Task{totalTasks !== 1 ? "s" : ""}</span>
            </div>
          </section>

          <section className="activity-card">
            <h3>Activity</h3>
            <div className="activity-chart">
              <svg width={140} height={65}>
                <polyline
                  fill="none"
                  stroke="#3D56F0"
                  strokeWidth={3}
                  points="10,50 35,40 70,32 95,42 120,30"
                />
                <circle cx={35} cy={40} r={7} fill="#3D56F0" />
                <text x={30} y={32} fill="#3D56F0" fontSize={13}>
                  2 Task
                </text>
              </svg>
              <small>Task Stats</small>
            </div>
          </section>
        </div>

        <section className="mentors-section">
          <h3>Monthly Mentors</h3>
          <div className="carousel-controls">
            <button
              className="carousel-btn"
              onClick={handleMentorPrev}
              disabled={mentorCarouselIndex === 0}
            >
              <ArrowBackIosIcon fontSize="small" />
            </button>
            <button
              className="carousel-btn"
              onClick={handleMentorNext}
              disabled={mentorCarouselIndex + visibleMentorCount >= monthlyMentors.length}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </button>
          </div>
          <div className="mentors-row mentors-carousel">
            {monthlyMentors
              .slice(mentorCarouselIndex, mentorCarouselIndex + visibleMentorCount)
              .map((mentor) => (
                <div key={mentor._id} className="mentor-card">
                  <img src={mentor.avatar} alt={mentor.name} className="mentor-avatar" />
                  <div className="mentor-info">
                    <h4>{mentor.name}</h4>
                    <p>{mentor.profession}</p>
                    <div className="mentor-meta">
                      <span>{mentor.tasks} Task</span>
                      <span className="mentor-rating">
                        <StarIcon sx={{ fontSize: 16, color: "#FFC700" }} />
                        {mentor.rating} ({mentor.reviews} Reviews)
                      </span>
                    </div>
                    {!mentor.followed ? (
                      <button
                        className="btn-follow"
                        onClick={() => handleToggleFollow(mentor._id, mentor.followed)}
                      >
                        + Follow
                      </button>
                    ) : (
                      <button
                        className="btn-following"
                        onClick={() => handleToggleFollow(mentor._id, mentor.followed)}
                      >
                        Following
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="upcoming-section">
          <h3>Upcoming Task</h3>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={handlePrev} disabled={carouselIndex === 0}>
              <ArrowBackIosIcon fontSize="small" />
            </button>
            <button
              className="carousel-btn"
              onClick={handleNext}
              disabled={carouselIndex + visibleCount >= upcomingTasks.length}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </button>
          </div>
          <div className="tasks-row tasks-carousel">
            {upcomingTasks
              .slice(carouselIndex, carouselIndex + visibleCount)
              .map((task) => (
                <div
                  key={task._id}
                  className="task-card"
                  onClick={() => {
                    if (task.url) window.open(task.url, "_blank");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={task.image} alt={task.title} className="task-img" />
                  <div className="task-content">
                    <h4>{task.title}</h4>
                    <p>{task.job || task.profession}</p>
                    <div className="progress-bar">
                      <div style={{ width: `${task.progress}%` }} />
                    </div>
                    <div className="task-meta">
                      <span>{task.daysLeft} Days Left</span>
                      <div className="task-avatars">
                        {task.avatars?.map((avatar, idx) => (
                          <img key={idx} src={avatar} alt="avatar" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>

      <aside className="dashboard-right">
        <section className="calendar-card">
          <div className="calendar-header">
            <CalendarTodayIcon sx={{ color: "#3D56F0", marginRight: 1 }} />
            <span>Sept 2025</span>
          </div>
          <div className="calendar-dates-row">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => {
              const dayNum = 10 + idx;
              return (
                <div
                  key={idx}
                  className="date-wrapper"
                  onClick={() => setSelectedDate(`2022-07-${dayNum.toString().padStart(2, "0")}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={`date-num${isSelectedDate(dayNum) ? " selected" : ""}`}>
                    {dayNum}
                  </div>
                  <div className="date-label">{d}</div>
                </div>
              );
            })}
          </div>
        </section>

        {todayTask ? (
          <>
            <h3 className="today-task-heading" style={{ margin: "0 0 10px 0", paddingTop: 84 }}>
              Task Today
            </h3>
            <section className="task-today-card task-today-spacing">
              <img src={todayTask.image} alt={todayTask.title} className="task-today-img" />
              <h4 className="task-today-title">{todayTask.title}</h4>
              <p className="task-today-profession">{todayTask.profession}</p>
              <div className="task-today-progress-bar">
                <div style={{ width: `${todayTask.progress}%` }} />
              </div>
              <p className="task-today-progress-text">{todayTask.progress}%</p>
              <span className="task-today-daysleft">{todayTask.daysLeft} Days Left</span>
              <div className="task-today-meta">
                <span>{todayTask.time}</span>
                <div className="task-avatars">
                  {todayTask.avatars?.map((a, i) => (
                    <img key={i} src={a} alt="avatar" />
                  ))}
                </div>
              </div>
              {todayTask.details && (
                <ul className="task-today-details">
                  {todayTask.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              <button className="btn-go-detail" onClick={() => navigate(`/task/${todayTask._id}`)}>Go To Detail</button>

            </section>
          </>
        ) : (
          <p style={{ paddingTop: 84, fontStyle: "italic", color: "#666" }}>
            No task for selected date.
          </p>
        )}
      </aside>

      {openTask && (
        <div className="modal-overlay" onClick={() => setOpenTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{openTask.title}</h2>
            <img
              src={openTask.image}
              alt={openTask.title}
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />
            <p>
              <b>Role:</b> {openTask.job || openTask.profession}
            </p>
            <p>
              <b>Progress:</b> {openTask.progress}%
            </p>
            <p>
              <b>Days Left:</b> {openTask.daysLeft}
            </p>
            {openTask.avatars && (
              <div style={{ display: "flex", gap: 8, marginTop: 8, marginBottom: 12 }}>
                {openTask.avatars.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    alt="avatar"
                    style={{ width: 32, height: 32, borderRadius: "50%" }}
                  />
                ))}
              </div>
            )}
            <button className="btn-go-detail" onClick={() => setOpenTask(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
