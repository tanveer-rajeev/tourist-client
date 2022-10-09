  import * as api from "../api/api";
  import { FETCH_POST,FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH,START_LOADING,END_LOADING,COMMENT } from "../constants/actionTypes"
  
  
  // whenever dispatch will call then 
  export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({type: START_LOADING});
      const { data} = await api.fetchPost(id);
      
      dispatch({ type: FETCH_POST, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
  export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({type: START_LOADING});
      const { data} = await api.fetchPosts(page);
      
      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  export const getPostsBySearch = (searchQuery) => async (dispatch) => {
      console.log(searchQuery);
      try {
        dispatch({type: START_LOADING});
        const { data: { data }} = await api.fetchPostsBySearch(searchQuery) ;
       
        dispatch({ type: FETCH_BY_SEARCH, payload: data});
        dispatch({ type: END_LOADING });
      } catch (error) {
        console.log(error);
      }
    }

  export const createPost = (newPost,navigate) => async (dispatch) => {
  
    try {
      dispatch({type: START_LOADING});
      const { data } = await api.createPost(newPost);
      navigate(`/posts/${data._id}`);
       dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const updatePost = (id,updatePost) => async (dispatch) => {

    try {
      const { data } = await api.updatePost(id,updatePost);
     
      dispatch({ type: UPDATE,payload: data});
    } catch (error) {
      console.log(error);
    }
  }

  export const deletePost = (id) => async (dispatch) => {

    try {
      await api.deletePost(id);

      dispatch({ type: DELETE,payload: id});
    } catch (error) {
      console.log(error);
    }
  }

  export const likePost = (id) => async (dispatch) => {

    try {
      const { data } = await api.likePost(id);
     
      dispatch({ type: UPDATE,payload: data});
    } catch (error) {
      console.log(error);
    }
  }
  export const commentPost = (id,comment) => async (dispatch) => {

    try {
      const { data } = await api.commentPost(id,comment);
     
      dispatch({ type: COMMENT,payload: data});
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  }