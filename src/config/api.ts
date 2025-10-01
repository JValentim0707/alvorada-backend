import axios, { AxiosInstance } from "axios"

// Config for API URL
const baseURL: string = "https://dog.ceo/api"

// Config for setup base url on axios
const api: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api