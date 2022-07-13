import axios from 'axios';
import React from 'react';
import { ConnectedUserId } from '../components/AppContext';
import Nav from '../components/Nav';

const CreatePost = () => {
    const handlePostSubmit = (e) => {
        e.preventDefault();
        const today = Date.now;
        axios.post('http://localhost:3001/api/posts', {
            title: e.target.title.value,
            body: e.target.body.value,
            imageUrl: e.target.image.file,
            likes: 0,
            dislikes: 0,
            date: today,
            authorId: ConnectedUserId
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className='main'>
            <Nav />
            Publiez ici
            <form className='form-create-post' onSubmit={(e) => handlePostSubmit(e)}>
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
                    <input type="file" name="image" />
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default CreatePost;