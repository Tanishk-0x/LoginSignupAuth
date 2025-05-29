import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const Home = () => {

  const navigate = useNavigate() ; 
  const [loggedInUser , setLoggedInUser] = useState(``) ; 
  const [products , setProducts] = useState(``) ; 


  useEffect( () => {
    setLoggedInUser(localStorage.getItem('loggedInUser')) ; 
  },[])

  const HandleLogout = (e) => {
    localStorage.removeItem('token') ; 
    localStorage.removeItem('loggedInUser')
    setTimeout(() => {
      navigate('/login') ; 
    }, 3000);
  }

  const fetchProducts = async () => {

    try {
      const url = "http://localhost:5000/products/" ; 
      const headers = {
        headers : {
          'Authorization' : localStorage.getItem('token') 
        }
      }
      const response = await fetch(url , headers) ; 
      const result = await response.json() ; 
      setProducts(result) ; 
    }
    catch (error) {
      console.log(error) ; 
      toast("Home Page Error")
    }
  }

  useEffect( () => {
    fetchProducts() ; 
  },[])



  return (

    <div>

      <h1>{loggedInUser}</h1>
      <button onClick={HandleLogout}>LogOut</button>

      <div>
        {
          products && products?.map((item , index) => (
            <ul>
              <span>{item.name} : {item.price} </span>
            </ul>
          ))
        }
      </div>

    </div>

  )

}

export default Home
