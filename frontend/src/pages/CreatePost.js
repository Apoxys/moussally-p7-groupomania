import axios from 'axios';
import React from 'react';
import Nav from '../components/Nav';

const CreatePost = () => {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:3001/api/posts', {
    //         title: e.target.title.value,
    //         body: e.target.body.value,
    //         imageUrl: "",
    //         likes: 0,
    //         dislikes: 0,
    //         date: "",
    //         authorId: ""
    //     })
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // };

    return (
        <div className='main'>
            <Nav />
            Publiez ici
            <form /*onSubmit={(e) => handleSubmit(e)}*/>
                <label for='title'>
                    Titre de la publication :
                    <input type="text" name="title" placeholder='Le titre de votre publication' required />
                </label>
                <label for='body'>
                    Dites nous tout :
                    <textarea name="body" placeholder='Votre publication' required></textarea>
                </label>
                <label for='image'>
                    Une image vaut mille mots
                    <input type="file" name="image" />
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default CreatePost;