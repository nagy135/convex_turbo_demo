import { useQuery, useMutation } from "convex/react";
import { api } from "@repo/convex-backend/convex/_generated/api";
import { useState } from "react";

function App() {
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    await createTask({ text: newTask });
    setNewTask("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Convex + Turborepo Demo
        </h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {tasks?.map((task) => (
            <li
              key={task._id}
              className="flex items-center gap-3 p-3 bg-gray-800 rounded"
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTask({ id: task._id })}
                className="w-5 h-5"
              />
              <span
                className={`flex-1 ${task.isCompleted ? "line-through text-gray-500" : ""}`}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask({ id: task._id })}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks?.length === 0 && (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default App;
