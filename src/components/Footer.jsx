import React from "react";

export default function Footer({ activeTasks, finishedTasks }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-left">
          <p>Новые: {activeTasks}</p>
          <p>Завершенные: {finishedTasks}</p>
        </div>
        <div className="footer-right">Kanban board by TheGold, 2024</div>
      </div>
    </footer>
  );
}
