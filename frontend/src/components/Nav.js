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
                <NavLink to="/"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Actualité</li>
                </NavLink>
                <NavLink to="/publish"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Publier un nouveau post</li>
                </NavLink>
                <NavLink to="/myposts"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Vos publications</li>
                </NavLink>
                <NavLink to="/favorites"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
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