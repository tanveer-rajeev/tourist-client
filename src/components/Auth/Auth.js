    import React,{ useState} from 'react'
    import { Avatar,Button,Paper,Typography,Grid,Container, Box } from '@mui/material'
    import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
    import {signup,signin} from '../../actions/authActions.js'
    import { GoogleOAuthProvider } from '@react-oauth/google';
    import { GoogleLogin } from '@react-oauth/google';

    import {useDispatch} from 'react-redux';
    import jwt_decode from 'jwt-decode';
    import {useNavigate} from 'react-router-dom';

    import Registration from './Registration';

    const Auth = () => {
    const [formData,setFormData] = useState({ firstName: '',lastName: '',email: '',password: '',confirmPassword: ''});

        const [isSignup,setIsSignup] = useState(false);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const switchMode = () => {          
            setIsSignup((prev) => !prev)
        }

        const googleSuccess = async(res) => {
            
            const result = jwt_decode(res.credential);
            const token = res.credential;
            
            try{
            dispatch({ type : 'AUTH', payload : {result, token} })  
            navigate('/');
            }catch(error){
                console.log(error);
            }      
        }
        const handleSubmit = (e) => {
            e.preventDefault();
           console.log(formData);
            if(isSignup){
                dispatch(signup (formData,navigate));
            } 
            else{
                dispatch(signin (formData,navigate));
            } 
        }
        const googleFailure = (err) => {console.log(err);}
        

    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
            <Container component='main' maxWidth='xs'>
            <Paper sx={{marginTop: 10,display: 'flex',flexDirection: 'column',alignItems: 'center',padding: '10px'}} elevation={6}>
              
                
                       <Avatar sx={{ m: 1, bgcolor: "secondary.main" ,alignItems: 'center',justifyContent: 'center'}}>
                         <LockOutlinedIcon />
                       </Avatar>
                       <Typography variant='h5'>{isSignup?'Sign Up':'Sign in'}</Typography>
                  
                
                    <Box component ='form'sx = {{ alignItems: 'center',padding: '10px',justifyContent: 'center',}} onSubmit={handleSubmit}>
                        
                        <Registration isSignup={isSignup} formData={formData} setFormData={setFormData} />
                        
                        
                        <Box sx={{
                                  justifyContent: 'center',
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: '100%',}}>
                            <GoogleLogin
                           
                            // render = {(renderProps) => (
                            //     <Button color="primary" sx = {{border: '1px solid red'}} onClick={renderProps.onClick} 
                            //     disabled={renderProps.disabled} >
                            //     Google Sign In
                            //     </Button>
                            // )}
                            buttonText="Login"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={"single_host_origin"}
                            useOneTap
                        />
                        </Box>
                        
                        
                    </Box>
               
                
                <Grid container justify="flex-end">
                    <Grid item >
                    <Button onClick={switchMode}>
                        {isSignup?'Already have an account ? Sign Up':"Don't have an account Sign"}
                    </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
        </GoogleOAuthProvider>
        
    )
    }

    export default Auth