import axios from "axios";

// const API = axios.create({baseUrl:`http://localhost:5000`});
const API = axios.create({baseUrl:`https://tourist-server.vercel.app`});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>  API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (id,comment) => API.patch(`/posts/${id}/commentPost`,{comment});

export const signup = (formData) => API.post(`/users/signup`, formData);
export const signin = (formData) => API.post(`/users/signin`, formData);