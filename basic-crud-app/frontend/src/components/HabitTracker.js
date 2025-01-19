import React, { useState, useEffect } from 'react';
import { getHabits, createHabit, updateHabit, deleteHabit } from '../api/habits';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  // Fetch habits from the backend
  const fetchHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  // Add a new habit
  const handleAddHabit = async () => {
    if (newHabit.trim()) {
      const habit = { name: newHabit, frequency: 'Daily' };
      const createdHabit = await createHabit(habit);
      setHabits([...habits, createdHabit]);
      setNewHabit('');
    }
  };

  // Toggle habit completion
  const toggleCompletion = async (id, completed) => {
    const updatedHabit = await updateHabit(id, { completed: !completed });
    setHabits(habits.map((habit) => (habit._id === id ? updatedHabit : habit)));
  };

  // Delete a habit
  const handleDeleteHabit = async (id) => {
    await deleteHabit(id);
    setHabits(habits.filter((habit) => habit._id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Habit Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={handleAddHabit}>Add Habit</button>
      </div>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <span
              style={{
                textDecoration: habit.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleCompletion(habit._id, habit.completed)}
            >
              {habit.name}
            </span>
            <button onClick={() => handleDeleteHabit(habit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;