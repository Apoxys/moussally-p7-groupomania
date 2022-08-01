import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import planetLogo from '../assets/GroupoLogos/red-planet-logo.png';

const Nav = () => {

    const { currentUser } = useContext(userContext)
    const [collapsed, setCollapsed] = useState(true)

    const navigate = useNavigate()

    const handleDisconnect = () => {
        localStorage.clear("userConnected")
        console.log('Nav localStorage disconnected: ', localStorage)
        navigate("/login")
    }

    //collapse or open menu
    const handleCollapse = () => {
        if (collapsed === true) {
            setCollapsed(false)
        } else {
            setCollapsed(true)
        }
    }

    return (
        <div className="navigation">
            <button onClick={(e) => handleCollapse(e)}>
                <img className='icon' src={planetLogo} alt='' />
                {collapsed === true ? "Menu" : "Close Menu"}
            </button>
            <ul className={collapsed === true ? "collapsed" : "open"} >
                <NavLink to="/"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Actualité</li>
                </NavLink>
                <NavLink to="/publish"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Publier un nouveau post</li>
                </NavLink>
                <NavLink to={"/myposts/" + currentUser}
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Vos publications</li>
                </NavLink>
                {/* <NavLink to={"/favorites/" + currentUser}
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Publications favorites</li>
                </NavLink> */}
                {/* <NavLink>
                    <li>Contacts utiles</li>
                </NavLink> */}
                <li>
                    <input className='disconnect' type="submit" value="Déconnexion"
                        onClick={handleDisconnect}
                    />
                </li>
            </ul>
        </div>
    );
};

export default Nav;