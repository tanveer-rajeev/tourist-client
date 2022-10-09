  import { Box, CircularProgress, Divider, Paper,  Typography } from '@mui/material'
  import React from 'react'
  import {getPost,getPostsBySearch} from '../../actions/postActions'
  import { useEffect } from 'react';
  import {useSelector,useDispatch} from 'react-redux';
  import { useParams,useNavigate } from 'react-router-dom';
  import moment from 'moment';
  import './style.scss';
  import CommentSection from './CommentSection';

  const PostDetails = () => {

    const {post, posts, isLoading} = useSelector((state) => state.posts);
    const {id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getPost(id));
    },[dispatch,id])

    useEffect(()=>{
      if(post){
        dispatch(getPostsBySearch({ search:'',tags:post.tags.join(',')}));
      }
    
    },[dispatch,post])


    if(!post) return null;

    if(isLoading){
      return (
        <Paper className="loadingPaper">
          <CircularProgress size= "7rem"/>
        </Paper>
      )
    }

    const handleNavigation = (id)=>{
      navigate(`/posts/${id}`)
    }
  
    const recommandedPost = posts.filter(({_id})=> _id !== post._id);
    console.log(recommandedPost);
    return (
      <>
      
        <Paper sx = {{display: "flex",width: "100%"}}>
            <Box sx={{margin:'1rem'}}>
                <Typography variant="h3" component="h2"> {post.title} </Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2"> {post.tags.map((tag) => `#${tag} `)} </Typography>
                <Typography gutterBottom variant="body1" component="p"> {post.message} </Typography>
                <Typography variant="h6"> Created by: {post.name} </Typography>
                <Typography variant="body1"> {moment(post.createdAt).fromNow()} </Typography>
                <Divider style={{ margin: '20px 0' }} />
                {/* <CommentSection  id ={post._id} comments={post.comments}/> */}
                <CommentSection  post={post}/>
                
            </Box>

            <Box sx={{marginLeft: '2rem',}}>
              <img className='media' src={post.selectedFile } alt={post.title} />
            </Box>        
        </Paper>

            {recommandedPost && (

              <Box  sx = {{width: "100%",marginTop: '5rem'}}>
                <Typography  variant ="h5"> You might like : </Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Box sx={{display: 'flex'}}>
                  
                  {recommandedPost.map(({title,_id,selectedFile,message,name,likes}) => 

                  <Box key={_id} onClick={()=>handleNavigation(_id)}  sx={{margin: '1rem',cursor:'pointer',width:'20rem'}}>
                      <Typography gutterBottom varient='h6'><strong>{title}</strong> </Typography>
                      <Typography gutterBottom variant='subtitle2'>{name} </Typography>
                      <Typography gutterBottom variant='subtitle2'>{message} </Typography>
                      <Typography gutterBottom variant='subtitle1'>Likes: {likes.length} </Typography>
                      <img 
                        style = {{width:'12rem',height:'14rem'}}  
                        src = {selectedFile} 
                        alt = {title}
                      />  
                      
                    </Box>

                  )}
                </Box>
                  
              </Box>

            )}
      </>
    )
  }

  export default PostDetails