import axios from 'axios';

const http = axios.create({
  // 请求前缀
  baseURL: `/${import.meta.env.VITE_API_PREFIX}`,
  // 超时时间
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 添加token
    // if (config.headers) {
    //   const token = '';
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    return Promise.reject(error);
  },
);

export default http;
