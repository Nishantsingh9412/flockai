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

// End Authentication API's

// My Wishlist API's 
// Create My Wishlist
export const CreateMyWishlistAPI = (newWishList) => API.post('/my-wishlist/new-mywishlist', newWishList)
// Get My Wishlist
export const getMyWishlistAPI = (userId) => API.get(`/my-wishlist/get-mywishlist/${userId}`)
// Update My Wishlist
export const updateMyWishlistAPI = (id, updatedWishList) => API.patch(`/my-wishlist/update-mywishlist/${id}`, updatedWishList)
// Delete My Wishlist
export const deleteMyWishlistAPI = (id) => API.delete(`/my-wishlist/delete-mywishlist/${id}`)

// End My Wishlist API's


// Wishlist API's
// Create Wishlist
export const CreateWishlistAPI = (newWishList) => API.post('/wishlist/new-wishlist', newWishList)
// Get Wishlist
export const getWishlistAPI = (userId) => API.get(`/wishlist/get-wishlist/${userId}`)
// Update Wishlist
export const updateWishlistAPI = (id, updatedWishList) => API.patch(`/wishlist/update-wishlist/${id}`, updatedWishList)
// Delete Wishlist
export const deleteWishlistAPI = (id) => API.delete(`/wishlist/delete-wishlist/${id}`)
// End Wishlist API's

