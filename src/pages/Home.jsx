import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [post,setPost] = useState([])

  const cat = useLocation().search

  useEffect(() =>{
   const fetchData = async() =>{

    try {
      const res = await axios.get(`/posts${cat}`)
      setPost(res.data)
    } catch (error) {
      console.log(error)
      
    }

    fetchData()
   }
  },[cat])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
  }
   
  return (
    <div>
      <h1>home</h1>
    </div>
  )
}

export default Home
