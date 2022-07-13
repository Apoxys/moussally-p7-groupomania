import React from 'react';

const Card = ({ post }) => {

    return (
        <div>
            <article className='postcard'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={post.imageUrl} alt='' />Image of post {post.imageUrl}
            </article>
            <aside>
                <span>number of likes : {post.likes}</span>
                <span>number of dislikes : {post.dislikes}</span>
                <br />
                Posted on {post.date} by {post.authorId}
            </aside>
        </div>
    );
};

export default Card;