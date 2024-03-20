import React, { useState } from 'react';
import './App.css';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (taskName.trim() !== '') {
      const newTask: Task = {
        id: tasks.length + 1,
        name: taskName,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
    }
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>ToDo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className="task-name">{task.name}</span>
            <div className="task-actions">
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="separator"></div>
      <h2 className="completed-task-list">Completed Tasks</h2>
      <ul className="task-list">
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <li key={task.id} className="task-item completed">
              <span className="task-name">{task.name}</span>
              <div className="task-actions">
                <button onClick={() => removeTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
