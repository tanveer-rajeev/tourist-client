import React from "react";
import { Container} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {Routes,BrowserRouter,Route,Navigate} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";


const  App  = ()=> {

  const user = JSON.parse(localStorage.getItem('profile'));
    return (
      <BrowserRouter>
      <Container maxWidth="xxl">
      
        <Routes>
            <Route element ={<Navbar/>}>
              <Route path = "/auth"  element = { <Auth /> }/> 
              <Route path = "/" element = {<Navigate to="/posts" replace />}/>
              <Route path = "posts"  element = {<Home />}/>
              <Route path = "posts/:id"  element = {<PostDetails />}/> 
              <Route path = "posts/search"  element = {<Home />}/>  
            </Route>
            
       </Routes>
              
      </Container>
      </BrowserRouter>
    );
  }

  export default App;
