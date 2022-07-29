import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';
import { userAdminContext, userContext, userTokenContext } from '../context/UserContext';


const Actu = () => {

    //context and headers
    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { isAdmin, setIsAdmin } = useContext(userAdminContext)

    axios.defaults.headers.common['Authorization'] = userToken

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const getData = () => {
        if (!currentUser) {  // reset userId and auth token if user resfreshes based on localStorage
            setCurrentUser(localStorage.userConnected)
            setUserToken(localStorage.userToken)
            setIsAdmin(localStorage.isAdmin)
            // console.log("1", typeof (isAdmin), isAdmin)

        }

        axios.get('http://localhost:3001/api/posts')
            .then(res => {
                setData(res.data)
                console.log("data is : ", res.data)

            })
            .catch(error => {
                console.log(error)
            })
    };



    useEffect(() => {
        if (!localStorage.userConnected) {
            navigate("/login") // go to login/signup if not connected
        }
        getData();


    }, [currentUser]);

    return (

        <div className='global'>
            < Nav />
            <main>

                {
                    isAdmin === 'true' ?
                        <h1>Bienvenue, administrateur</h1>
                        :
                        <h1>Bienvenue, utilisateur</h1>
                }

                <h2>Retrouvez l'actualité des publications</h2>
                <div className='postsection'>
                    {
                        data.map((post) =>
                            <Link
                                key={"link_key" + post._id}
                                to={"/post/" + post._id}
                            >
                                <Card
                                    key={"card_key" + post._id}
                                    post={post}
                                />
                            </Link>
                        )
                    }
                </div>
            </main>
        </div >

    );
};

export default Actu;