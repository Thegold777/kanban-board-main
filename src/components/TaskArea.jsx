import React from "react";

export default function TaskArea({
  task,
  setTask,
  addTask,
  setAreaOpen,
  tasksLength,
}) {
  function handleChange(e) {
    setTask({ text: e.target.value, description: "" });
  }

  function handleKeyUp(e) {
    if (e.code === "Enter") {
      if (task.text.trim()) {
        addTask({ id: tasksLength, text: task.text, ...task }, "Новые");
      }
      setTask({ id: 0, text: "", description: "" });
      setAreaOpen(false);
    }
  }

  return (
    <input
      className="input"
      style={{ fontSize: "inherit", borderRadius: "5px", padding: "8px" }}
      value={task.text}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      name="task"
      placeholder="Введите новую задачу"
    />
  );
}
