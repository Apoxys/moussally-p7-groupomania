import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navigation">
            <img className='icon' src='' alt='' />
            <ul>
                <NavLink to="/">
                    <li>Actualité</li>
                </NavLink>
                <NavLink to="/publish">
                    <li>Publier un nouveau post</li>
                </NavLink>
                <NavLink to="/myposts">
                    <li>Vos publications</li>
                </NavLink>
                <NavLink to="/favorites">
                    <li>Publications favorites</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Nav;