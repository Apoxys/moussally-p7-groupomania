import React from 'react';
import { NavLink } from 'react-router-dom';
import { IsConnected } from './AppContext';

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
                <li>
                    <input type="submit" value="Disconnect"
                    // onClick={IsConnected = false} 
                    />
                </li>
            </ul>
        </div>
    );
};

export default Nav;