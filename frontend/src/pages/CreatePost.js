import React from 'react';
import Nav from '../components/Nav';

const CreatePost = () => {
    return (
        <div className='main'>
            <Nav />
            Publiez ici
            <form>
                <label for='title'>
                    Titre de la publication :
                    <input type="text" name="title" placeholder='Le titre de votre publication' />
                </label>
                <label for='body'>
                    Dites nous tout :
                    <textarea name="body" placeholder='Votre publication'></textarea>
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