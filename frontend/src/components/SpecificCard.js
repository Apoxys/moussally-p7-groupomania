import React from 'react';

const SpecificCard = ({ post }) => {

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

    // modify and delete button handler
    const modifyPostHandler = (e) => {

        console.log("on avance")
    };

    const deletePostHandler = (e) => {
        console.log("on recule")
    };

    return (
        <main className='specific-card'>

            <article className='specific-card-article'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={post.imageUrl} alt='' />Image of post {post.imageUrl}
            </article>

            <aside className='specific-card-aside'>
                <span>number of likes : {" " + post.likes}</span>
                <span>number of dislikes : {" " + post.dislikes}</span>
                <br />
                Posté le {dateFormater(post.date)}
            </aside>
            <button onClick={(e) => modifyPostHandler(e)}>Modify post</button>
            <button onClick={(e) => deletePostHandler(e)}>Delete post</button>
        </main>
    );
};

export default SpecificCard;