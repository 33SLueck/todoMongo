import axios from "axios";

// Use relative URLs by default so the frontend can be served from the same origin as the API.
// If you still want to override at build time, set VITE_API_URL; otherwise leave empty for relative paths.
const API_BASE = import.meta.env.VITE_API_URL ?? "";

const client = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export type TodoItem = {
  _id: string;
  todo: string;
};

export async function fetchTodos(): Promise<TodoItem[]> {
  const res = await client.get<TodoItem[]>('/todos');
  return res.data;
}

export async function createTodo(todo: string) {
  const res = await client.post('/todos', { todo });
  return res.data;
}

export async function updateTodo(id: string, todo: string) {
  const res = await client.put(`/todos/${id}`, { todo });
  return res.data;
}

export async function deleteTodo(id: string) {
  const res = await client.delete(`/todos/${id}`);
  return res.data;
}

export default client;
