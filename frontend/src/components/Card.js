import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { postContext } from '../context/PostContext';

const Card = ({ post }) => {

    const dateFormater = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        })
        return newDate
    }

    const { currentPost, setCurrentPost } = useContext(postContext)
    const navigate = useNavigate();

    // const handleSetPostId = (e) => {
    //     e.preventDefault();
    //     setCurrentPost(post._id)
    //     console.log(currentPost)
    //     navigate("/post/:" + post._id)
    // }
    // onClick={(e) => handleSetPostId(e)}

    return (
        <div className='card'>
            {/* <NavLink to={"/post/:" + post._id} > */}
            <article className='card-article'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={post.imageUrl} alt='' />Image of post {post.imageUrl}
            </article>
            {/* </NavLink> */}
            <aside className='card-aside'>
                <span>number of likes : {" " + post.likes}</span>
                <span>number of dislikes : {" " + post.dislikes}</span>
                <br />
                Posté le {dateFormater(post.date)}
            </aside>
        </div>
    );
};

export default Card;