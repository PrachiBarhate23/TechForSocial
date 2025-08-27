import axios from "axios";
import { Project } from "../types/Project";

const API_URL = "http://localhost:8000/api/projects/";

export async function getProjects(params?: {
  category?: string;
  tag?: string;
  search?: string;
}): Promise<Project[]> {
  const response = await axios.get<Project[]>(API_URL, { params });
  return response.data;
}