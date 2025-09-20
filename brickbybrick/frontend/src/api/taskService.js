import axios from "axios";

const API_URL = "http://localhost:5002/api/tasks";

// Create a task
export const createTask = (task) => axios.post(API_URL, task);

// Read all tasks
export const getTasks = () => axios.get(API_URL);

// Update a task
export const updateTask = (id, updatedTask) =>
  axios.put(`${API_URL}/${id}`, updatedTask);

// Delete a task
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);