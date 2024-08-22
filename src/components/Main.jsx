import React, { useCallback, useMemo } from "react";
import TaskBlock from "./TaskBlock";

export default function Main({
  backlog,
  setBacklog,
  ready,
  setReady,
  inProgress,
  setInProgress,
  finished,
  setFinished,
}) {
  const tasksLength =
    backlog.length + ready.length + inProgress.length + finished.length;

  const addTask = useCallback(
    (task, column) => {
      if (column === "Новые") {
        setBacklog([...backlog, task]);
      } else if (column === "Подвержденные") {
        setReady([...ready, task]);
        setBacklog(backlog.filter((el) => el.id !== task.id));
      } else if (column === "В процессе") {
        setInProgress([...inProgress, task]);
        setReady(ready.filter((el) => el.id !== task.id));
      } else {
        setFinished([...finished, task]);
        setInProgress(inProgress.filter((el) => el.id !== task.id));
      }
    },
    [
      backlog,
      ready,
      inProgress,
      finished,
      setBacklog,
      setReady,
      setInProgress,
      setFinished,
    ]
  );

  const deleteTask = useCallback(
    (task, column) => {
      if (column === "Новые") {
        setBacklog(backlog.filter((el) => el.id !== task.id));
      } else if (column === "Подвержденные") {
        setReady(ready.filter((el) => el.id !== task.id));
      } else if (column === "В процессе") {
        setInProgress(inProgress.filter((el) => el.id !== task.id));
      } else {
        setFinished(finished.filter((el) => el.id !== task.id));
      }
    },
    [
      backlog,
      finished,
      inProgress,
      ready,
      setBacklog,
      setFinished,
      setInProgress,
      setReady,
    ]
  );

  const columnData = useMemo(
    () => [
      {
        name: "Новые",
        tasks: backlog,
        select: null,
      },
      {
        name: "Подвержденные",
        tasks: ready,
        select: backlog,
      },
      {
        name: "В процессе",
        tasks: inProgress,
        select: ready,
      },
      {
        name: "Завершенные",
        tasks: finished,
        select: inProgress,
      },
    ],
    [backlog, ready, inProgress, finished]
  );

  return (
    <div className="main">
      <div className="container">
        {columnData.map((column) => (
          <TaskBlock
            key={column.name}
            name={column.name}
            tasks={column.tasks}
            select={column.select}
            addTask={addTask}
            deleteTask={deleteTask}
            tasksLength={tasksLength}
          />
        ))}
      </div>
    </div>
  );
}
