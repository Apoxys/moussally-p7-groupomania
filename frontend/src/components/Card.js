import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';


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


    return (
        <div className='card'>
            <article className='card-article'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={post.imageUrl} alt='' />Image of post {post.imageUrl}
            </article>
            <aside className='card-aside'>
                <span><FaRegThumbsUp /> {" " + post.likes}</span>
                <span><FaRegThumbsDown /> {" " + post.dislikes}</span>
                <br />
                Posté le {dateFormater(post.date)}
            </aside>
        </div>
    );
};

export default Card;