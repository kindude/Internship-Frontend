import axios from 'axios';

const instance = axios.create();

// Добавляем интерцептор для запросов
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


instance.interceptors.response.use(
  response => response,
  error => {
    // Обработка ошибок, если необходимо
    return Promise.reject(error);
  }
);

export default instance;
