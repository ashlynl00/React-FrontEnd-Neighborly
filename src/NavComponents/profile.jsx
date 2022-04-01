import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom';
import apiUrl from "../apiConfig";

const Profile = (props) => {
    const navigate = useNavigate();
    //get local storage
    const userInfo = localStorage.getItem('currentUser');
    console.log(userInfo);
    console.log(JSON.parse(localStorage.getItem('currentUser')).username);
    const userName = JSON.parse(localStorage.getItem('currentUser')).username;
    const userNeighborhoods = JSON.parse(localStorage.getItem('currentUser')).neighborhood;
    const logout = () => {
        localStorage.removeItem('currentUser');
        console.log(localStorage.getItem('currentUser'));
        navigate('/users');
    };
    // fetch items from server and display them
    // const getNeighborhoods = async () => {
    //     try {
    //         const neighborhoods = await fetch(`${apiUrl}/neighborhoods`);
    //         const parsedNeighborhoods = await neighborhoods.json();
    //         props.setNeighborhoods(parsedNeighborhoods.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    //useEffect(getNeighborhoods, []);
    console.log(props.neighborhoods)
    return (
        <>
            <h1>Hello {userName}</h1>
            { JSON.parse(localStorage.getItem('currentUser')).neighborhood.length == 0 ?
                <Link to='/view'>
                    <button>Join a Neighborhood</button>
                </Link>
                :
                props.neighborhoods.map((neighborhood)=> {
                    console.log(neighborhood)
                    console.log(userNeighborhoods);
                    return (
                        userNeighborhoods.map((userNeighborhood)=> {
                            if (neighborhood._id == userNeighborhood) {
                                return(
                                    <>
                                        <img src={neighborhood.img}></img>
                                        <p>{neighborhood.name}</p>
                                    </>
                                )
                            }
                        })
                    )
                })
            }
            <button onClick={logout}>Logout</button>
        </>
    );
};

export default Profile;