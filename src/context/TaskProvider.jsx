import { useState, useEffect } from "react";
import { TaskContext } from "./taskContext";
import axios from "axios";

export const TaskProvider = ({ children }) => {
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIsTaskLoading(true);
    setTasks(res.data);
    setIsTaskLoading(false);
  };

  // ✅ Automatically load tasks when TaskProvider mounts
  useEffect(() => {
    fetchTasks();
  }, []);
  const addTask = async (taskData) => {
    setIsTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.href = "/tasks";
    } catch (err) {
      console.error(err);
    } finally {
      setIsTaskLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setIsTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.location.href = "/tasks";
    } catch (err) {
      console.error(err);
    } finally {
      setIsTaskLoading(false);
    }
  };

  // ✅ Delete task function
  const deleteTask = async (id) => {
    setIsTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      // setTasks((prev) => prev.filter((task) => task._id !== id)); // remove locally
    } catch (err) {
      console.error(err);
    } finally {
      setIsTaskLoading(false);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskUpdate,
        addTask,
        updateTask,
        setTaskUpdate,
        fetchTasks,
        deleteTask,
        isTaskLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
