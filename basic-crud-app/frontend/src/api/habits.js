import axios from 'axios';
const API_URL = 'http://localhost:5005/api/habits';

// Get all habits
export const getHabits = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Create a habit

export const createHabit = async (habit) => {
  try {
    const response = await axios.post(API_URL, habit);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

