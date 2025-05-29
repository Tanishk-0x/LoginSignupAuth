import React, { useState } from 'react';
import './Style.css';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate() ; 

  const [Logininfo , setLoginInfo] = useState({
    email : '' , 
    password : ''
  }); 

  const HandleChange = (e) => {
    const {name , value} = e.target ; 
    const copyLoginInfo = {...Logininfo} ; 
    copyLoginInfo[name] = value ; 
    setLoginInfo(copyLoginInfo) ; 
  }


  const HandleLogin = async (e) => {
    
    e.preventDefault() ; 
    const {email , password} = Logininfo ; 
    if( !email ||!password ){
      toast.error("All Fields are Required") ; 
    }

    try {
      const url = "http://localhost:5000/auth/login" ; 
      const res = await fetch(url, {
        method : "POST" , 
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(Logininfo) 
      }) ; 

      const result = await res.json() ; 
      const { success , message , error, jwtToken , name } = result ; 

      if(success){
        toast.success("Login SuccessFull") ;
        // set to local storage
        localStorage.setItem('token' , jwtToken) ; 
        localStorage.setItem('loggedInUser' , name) ; 
        setTimeout(() => {
          navigate('/home') ; 
        }, 3000);
      }else{
        const details = message.details[0].message ; 
        toast(details) ; 
      }
      console.log(result) ; 
      console.log("login data : " , Logininfo) ; 
    }

    catch (error) {
      console.log(error) ; 
      toast.error("An Error Occured") ; 
    }
  }

  

  return (

    <div className="container">
      <h1>Login</h1>

      <form onSubmit={HandleLogin}>

        <div>
          <input name='email' type="text" autoFocus placeholder='Enter email'
            onChange={HandleChange}
            value={Logininfo.email}
          />
        </div>

        <div>
          <input name='password' type="text" autoFocus placeholder='Enter password'
            onChange={HandleChange}
            value={Logininfo.password}
          />
        </div>

        <button type='submit'> SignUp </button>

        <span>Don't have account ? 
          <Link to="/signup">Signup</Link>
        </span>

      </form>

    </div>

  )

};


export default Login;
