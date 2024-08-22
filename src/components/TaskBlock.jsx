import React, { useState } from "react";
import { Link } from "react-router-dom";
import plus from "../assets/images/add-card.svg";
import TaskArea from "./TaskArea";
import TaskSelect from "./TaskSelect";
import deleteBtn from "../assets/images/add-card.svg";

export default function TaskBlock({
  name,
  tasks,
  select,
  addTask,
  deleteTask,
  tasksLength,
}) {
  const [isAreaOpen, setAreaOpen] = useState(false);
  const [task, setTask] = useState({ id: 0, text: "", description: "" });

  function activityBlock() {
    if (name === "Новые") {
      return (
        <TaskArea
          task={task}
          setTask={setTask}
          addTask={addTask}
          setAreaOpen={setAreaOpen}
          tasksLength={tasksLength}
        />
      );
    } else {
      if (select.length === 0) {
        setAreaOpen(!isAreaOpen);
      } else {
        return <TaskSelect tasks={select} addTask={addTask} column={name} />;
      }
    }
  }

  function addButtonEvent() {
    if (name === "Новые") {
      if (isAreaOpen && task.text) {
        setAreaOpen(!isAreaOpen);
        if (task.text.trim()) {
          addTask({ id: tasksLength, ...task, description: "" }, "Новые");
        }
        setTask({ id: 0, text: "", description: "" });
      } else {
        setAreaOpen(!isAreaOpen);
      }
    } else {
      setAreaOpen(!isAreaOpen);
    }
  }

  return (
    <div className="block">
      <h3>{name}</h3>
      <ul className="block-list">
        {tasks.length ? (
          tasks.map((task, index) => {
            return (
              <li className="block-task" key={index}>
                <Link to={`tasks/${task.id}`} state={{ task, column: name }}>
                  {task.text}
                </Link>
                <button onClick={() => deleteTask(task, name)}>
                  <img src={deleteBtn} alt="delete" />
                </button>
              </li>
            );
          })
        ) : (
          <li className="block-task block-task-none">Нет задач</li>
        )}
      </ul>

      {isAreaOpen && activityBlock()}

      <button
        className="button"
        disabled={name !== "Новые" && !select.length ? true : false}
        style={{
          backgroundColor: !isAreaOpen || "#8f3f65",
          color: !isAreaOpen || "#fff",
        }}
        onClick={() => addButtonEvent()}
      >
        {isAreaOpen || <img src={plus} alt="add cart" />}
        <p style={{ fontSize: "18px" }}>
          {isAreaOpen ? "Добавить задачу" : "Новая задача"}
        </p>
      </button>
    </div>
  );
}
