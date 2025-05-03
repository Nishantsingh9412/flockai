import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

// For authentication purpose  

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('Profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
//     }
//     return req;
// });

// End For Authentication Purpose

// Authentication API's 
export const SignupAPI = (newUser) => API.post('/auth/signup', newUser)

export const LoginAPI = (logindata) => API.post('/auth/login', logindata)

export const sendOTPAPI = (email) => API.post('/otp/send-otp', email)