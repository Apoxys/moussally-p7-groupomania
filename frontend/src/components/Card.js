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
                <section className='card-article-text'>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </section>
                <img src={post.imageUrl} alt='' />
                {/* Image of post {post.imageUrl} */}
            </article>
            <aside className='card-aside'>
                <div className='card-aside-likes'>
                    <span><FaRegThumbsUp /> {" " + post.likes}</span>
                    <span><FaRegThumbsDown /> {" " + post.dislikes}</span>
                </div>
                <p>Posté le {dateFormater(post.date)}</p>
            </aside>
        </div>
    );
};

export default Card;