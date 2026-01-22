import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Automatically attach token to each request
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('usertoken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const fetchProducts=createAsyncThunk(
    'Products/fetchProducts',
    async(_,thunkAPI)=>{
      const response=await axios.get('http://localhost:8000/api/v1/products')
      console.log(response.data.data)
      return {
        AllProducts:response.data.data,
        paginationResult:response.data.paginationResult
      }
    }
)
