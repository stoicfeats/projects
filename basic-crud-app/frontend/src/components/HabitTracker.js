import React, { useState, useEffect } from 'react'; 
// Imports React and two React hooks: useState (for managing state) and useEffect (for side effects like data fetching).

import { getHabits, createHabit, updateHabit, deleteHabit } from '../api/habits';
// Imports API functions to interact with the backend for fetching, creating, updating, and deleting habits.

const HabitTracker = () => { 
  // Defines a React functional component named HabitTracker.

  const [habits, setHabits] = useState([]); 
  // Initializes `habits` state as an empty array. This will hold the list of habits.

  const [newHabit, setNewHabit] = useState(''); 
  // Initializes `newHabit` state as an empty string. This is used to store the user input for adding a habit.

  useEffect(() => { 
    // useEffect is a React hook that runs after the component renders.
    fetchHabits();  // new funcitons
    
    // Calls the `fetchHabits` function to load habits from the backend when the component mounts.
  }, []); 
  // The empty array as the second argument ensures this effect runs only once, similar to componentDidMount in class components.

  const fetchHabits = async () => { 
    // Defines an asynchronous function to fetch habits from the backend.
    const data = await getHabits(); 
    // Awaits the API call to fetch habits and stores the result in `data`.
    setHabits(data); 
    // Updates the `habits` state with the fetched data.
  };

  const handleAddHabit = async () => { 
    // Handles adding a new habit when the user clicks the "Add Habit" button.
    if (newHabit.trim()) { 
      // Checks if `newHabit` is not empty (ignoring spaces).
      const habit = { name: newHabit, frequency: 'Daily' }; 
      // Creates a habit object with default frequency 'Daily'.
      const createdHabit = await createHabit(habit); 
      // Sends the new habit to the backend and gets the created habit with an ID from the response.
      setHabits([...habits, createdHabit]); 
      // Adds the new habit to the existing `habits` state array.
      setNewHabit(''); 
      // Clears the input field.
    }
  };

  const toggleCompletion = async (id, completed) => { 
    // Toggles the `completed` status of a habit.
    const updatedHabit = await updateHabit(id, { completed: !completed }); 
    // Sends the updated completion status to the backend and receives the updated habit.
    setHabits(
      habits.map((habit) => 
        habit._id === id ? updatedHabit : habit
        // Updates the specific habit in the state using `map` while leaving others unchanged.
      )
    );
  };

  const handleDeleteHabit = async (id) => { 
    // Deletes a habit when the user clicks the delete button.
    await deleteHabit(id); 
    // Sends a delete request to the backend for the specified habit ID.
    setHabits(habits.filter((habit) => habit._id !== id)); 
    // Filters out the deleted habit from the state.
  };
return (
    <div style={{ padding: '20px' }}> 
        {/* Main container with padding for spacing */}
        <h1>Habit Tracker</h1> 
        {/* Title of the page */}
        <div> 
            {/* Input and button container */}
            <input
                type="text" 
                // Input field for adding a new habit.
                placeholder="Add a new habit" 
                // Placeholder text shown inside the input field when it's empty.
                value={newHabit} 
                // Binds the value of the input field to the `newHabit` state.
                onChange={(e) => setNewHabit(e.target.value)} 
                // Updates `newHabit` state as the user types in the input field.
            />
            <button onClick={handleAddHabit}>Add Habit</button> 
            {/* Button that triggers `handleAddHabit` when clicked */}
        </div>
        <ul> 
            {/* Unordered list to display habits */}
            {habits.map((habit) => (
                <li key={habit._id}> 
                    {/* Each list item represents a habit, identified by its unique ID */}
                    <span
                        style={{
                            textDecoration: habit.completed ? 'line-through' : 'none', 
                            // Strikes through the text if the habit is completed.
                            cursor: 'pointer', 
                            // Changes the cursor to a pointer to indicate clickability.
                        }}
                        onClick={() => toggleCompletion(habit._id, habit.completed)} 
                        // Toggles completion when the user clicks the habit name.
                    >
                        {habit.name} 
                        {/* Displays the habit name */}
                    </span>
                    <button onClick={() => handleDeleteHabit(habit._id)}>Delete</button> 
                    {/* Deletes the habit when the user clicks the delete button */}
                </li>
            ))}
        </ul>
    </div>
);
};

export default HabitTracker; 
// Exports the HabitTracker component so it can be used in other parts of the app.
