import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data)
  }
  
  const addTask = async () => {
    if (!task.trim()) return;
    await axios.post("http://localhost:5000/tasks", { task })
    setTask("");
    fetchTasks();
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`)
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-slate-900 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-slate-700">
              <div className="py-8 text-base leading-6 space-y-4 text-slate-300 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-slate-100">To-Do App</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2 bg-slate-800 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                    placeholder="Add a new task..."
                  />
                  <button 
                    onClick={addTask}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-3 mt-6">
                  {tasks.map((t) => (
                    <li 
                      key={t._id}
                      className="flex items-center justify-between p-3 bg-slate-800 rounded-lg group hover:bg-slate-700 transition-colors duration-200"
                    >
                      <span className="text-slate-100">{t.task}</span>
                      <button 
                        onClick={() => deleteTask(t._id)}
                        className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App