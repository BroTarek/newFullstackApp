"use client"
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Adjust path if needed

import SignUpPage from './SignUpPage/page'
const page = () => {
  return (
    <>
    <Provider store={store}>
     
       <SignUpPage/>
    </Provider>
    </>
    
    
  )
}

export default page