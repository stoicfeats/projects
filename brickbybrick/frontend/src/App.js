import React, { useState, useEffect } from "react";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./api/taskService";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreate = async () => {
    console.log("New Task:", newTask); // Debug: Log new task
    try {
      const response = await createTask(newTask);
      console.log("Created Task:", response.data); // Debug: Log created task
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => {
            console.log("Title:", e.target.value); // Debug: Log title
            setNewTask({ ...newTask, title: e.target.value });
          }}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => {
            console.log("Description:", e.target.value); // Debug: Log description
          setNewTask({ ...newTask, description: e.target.value })
        }}
      />
      <button onClick={handleCreate}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? "Yes" : "No"}</p>
            <button
              onClick={() =>
                handleUpdate(task._id, { ...task, completed: !task.completed })
              }
            >
              Toggle Complete
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;