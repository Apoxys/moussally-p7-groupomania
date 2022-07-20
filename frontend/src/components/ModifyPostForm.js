import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userTokenContext } from '../context/UserContext';

const ModifyPostForm = (postData) => {

    const { userToken, setUserToken } = useContext(userTokenContext)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [imgPostFile, setImgPostFile] = useState()

    // Fetch data from specific post
    //define URLparams Object to get post id
    let URLparams = useParams()
    //define user token
    axios.defaults.headers.common['Authorization'] = userToken

    console.log("old data : ", postData.post)
    console.log(postData.post.title)

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

        axios.put(`http://localhost:3001/api/posts/${URLparams.id}, ${formData}`)
            .then(res => {

                console.log("updated : ", res.data)
            })
            .catch(error => {
                console.log(error, "not yet but soon")
            })
    };

    // useEffect(() => {
    // setTitle(postData.post.title)
    // setBody(postData.post.body)
    // setImgPostFile(postData.post.imageUrl)
    // }, [])

    return (
        <div>
            <form className='form-create-post' onSubmit={(e) => handleUpdateSubmit(e)} encType="multipart/form-data">
                <label htmlFor='title'>
                    Titre de la publication :
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label htmlFor='body'>
                    Dites nous tout :
                    <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                </label>
                <label htmlFor='image'>
                    Une image vaut mille mots
                    <input type="file" name="imagePost" id="imagePost" accept='image/png, image/jpeg, image/jpg, image/gif' value={imgPostFile} onChange={handlePostImg} />
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default ModifyPostForm;