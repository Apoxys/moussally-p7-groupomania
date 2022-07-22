import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { userContext, userTokenContext, userAdminContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const SpecificCard = ({ post }) => {

    const navigate = useNavigate();

    //contextimport
    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { isAdmin, setIsAdmin } = useContext(userAdminContext)

    axios.defaults.headers.common['Authorization'] = userToken

    const [isEditing, setIsEditing] = useState(false)
    const [canModify, setCanModify] = useState(false)

    //Check if users have rights to modify current post
    const checkUserRights = () => {
        console.log(isAdmin, currentUser, post.authorId)
        if (isAdmin || currentUser === post.authorId) {
            setCanModify(true)
        } else {
            setCanModify(false)
        }
        console.log('check: ', canModify, isAdmin)
    }
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

    // import from Card component / used to update
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
    //endofimport

    //update logic
    //create new date
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const today = Date.now();
        const formData = new FormData()
        formData.append("title", title)
        formData.append("body", body)
        formData.append("imagePost", imgPostFile)
        formData.append("date", today)
        //post update to server
        axios.put("http://localhost:3001/api/posts/" + post._id, formData)
            .then(res => {
                console.log("updated : ", res.data)
                setIsEditing(false)
            })
            .catch(error => {
                console.log(error, "not yet but soon")
            })
    };

    //delete logic
    const deletePostHandler = (e) => {
        window.alert("vous êtes sur de vouloir supprimer ce post ?")
        axios.delete("http://localhost:3001/api/posts/" + post._id)
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(error => {
                console.log("delete error : ", error)
            })
    };


    //likes logic
    const handleLike = (e) => {
        axios.post("http://localhost:3001/api/posts/" + post._id, { "like": 1 })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log("likes error", error)
            })

    }

    useEffect(() => {
        //     if (canModify == false) {
        checkUserRights();
        //     }
        //     console.log('useEffect rights: ', canModify);
    }, [canModify, checkUserRights])

    return (
        <main className='specific-card'>
            {
                isEditing ?
                    <div>
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
                        <button onClick={() => setIsEditing(false)}>Annuler</button>
                    </div>
                    :
                    <article className='specific-card-article'>

                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <img src={post.imageUrl} alt='' />
                    </article>
            }


            <aside className='specific-card-aside'>
                <span onClick={(e) => handleLike(e)}>number of likes : {" " + post.likes}</span>
                <br />
                <span>number of dislikes : {" " + post.dislikes}</span>
                <br />
                Posté le {dateFormater(post.date)}
            </aside>
            {
                canModify ?
                    isEditing ?
                        <p>You are editing</p>
                        :
                        < div >
                            <button onClick={() => setIsEditing(true)}>Modify post</button>
                            <button onClick={(e) => deletePostHandler(e)}>Delete post</button>
                        </div >
                    :
                    ""
            }

        </main >
    );
};

export default SpecificCard;