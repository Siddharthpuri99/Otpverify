import React from 'react'
import "../style/mix.css";
import { NavLink } from 'react-router-dom';
import   {toast,ToastContainer } from 'react-toastify';
import { useState } from 'react';
import {sendotopfunction} from "../services/Apis"
import { useNavigate } from 'react-router-dom';
// import { send } from 'process';


function Login() {
    const[email,setEmail] = useState("");
    const navigate = useNavigate();
    console.log(email);
   const sendOtp = async(e) =>{
        e.preventDefault();
       if(email === " "){
        toast.error("Enter Your Email!!");

       } else if(!email.includes("@")){
        toast.error("Enter Valid Email")
       }
       else{
        const data = {
            email:email
        }
        const response  = await sendotopfunction(data);
            if(response.status===200){
                navigate("/user/otp",{state:email});
            } else{
                toast.error("OHH no");
            }
       }
      
   }
        // const handletoast = (e) =>{
        //     e.preventDefault();
        //     if(email===""){
        //         toast.error("Enter Email");
        //     }
        //     else if(!email.includes("@")){
        //         toast.error("Enter valid Email");
        //     }
        //     else{
        //         toast.success("login done");
        //     }
        // }
  return (
    <>
        <section>
            <div className='form_data'>
                <div className='form_heading'>
                 <h1>Wlcome Back, Log In</h1>
                 <p>Hi , we are you glad you are back Please Login~</p>
                </div>
                <form >
                    <div className='form_input'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <button  onClick={sendOtp} className='btn' >Login</button>
                    <p>Dont have and account <NavLink to= "/register">Sign Up</NavLink></p>
                </form>
            </div>
            <ToastContainer/>
        </section>
    </>
  )
}

export default Login