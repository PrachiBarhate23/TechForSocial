import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const authHeader = (token?: string) =>
  token ? { Authorization: `Bearer ${token}` } : {};

export async function getProjects(params?: {
  category?: string;
  tag?: string;
  search?: string;
}): Promise<any[]> {
  const res = await api.get("/projects/", { params });
  return res.data;
}

export async function getProject(id: number): Promise<any> {
  const res = await api.get(`/projects/${id}/`);
  return res.data;
}

export async function getBlogs(params?: Record<string, string>): Promise<any[]> {
  const res = await api.get("/blogs/", { params });
  return res.data;
}

export async function getBlog(id: number): Promise<any> {
  const res = await api.get(`/blogs/${id}/`);
  return res.data;
}

export async function likeBlog(blogId: number, token?: string) {
  const res = await api.post(`/blogs/${blogId}/like/`, null, { headers: authHeader(token) });
  return res.data;
}

export async function replyBlog(blogId: number, content: string, token?: string) {
  const res = await api.post(`/blogs/${blogId}/reply/`, { content }, { headers: authHeader(token) });
  return res.data;
}

export async function createBlog(payload: Record<string, any>, token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const res = await api.post("/blogs/", payload, { headers });
  return res.data;
}

export async function deleteReply(blogId: number, replyId: string | number, token?: string) {
  const res = await api.delete(`/blogs/${blogId}/reply/${replyId}/`, { headers: authHeader(token) });
  return res.data;
}
