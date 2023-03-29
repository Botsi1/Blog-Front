
import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";



const Single = () => {

  const posts =
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    username: "Botsi",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    userImg: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "ART",
    img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
    ;

  const [post, setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(posts)
      } catch (error) {

        console.log(error)

      }
    }

    fetchData()
  }, [postId])

  const handleDelete = async () => {

    try {
      await axios.delete(`/posts/${postId}`)
    } catch (error) {

      console.log(error)

    }
  }


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className="single">
      <div className="content">
        <img src={posts.img} alt="" />
        <div className="user">
          {posts.userImg && <img src={posts.userImg} alt="" />}
        </div>
        <div className="info">
          <span>{posts.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        {posts.username && (
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
        )}

        <h1>{posts.title}</h1>

        <p dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(posts.desc)
        }}></p>


      </div>

      <Menu cat={posts.cat} />
    </div>
  )
}

export default Single
