    import React,{ useState, useEffect} from 'react'
    import { Container, Grow, Grid, Paper, AppBar, TextField, Autocomplete, Chip, Stack, Button} from "@mui/material";
    import Posts from "../../components/Posts/Posts";
    import Form from "../../components/Form/Form";  
    import { getPostsBySearch } from "../../actions/postActions";
    import Pagination from "../Pagination/Pagination"
    import { useDispatch } from "react-redux";
    import { useLocation, useNavigate } from 'react-router-dom';
    import { useSelector } from "react-redux";

    function useQuery(query) {
      return new URLSearchParams(useLocation().search);
    }
    
    const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const [search,setSearch] = useState('');
    
    const [tags,setTags] = useState([]);
    const {posts,isLoading} = useSelector((state) => state?.posts);
    const [selectedTag,setSelectedTag] = useState([]);

    // TODO: Tags suggestion shows just page 1 tags..
    
    useEffect(() => {  
      let tagSet = new Set();
      let arr = []
      if(!isLoading){
        posts?.map((post) => post?.tags?.map(tag => tagSet.add(tag)));
        tagSet.forEach((tag)=>arr.push(tag));
        setTags(arr);
      } 
      
    },[posts,isLoading]) 
  
    const searchPost = ()=> {

      if(search.trim() || selectedTag){
        dispatch(getPostsBySearch( { search, tags: selectedTag.join(',') } ));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${selectedTag.join(',')}`)
      }else{
        navigate('/');
      }      
    }

    const handleSearch = (e) =>{
      console.log(e.keyCode);
       if(e.keyCode === 13) searchPost();
    }

    return (
      <Grow in>
        <Container maxWidth="xxl">
          
         <Grid container spacing={3} sx={{display: 'flex',alignItems:"stretch",justify: 'space-between',}}>
            
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>

            <Grid   item xs={12} sm={6} md={3}> 
              <AppBar sx={{borderRadius: 2,marginBottom: '.79rem',display: 'flex',padding: '16px',}}  position="static" color="inherit">
                
                 <TextField sx={{marginBottom: "7px"}}
                   name="search"
                   variant="outlined"
                   label="Search Content"
                   fullWidth
                   value={search}
                   onKeyPress={handleSearch}
                   onChange={(e)=>setSearch(e.target.value)}
                 />
                 
                 <Stack>
                  <Autocomplete
                     multiple
                     id="tags-filled"                    
                     options={tags}
                     value={selectedTag}
                     onChange={(event,newValue)=>setSelectedTag(newValue)}    
                     freeSolo     
                     renderInput= {(params) => (
                       <TextField
                         {...params}                         
                         label="Search tags"
                         placeholder="Favorites"
                         
                       />
                     )}
                  />
                 </Stack>
                 <Button sx={{marginTop:"10px"}} onClick={searchPost} fullWidth variant ="contained" color ="primary"> 
                   Search 
                 </Button>
                
              </AppBar>

              <Form currentId={currentId}  setCurrentId={setCurrentId}/>
              
              <Paper elevation={6}>
                    <Pagination page={page}/>
              </Paper>
            </Grid>
         </Grid>
        </Container>
      </Grow>
    )
    }

    export default Home