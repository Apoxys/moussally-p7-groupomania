import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SpecificCard = ({ post }) => {

    //import
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [imgPostFile, setImgPostFile] = useState()
    //endofimport
    const [isEditing, setIsEditing] = useState(false)

    const navigate = useNavigate()
    const postId = post._id

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
        // navigate("/post_modify/" + postId)
        setIsEditing(true)
    };

    const deletePostHandler = (e) => {
        window.alert("vous êtes sur de vouloir supprimer ce post ?")
    };

    //import
    const handlePostImg = (e) => {
        e.preventDefault()
        setImgPostFile(e.target.files[0])
    };

    const handleUpdateSubmit = (e) => {

        e.preventDefault();
        const today = Date.now();
        const formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("body", e.target.body.value)
        formData.append("imagePost", imgPostFile)
        formData.append("date", today)

        axios.put(`http://localhost:3001/api/posts/${post.id}, ${formData}`)
            .then(res => {

                console.log("updated : ", res.data)
            })
            .catch(error => {
                console.log(error, "not yet but soon")
            })
    };
    //endofimport

    return (
        <main className='specific-card'>
            {
                isEditing ?
                    <form className='form-create-post' onSubmit={(e) => handleUpdateSubmit(e)} encType="multipart/form-data">
                        <label htmlFor='title'>
                            Titre de la publication :
                            <input type="text" name="title" value={post.title} onChange={(e) => setTitle(e.target.value)} required />
                        </label>
                        <label htmlFor='body'>
                            Dites nous tout :
                            <textarea name="body" value={post.body} onChange={(e) => setBody(e.target.value)} required></textarea>
                        </label>
                        <label htmlFor='image'>
                            Une image vaut mille mots
                            <input type="file" name="imagePost" id="imagePost" accept='image/png, image/jpeg, image/jpg, image/gif' value={post.imageUrl} onChange={handlePostImg} />
                        </label>
                        <input type="submit" value="Envoyer" />
                    </form>
                    :
                    <article className='specific-card-article'>

                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <img src={post.imageUrl} alt='' />Image of post {post.imageUrl}
                    </article>
            }


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