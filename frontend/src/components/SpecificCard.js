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

    //delete logic
    const deletePostHandler = () => {
        window.alert("vous êtes sur de vouloir supprimer ce post ?")
        console.log(post._id)
        axios.delete("http://localhost:3001/api/posts/delete/" + post._id)
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
        axios.post("http://localhost:3001/api/posts/" + post._id,
            {
                "userId": currentUser,
                "like": 1
            })
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
        console.log(post)
        //     }
        //     console.log('useEffect rights: ', canModify);
    }, [canModify, checkUserRights])

    return (
        <main className='specific-card'>
            <article className='specific-card-article'>

                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={post.imageUrl} alt='' />
            </article>

            <aside className='specific-card-aside'>
                <span onClick={(e) => handleLike(e)}>number of likes : {" " + post.likes}</span>
                <br />
                <span>number of dislikes : {" " + post.dislikes}</span>
                <br />
                Posté le {dateFormater(post.date)}
            </aside>
            <div>
                {
                    canModify ?
                        < div >
                            <button onClick={() => { navigate("/edit-post/" + post._id) }}>Modify post</button>
                            <button onClick={() => deletePostHandler()}>Delete post</button>
                        </div >
                        :
                        ""
                }
            </div>
        </main >
    );
};

export default SpecificCard;