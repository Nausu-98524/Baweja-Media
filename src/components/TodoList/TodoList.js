import React, { useState, useEffect } from "react";
import "./TodoList.css";
import {
  fetchTasks,
  addTask,
  markTaskAsComplete,
  deleteTask,
} from "../API/api";
import { RiDeleteBinLine } from "react-icons/ri";

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  const handleAddTask = async (title) => {
    try {
      const newTask = await addTask(title);
      newTask.id = tasks.length + 1;
      // setTasks([...tasks, newTask]);
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleMarkAsComplete = async (id, checked) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
      if (!checked) {
        await markTaskAsComplete(id);
      }
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>All Todos</h1>
          <div>
            <form
              className="formm"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask(e.target.task.value);
                e.target.task.value = "";
              }}
            >
              <input className="addFrom" type="text" name="task" />
              <button className="btn" type="submit">
                Add Task
              </button>
            </form>
            <ul style={{ padding: "0px 20px" }}>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    textDecoration: task.completed ? "line-through" : "",
                    listStyleType: "none",
                  }}
                >
                  <table id="customers">
                    <tr>
                      <td className="inputChekbox">
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) =>
                            handleMarkAsComplete(task.id, e.target.checked)
                          }
                        />
                      </td>
                      <td> {task.title}</td>
                      <td className="deleteRow">
                        <button
                          className="deleteBTn"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <RiDeleteBinLine className="deleteIcon" />
                        </button>
                      </td>
                    </tr>
                  </table>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TodoList;
