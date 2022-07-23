import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { userContext, userTokenContext } from '../context/UserContext';

const CreatePost = () => {
    const [authorId, setAuthorId] = useState()
    const [postImgInput, setPostImgInput] = useState()
    const [imgPostFile, setImgPostFile] = useState()
    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)

    const navigate = useNavigate()

    axios.defaults.headers.common['Authorization'] = userToken

    useEffect(() => {
        if (!localStorage.getItem("userConnected")) {
            navigate("/login")
        }
        if (currentUser) {
            setAuthorId(localStorage.getItem("userConnected"))
        }
    }, [currentUser, navigate])

    const handlePostImg = (e) => {
        e.preventDefault()
        setPostImgInput(e.target.value)
        setImgPostFile(e.target.files[0])
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const today = Date.now();
        const formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("body", e.target.body.value)
        formData.append("imagePost", imgPostFile)
        formData.append("date", today)
        formData.append("authorId", authorId)

        axios.post('http://localhost:3001/api/posts', formData)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className='global'>
            < Nav />
            <div className='maincontent'>
                <p>Publiez ici</p>
                < form className='form-create-post' onSubmit={(e) => handlePostSubmit(e)} encType="multipart/form-data" >
                    <label htmlFor='title'>
                        Titre de la publication :
                        <input type="text" name="title" placeholder='Le titre de votre publication' required />
                    </label>
                    <label htmlFor='body'>
                        Dites nous tout :
                        <textarea name="body" placeholder='Votre publication' required></textarea>
                    </label>
                    <label htmlFor='image'>
                        Une image vaut mille mots
                        <input type="file" name="imagePost" id="imagePost" accept='image/png, image/jpeg, image/jpg, image/gif' value={postImgInput} onChange={handlePostImg} />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form >
            </div>
        </div >
    );
};

export default CreatePost;