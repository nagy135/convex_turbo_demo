import { useQuery, useMutation } from "convex/react";
import { api } from "@repo/convex-backend/convex/_generated/api";
import { useState } from "react";

function App() {
  const messages = useQuery(api.messages.list);
  const createMessage = useMutation(api.messages.create);
  const toggleRead = useMutation(api.messages.markRead);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await createMessage({ text: newMessage });
    setNewMessage("");
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Add a new message..."
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
          {messages?.map((message) => (
            <li
              key={message._id}
              className="flex items-center gap-3 p-3 bg-gray-800 rounded"
            >
              <input
                type="checkbox"
                checked={message.isRead}
                onChange={() => toggleRead({ id: message._id })}
                className="w-5 h-5"
              />
              <span
                className={`flex-1 ${message.isRead ? "line-through text-gray-500" : ""}`}
              >
                {message.text}
              </span>
            </li>
          ))}
        </ul>

        {messages?.length === 0 && (
          <p className="text-center text-gray-500">
            No messages yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
