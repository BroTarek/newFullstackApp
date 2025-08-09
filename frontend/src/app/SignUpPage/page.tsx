"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const SignUpPage = () => {
    const router=useRouter()
    const [Form,setForm]=useState({
        email:"",
        name:"",
        password:"",
        passwordConfirm:""
    })
    const handleSignUpForm=async(e:any)=>{
        
        e.preventDefault()
        console.log(Form)
        const response= await axios.post("http://localhost:8000/api/v1/auth/signup",Form);
        console.log(response)
        const {data,token}=response.data
        localStorage.setItem("usertoken",token)
        localStorage.setItem("userData",JSON.stringify(data))
        if(response.status===201){
          window.location.href = "/home";}
    }
  return (
    <div style={{backgroundColor:"white"}}>
        <form onSubmit={(e)=>handleSignUpForm(e)}>
            <input type="email" name="email" id="email"          onChange={(e)=>setForm((prev)=>({...prev,email:e.target.value}))}></input>
            <input type="text" name="name" id="name"     onChange={(e)=>setForm((prev)=>({...prev,name:e.target.value}))}></input>
            <input type="password" name="password" id="password" onChange={(e)=>setForm((prev)=>({...prev,password:e.target.value}))}></input>
            <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={(e)=>setForm((prev)=>({...prev,passwordConfirm:e.target.value}))}></input>
            {/* <input type="tel" name="phone" id="phone"            onChange={(e)=>setForm((prev)=>({...prev,phone:e.target.value}))}></input> */}
            {/* <label htmlFor="roles">choose your role</label>
            <select name="roles" id="roles" onChange={(e)=>setForm((prev)=>({...prev,roles:e.target.value}))}>
                
                <option value=""></option>
                <option value="admin">admin</option>
                <option value="user">user</option>
                <option value="manager">manager</option>
            </select> */}
            <button type="submit"> submit</button>
        </form>
    </div>
  )
}

export default SignUpPage