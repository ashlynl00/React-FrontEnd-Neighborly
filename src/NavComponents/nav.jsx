import React from "react";
import './style.css';
import '../NavComponents/nav.scss'
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
            <Link to='/' className="hover-shadow hover-color">
              <li><span>H</span><span>O</span><span>M</span><span>E</span></li>
            </Link>
            <Link to='/about' className="hover-shadow hover-color">
              <li><span>A</span><span>B</span><span>O</span><span>U</span><span>T</span></li>
            </Link>
            {localStorage.getItem('currentUser') == null ?
              <Link to='/users' className="hover-shadow hover-color">
                <li><span>L</span><span>O</span><span>G</span><span>I</span><span>N</span></li>
              </Link>
              :
              <>
                <Link to='/profile' className="hover-shadow hover-color">
                  <li><span>P</span><span>R</span><span>O</span><span>F</span><span>I</span><span>L</span><span>E</span></li>
                </Link>
                <li onClick={logout} className="hover-shadow hover-color"><span>L</span><span>O</span><span>G</span><span>O</span><span>U</span><span>T</span></li>
              </>
            }
          </ul>
        </nav>
    );
};

export default Nav;