import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";



const Navbar  = () =>{
   const  {currentUser, logout } = useContext(AuthContext)
   
   
   return(
      <div>
         <h1>NAVbAR</h1>
      </div>
       
   )
}


export default Navbar