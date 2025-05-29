import React, { useState } from 'react';
import './Style.css';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Signup = () => {

  const navigate = useNavigate() ; 

  const [Signupinfo , setSignupInfo] = useState({
    name : '' , 
    email : '' , 
    password : ''
  }); 

  const HandleChange = (e) => {
    const {name , value} = e.target ; 
    const copySignupInfo = {...Signupinfo} ; 
    copySignupInfo[name] = value ; 
    setSignupInfo(copySignupInfo) ; 
  }


  const HandleSignup = async (e) => {

    e.preventDefault() ; 
    const {name , email , password} = Signupinfo ; 
    if( !name || !email ||!password ){
      toast.error("All Fields are Required") ; 
    }

    try {
      const url = "http://localhost:5000/auth/signup" ; 
      const res = await fetch(url, {
        method : "POST" , 
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(Signupinfo) 
      }) ; 

      const result = await res.json() ; 
      const {success , message , error} = result ; 

      if(success){
        toast.success("Login SuccessFull") ;
        setTimeout(() => {
          navigate('/login') ; 
        }, 3000);
      }else{
        const details = message.details[0].message ; 
        toast(details) ; 
      }
      console.log(result) ; 
      console.log("signUp data : " , Signupinfo) ; 
    }

    catch (error) {
      console.log(error) ; 
      toast.error("An Error Occured") ; 
    }
  }

  

  return (

    <div className="container">
      <h1>Signup</h1>

      <form onSubmit={HandleSignup}>

        <div>
          <input name='name' type="text" autoFocus placeholder='Enter name'
          onChange={HandleChange}
          value={Signupinfo.name}
          />
        </div>

        <div>
          <input name='email' type="text" autoFocus placeholder='Enter email'
            onChange={HandleChange}
            value={Signupinfo.email}
          />
        </div>

        <div>
          <input name='password' type="text" autoFocus placeholder='Enter password'
            onChange={HandleChange}
            value={Signupinfo.password}
          />
        </div>

        <button type='submit'> SignUp </button>

        <span>Already have an account ? 
          <Link to="/login">Login</Link>
        </span>

      </form>

    </div>

  )

};


export default Signup;
