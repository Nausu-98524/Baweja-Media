import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Add a new task
export const addTask = async (title) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      title,
      completed: false,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Update a task (mark as complete)
export const markTaskAsComplete = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, {
      completed: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error marking task as complete:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
