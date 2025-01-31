import axios from 'axios';

// Create an Axios instance with a base URL
export const httpAxios = axios.create({
  baseURL: 'http://localhost:3000'
});