import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5080";

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
