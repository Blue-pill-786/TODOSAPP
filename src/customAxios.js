import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://todo-jfkg.onrender.com', // Set your base URL
  // You can include any custom axios configuration here
});

// You can use this custom axios instance to make your API requests
export default customAxios;
