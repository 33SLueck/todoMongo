

import React, { useEffect, useState } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";
import type { TodoItem } from "../api/todoApi";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newTodo.trim()) return;
    try {
      await createTodo(newTodo.trim());
      setNewTodo("");
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (t: TodoItem) => {
    setEditingId(t._id);
    setEditingText(t.todo);
  };

  const submitEdit = async (id: string) => {
    if (!editingText.trim()) return;
    try {
      await updateTodo(id, editingText.trim());
      setEditingId(null);
      setEditingText("");
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>

        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 rounded bg-gray-800 text-gray-100 border border-gray-600"
            placeholder="Add new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className="px-4 py-2 bg-green-600 rounded" type="submit">
            Add
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="space-y-2">
            {todos.map((t) => (
              <li key={t._id} className="flex items-center justify-between bg-gray-800 p-3 rounded">
                <div className="flex-1">
                  {editingId === t._id ? (
                    <input
                      className="w-full p-2 rounded bg-gray-900 text-gray-100 border border-gray-600"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  ) : (
                    <span className="text-gray-200">{t.todo}</span>
                  )}
                </div>

                <div className="ml-4 flex gap-2">
                  {editingId === t._id ? (
                    <>
                      <button className="px-3 py-1 bg-blue-600 rounded" onClick={() => submitEdit(t._id)}>
                        Save
                      </button>
                      <button className="px-3 py-1 bg-gray-600 rounded" onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-3 py-1 bg-yellow-600 rounded" onClick={() => startEdit(t)}>
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 rounded" onClick={() => handleDelete(t._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todo;