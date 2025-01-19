import axios from 'axios';

const API_URL = 'http://localhost:5005/api/habits';

// Get all habits
export const getHabits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new habit
export const createHabit = async (habit) => {
  const response = await axios.post(API_URL, habit);
  return response.data;
};

// Update a habit
export const updateHabit = async (id, updatedHabit) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedHabit);
  return response.data;
};

// Delete a habit
export const deleteHabit = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};