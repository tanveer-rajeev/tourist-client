  import React,{ useState} from "react";
  import {Card,Box,CardMedia,CardActions,CardContent,Button,Typography} from "@mui/material"
  import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
  import DeleteIcon from '@mui/icons-material/Delete';
  import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
  import moment from 'moment';
  import {useDispatch} from 'react-redux';
  import {likePost,deletePost} from '../../../actions/postActions'
  import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
  import {useNavigate} from 'react-router-dom';
  import InfoIcon from '@mui/icons-material/Info';

  function Post({ post,setCurrentId  }) {
    const [shown,setShown] = useState(false);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const [likes,setLikes] = useState(post?.likes);
    const userId = (user?.result?.sub || user?.result?._id);
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike =async ()=>{
      dispatch(likePost(post._id));
      if(hasLikedPost){
        setLikes(post.likes.filter((id) => id !== userId))
      }else{
        setLikes([...post.likes,userId]);
      }
    }
    const Likes = () => {
      if (likes.length > 0) {
        return likes.find((like) => like === (user?.result?.sub || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
    };
    
    const cardDetailsHandler = () => {
     navigate(`/posts/${post._id}`);
    }

    return (
      <Card   sx ={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between',
       borderRadius: '15px', height: '30rem', position: 'relative'}} elevation={6}> 
      
        <CardMedia component = "img" height="200rem" image = {post.selectedFile} title = {post.title} sx={{ backgroundBlendMode: 'darken',}} />
        <Box sx ={{position: 'absolute', top: '20px', left: '20px', color: 'white',}}>
          <Typography variant ="h6">{ post.name } </Typography>
          <Typography variant ="body2">{ moment(post.createdAt).fromNow() } </Typography>
        </Box>
        <Box sx={{position: 'absolute', top: '11px', right: '4px', color: 'white',}}>
          {
          (user?.result?._id === post.creator || user?.result?.sub === post.creator) && 
                <Button style ={{color: 'white'}} size ="large" onClick = {() => setCurrentId(post._id)}>
                  <MoreHorizIcon fontSize="default"/>
                </Button>
          }
          
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '20px',}}>
          <Typography  variant ="body2" color ="textSecondary">{post.tags.map(tag =>` #${tag}`)}</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography sx ={{padding: '0 16px',fontFamily:'Alliance1',color:'black'}} component ="p" variant ="h5" gutterBottom >
            {post.title}
          </Typography>
          <Button  
              onMouseEnter={()=>setShown(true)}
              onMouseLeave={()=>setShown(false)}
              sx={{color:'gray'}} 
              onClick={cardDetailsHandler}>
                
            <InfoIcon/>
            {shown && <Typography varient='h9'>Details</Typography>}
          </Button>
        </Box>
          
  
        <CardContent height='20' >
          <Typography  component ="p" variant ="body2" color ="#8b949e" gutterBottom >{post.message}</Typography>
        </CardContent>

          <CardActions sx={{height:'20px',padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between',}}>
              <Button disabled = {!user?.result} size= "small" color = "primary" onClick= {handleLike}>
                <Likes/>
              </Button> 
              {
                (user?.result?._id === post.creator || user?.result?.sub === post.creator) && 
                  <Button size="small" color = "primary" onClick={()=> {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                  </Button> 
              }
              
          </CardActions>
          
      </Card>
    );
  }

  export default Post;
