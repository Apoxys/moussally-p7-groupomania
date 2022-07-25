import React, { useState, useContext, useEffect } from 'react';
import { userTokenContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../components/Nav';

const EditPost = () => {

    let URLparams = useParams()
    const [post, setPost] = useState({})

    const getDataToEdit = () => {
        axios.get(`http://localhost:3001/api/posts/${URLparams.id}`)
            .then(res => {
                setPost(res.data)
                // console.log(res.data)
            })
            .catch(error => {
                console.log(error, "dw, you'll get there")
            })
    };

    let navigate = useNavigate();

    const { userToken, setUserToken } = useContext(userTokenContext)

    axios.defaults.headers.common['Authorization'] = userToken
    console.log('notrepost: ', post._id)
    //import from createpost page / used to update
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [postImgInput, setPostImgInput] = useState()
    const [imgPostFile, setImgPostFile] = useState()
    //endofimport

    //imported and modified from create post /used to update
    const handlePostImg = (e) => {
        e.preventDefault()
        setPostImgInput(e.target.value) //permet de récupérer postImgInput et la mettre en defaultValue de <img/>
        setImgPostFile(e.target.files[0])
    };


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("title", title ? title : post.title)
        formData.append("body", body ? body : post.body)
        formData.append("imagePost", imgPostFile)
        //post update to server
        axios.put("http://localhost:3001/api/posts/" + post._id, formData)
            .then(res => {
                console.log("updated : ", res.data)
                navigate("/post/" + post._id)
            })
            .catch(error => {
                console.log(error, "not yet but soon")
            })
    };

    useEffect(() => {
        getDataToEdit();
    }, [])

    return (
        <div className='global'>
            <Nav />

            <div className='maincontent'>
                <p>Ici vous pouvez modifier une publication</p>
                <form className='form-create-post' onSubmit={(e) => handleUpdateSubmit(e)} encType="multipart/form-data">
                    <label htmlFor='title'>
                        Titre de la publication :
                        <input type="text" name="title" defaultValue={post.title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label htmlFor='body'>
                        Dites nous tout :
                        <textarea name="body" defaultValue={post.body} onChange={(e) => setBody(e.target.value)} required></textarea>
                    </label>
                    <label htmlFor='image'>
                        Une image vaut mille mots
                        <input type="file" name="imagePost"
                            id="imagePost"
                            accept='image/png, image/jpeg, image/jpg, image/gif'
                            defaultValue={postImgInput}
                            onChange={handlePostImg} />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
                <button className='cancel' onClick={() => { navigate("/post/" + post._id) }}>Annuler</button>
            </div>
        </div >
    );
};

export default EditPost;