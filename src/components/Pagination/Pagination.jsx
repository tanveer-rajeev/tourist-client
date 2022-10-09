import React,{useEffect} from 'react'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";

import {getPosts} from "../../actions/postActions"

const Paginate = ({page}) => {

  const {numberOfPages} = useSelector(state => state.posts);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(page) dispatch(getPosts(page));               
  }, [page,dispatch]);

  return (
    <Pagination sx={{ borderRadius: 4, marginTop: '1rem', padding: '.6rem',}}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem= {(item) => (
          <PaginationItem  {...item} component = {Link} to={`/posts?page=${item.page}`}  />
        )}
      />
 
  )
}

export default Paginate