import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const handleLogout = e =>{
        e.preventDefault()
        auth.logout()
        history.push('/')
    }


    return(
        <nav>
            <div className="nav-wrapper grey darken-3">
                <span className="brand-logo">Links Reduction</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={handleLogout}>Log out</a></li>
                </ul>
            </div>
        </nav>
    )
}