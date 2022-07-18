import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Nav = () => {

    const navigate = useNavigate()

    const handleDisconnect = () => {
        localStorage.clear("userConnected")
        console.log('Nav localStorage: ', localStorage)
        navigate("/login")
    }
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
                        onClick={handleDisconnect}
                    />
                </li>
            </ul>
        </div>
    );
};

export default Nav;