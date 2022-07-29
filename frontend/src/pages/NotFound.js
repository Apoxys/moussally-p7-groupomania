import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>Oups !</h1>
            <p>Il semblerait qu'il n'y ai rien ici, en tout cas pour le moment.
                On vous raccompagne à la page d'accueil.</p>
            <br />
            <NavLink to='/'>
                <button>
                    Retour à l'accueil
                </button>
            </NavLink>
        </div >
    );
};

export default NotFound;