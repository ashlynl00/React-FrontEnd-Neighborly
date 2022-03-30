import React from "react";
import './style.css';
import logo from '../icons8-marker-n-50.png';
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
          <img src={logo} id="logo"></img>
          <ul>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <Link to='/about'>
              <li>About</li>
            </Link>
            <Link to='/users'>
              <li>Create Account</li>
            </Link>
          </ul>
        </nav>
    );
};

export default Nav;