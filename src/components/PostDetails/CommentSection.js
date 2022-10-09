import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, {useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/postActions';

function CommentSection({post}) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    console.log(post);
    const [comment,setComment] = useState('');
    const [comments,setComments] = useState(post?.comments);
  
    const handleClick = async()=>{
        const finalComment = `${user?.result?.name} : ${comment}`;
        const newComment = await dispatch(commentPost(post._id,finalComment));
        setComments(newComment);
        setComment('');
    }
  
    return (
        <Box>
            <Typography gutterBottom>{comments.length} Comments</Typography>
            <Divider style={{ margin: '20px 0' }} />
        
            { user?.result?.name && 
                <Box style={{width:"70%"}}>
                    <Typography>Write a comment...</Typography>
                    
                    <TextField
                        fullWidth 
                        multiline   
                        variant="outlined"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />  
                    <Button style={{marginTop: '10px'}} variant="contained" disabled={!comment} fullWidth onClick={handleClick}>
                        comment
                    </Button>
                </Box>    
            }
            <Box sx={{marginTop: '20px'}}>
                
                {comments?.map((comment,key) => (
                    <Typography key={key}>
                        <strong>{comment?.split(':')[0]}</strong>
                        {comment?.split(':')[1]}
                        </Typography>
                ))}
            </Box> 
        </Box>

  )
}

export default CommentSection