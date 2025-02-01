import axios from 'axios';

export const httpAxios = axios.create({
  baseURL: 'https://ecommerce-furniture-project.vercel.app/'
});