  import React, { useState, useEffect } from "react";
  import {TextField,Typography,Button,Paper,FormControl,Box,Grid,} from "@mui/material";
  import FileBase from "react-file-base64";
  import { useDispatch,useSelector } from "react-redux";
  import { createPost,updatePost } from "../../actions/postActions";
  import {useNavigate} from 'react-router-dom';

  const Form = ({currentId, setCurrentId}) => {
    
    const [postData, setPostData] = useState({title: "",message: "",tags:"",selectedFile: "",});
    const dispatch = useDispatch();
    let {posts} = useSelector((state) => state.posts);
    posts = currentId ? posts.find((post) => post._id === currentId) : null
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();

    useEffect(()=>{
      if(posts) setPostData(posts);
    },[posts])

    const handleSubmit = (e) => {
      e.preventDefault();

      if(currentId){
        dispatch(updatePost(currentId,{...postData, name: user?.result?.name}));
      }
      else {
        dispatch(createPost({...postData, name: user?.result?.name},navigate));       
      }
      clear();
    };

    if(!user?.result?.name){
      return(
            <Paper>
              <Typography variant ="h6" align="center">
                Please sign in to create your own content or like, comment to other's content
              </Typography>
            </Paper>
      );
    }

    const clear = () => {
      setCurrentId(null);
      setPostData({title: "",message: "",tags: "",selectedFile: ""});
    };

    return (
      <Paper elevation={6}  sx={{padding: 2 }}>
        <FormControl  component="form"  sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}  autoComplete ="off" noValidate  onSubmit={handleSubmit}>        
          <Typography variant="h6">{currentId ? 'Editing':'Creating'} a memrory</Typography>        
          <Grid container spacing={2}>
            
            <Grid item xs={12} sm={14}>
              <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => {setPostData({ ...postData, title: e.target.value });  }}/>
            </Grid>
            <Grid item xs={15} sm={14}>
              <TextField  name="message"  variant="outlined"  label="message"  fullWidth multiline rows={4} value={postData.message}  onChange={(e) => {setPostData({ ...postData, message: e.target.value });}}/>
            </Grid>
            <Grid item xs={12} sm={14}>
              <TextField  name="tags"  variant="outlined"  label="tags"  fullWidth  value={postData.tags}  onChange={(e) => {setPostData({ ...postData, tags:e.target.value.split(",") });  }}/>
            </Grid>
          </Grid>
          <Box sx={{ width: "97%", margin: "10px 0" }}>
            <FileBase  type="file"  multiple={false}  onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
          </Box>        
          <Button  sx={{ marginBottom: 2 }}  variant="contained"  color="primary"  size="large"  type="submit">  Submit </Button>
          <Button  variant="contained"  color="secondary"  size="small"  onClick={clear}>  Clear  </Button>      
        </FormControl>
      </Paper>
    );
  };

  export default Form;
