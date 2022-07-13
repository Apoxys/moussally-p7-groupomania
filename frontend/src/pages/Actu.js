import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';


const Actu = () => {
    // const [connected, setConnected] = useState(false);

    // let navigate = useNavigate();

    // useEffect(() => {
    //     if (connected === false) {
    //         navigate("/login") // go to login/signup if not connected
    //     }
    //     if (connected === true) {
    //         navigate("/") //go to app if connected
    //     }

    // }, []);
    const [data, setData] = useState([]);

    const getData = () => {
        axios.get('http://localhost:3001/api/posts')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    };


    useEffect(() => {
        getData();
    }, []);


    return (

        <div className='main'>
            <Nav />
            <main>
                <h2>Retrouvez l'actualité des publications</h2>
                <div className='postsection'>
                    {
                        data.map((post) =>
                            <Card key={post._id} post={post} />)
                    }

                </div>
            </main>
        </div>

    );
};

export default Actu;