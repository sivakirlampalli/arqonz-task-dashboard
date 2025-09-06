import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './TaskDetailPage.css';

export default function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const baseUrl = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    fetch(`${baseUrl}/api/tasks/${id}`)
      .then(res => res.json())
      .then(setTask);
  }, [id, baseUrl]);

  if (!task) return <div>Loading...</div>;

  return (
    <main className="task-detail-page">
      <h2>{task.title}</h2>
      <img src={task.image} alt={task.title} className="task-detail-img" />
      <p><b>Role:</b> {task.job || task.profession}</p>
      <p><b>Progress:</b> {task.progress}%</p>
      <p><b>Days Left:</b> {task.daysLeft}</p>
      {task.details && (
        <ul>
          {task.details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        {task.avatars && task.avatars.map((a, i) => (
          <img key={i} src={a} alt="avatar" style={{ width: 32, height: 32, borderRadius: "50%" }} />
        ))}
      </div>
    </main>
  );
}
