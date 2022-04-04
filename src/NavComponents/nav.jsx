import React from "react";
import './style.css';
import logo from '../icons8-marker-n-50.png';
import {Link, useNavigate} from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('currentUser');
    console.log(localStorage.getItem('currentUser'));
    navigate('/users');
  };
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
            {localStorage.getItem('currentUser') == null ?
              <Link to='/users'>
                <li>Login</li>
              </Link>
              :
              <>
                <Link to='/profile'>
                  <li>Profile</li>
                </Link>
                <li onClick={logout} >Logout</li>
              </>
            }
          </ul>
        </nav>
    );
};

export default Nav;