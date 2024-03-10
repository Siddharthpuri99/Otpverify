import React from 'react'
import "../style/mix.css";
import { useState } from 'react';
import   {toast,ToastContainer } from 'react-toastify';
import {registerfunction} from "../services/Apis";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [showpass,setshowpass] = useState(false);
  const[input,setinput] = useState({
    "fname":"",
    "email":"",
    "password":"",
  });
  const navigate = useNavigate();
  // console.log(input);
  function handleinput(e){
    const {name,value} = e.target;
    setinput({...input,[name]:value});
  }
  //  async function  handlesubmit(e){
  //   e.preventDefault();
  //   const{fname,email,password} = input;
  //   if(fname===""){
  //     toast.error("Enter Name!!");
  //   }
  //   else if(email===""){
  //     toast.error("Enter email");
  //   }else if(!email.includes("@")){
  //     toast.error("Enter email!!");
  //   }
  //   else if(password===""){
  //     toast.error("Enter password!!");
  //   }
  //   else if(password.length<6){
  //     toast.error("shorter password!!");
  //   }
  //   else{
  //     const response = await registerfunction(input);
  //     console.log(response.fname);
  //   }
    
  // }
  // async function handlesubmit(e) {
  //   e.preventDefault();
  //   const { fname, email, password } = input;
  
  //   try {
  //     if (fname === "") {
  //       throw new Error("Enter Name!!");
  //     } else if (email === "") {
  //       throw new Error("Enter email");
  //     } else if (!email.includes("@")) {
  //       throw new Error("Enter a valid email!!");
  //     } else if (password === "") {
  //       throw new Error("Enter password!!");
  //     } else if (password.length < 6) {
  //       throw new Error("Password should be at least 6 characters long!!");
  //     }
  
  //     const response = await registerfunction(input);
  //     console.log(response);
  
  //     // Assuming registerfunction() returns something meaningful
  //     // You can handle the response as needed
  //     if (response.success) {
  //       // Registration successful, show a success message or redirect
  //       toast.success("Registration successful!");
  //     } else {
  //       // Handle other scenarios based on the response
  //       toast.error("Registration failed. Please try again.");
  //     }
  //   } catch (error) {
  //     // Handle errors thrown during validation or registration
  //     toast.error(error.message);
  //   }
  // }
  async function handlesubmit(e) {
    e.preventDefault();
    const { fname, email, password } = input;
  
    try {
      if (fname === "") {
        throw new Error("Enter Name!!");
      } else if (email === "") {
        throw new Error("Enter email");
      } else if (!email.includes("@")) {
        throw new Error("Enter a valid email!!");
      } else if (password === "") {
        throw new Error("Enter password!!");
      } else if (password.length < 6) {
        throw new Error("Password should be at least 6 characters long!!");
      }
  
      const response = await registerfunction(input);
      if(response.status===200){
        setinput({fname:"",email:"",password:""});
        navigate("/")
      } else{
        toast.error(response.response.data.error)
      }
  
      // Assuming registerfunction() returns something meaningful
      // You can handle the response as needed
      
    } catch (error) {
      // Handle errors thrown during validation or registration
      toast.error(error.message);
    }
  }
  
  return (
    <>

    <section>
    <div className='form_data'>
        <div className='form_heading'>
         <h1>Welcome In Sign Up....</h1>
        </div>
        <form >
            <div className='form_input'>
                <label htmlFor="email">Name</label>
                <input type="text" name='fname' id="" onChange={handleinput} placeholder='Enter your Name' />
            </div>
            <div className='form_input'>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id=""  onChange={handleinput} placeholder='Enter your Email' />
            </div>
            <div className='form_input'>
                <label htmlFor="password">Password</label>
                <div className='two'>
                <input type={!showpass ? "password":"text"}  onChange={handleinput} name='password' id="" placeholder='Enter your password' />
                <div className='showpass' onClick={()=>setshowpass(!showpass)} >
                  {!showpass?"Show":"Hide"}
                </div>
                </div>
            </div>
            <button  className='btn' onClick={handlesubmit} >Sign Up</button>
           
        </form>
    </div>
    <ToastContainer/>
</section>
    </>
  )
}

export default Register