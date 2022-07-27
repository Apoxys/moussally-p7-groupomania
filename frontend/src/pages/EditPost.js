import React, { useState, useContext, useEffect } from 'react';
import { userTokenContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../components/Nav';

const EditPost = () => {

    //Define context and set-headers
    const { userToken, setUserToken } = useContext(userTokenContext)
    axios.defaults.headers.common['Authorization'] = userToken

    let URLparams = useParams()
    let navigate = useNavigate();

    const [post, setPost] = useState({})

    //import from createpost page / used to update
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [postImgInput, setPostImgInput] = useState()
    const [imgPostFile, setImgPostFile] = useState()
    //endofimport



    const getDataToEdit = () => {
        axios.get(`http://localhost:3001/api/posts/${URLparams.id}`)
            .then(res => {
                setPost(res.data)

            })
            .catch(error => {
                console.log(error)
            })
    };

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
        console.log(postImgInput)
    }, [])

    return (
        <div className='global'>
            <Nav />

            <div className='maincontent'>
                <h1>Ici vous pouvez modifier une publication</h1>
                <form className='form-create-post' onSubmit={(e) => handleUpdateSubmit(e)} encType="multipart/form-data">
                    <label htmlFor='title'>
                        Nouveau titre de la publication
                        <input type="text" name="title" defaultValue={post.title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label htmlFor='body'>
                        Nouveau contenu (ou correction)
                        <textarea name="body" defaultValue={post.body} onChange={(e) => setBody(e.target.value)} rows={5} required />
                    </label>
                    <label htmlFor='image'>
                        Vous voulez changer d'image ? ou en mettre une ?
                        <input type="file" name="imagePost"
                            id="imagePost"
                            accept='image/png, image/jpeg, image/jpg, image/gif'
                            defaultValue={post.imageUrl}
                            onChange={handlePostImg} />
                    </label>
                    <input className='form-button post' type="submit" value="Envoyer" />
                </form>
                <button className='cancel' onClick={() => { navigate("/post/" + post._id) }}>Annuler</button>
            </div>
        </div >
    );
};

export default EditPost;