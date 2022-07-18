import React from 'react';

const Card = ({ post }) => {

    return (
        <div className='card'>
            <article className='card-article'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={post.imageUrl} alt='' />Image of post {post.imageUrl}
            </article>
            <aside className='card-aside'>
                <span>number of likes : {post.likes}</span>
                <span>number of dislikes : {post.dislikes}</span>
                <br />
                Posted on {post.date}
            </aside>
        </div>
    );
};

export default Card;