import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import CreateAccount from './createAccount';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom';
import Login from './login';
import apiUrl from "../apiConfig";
import { parse } from 'ipaddr.js';

const UserContainer = (props) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [requestError, setRequestError] = useState("");
    const [newUserServerError, setNewUserServerError] = useState("");
    const [showing, setShowing] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: ""
    });
    const toggleShowing = () => {
        setShowing(!showing);
    }
    // create new item function
    const createNewUser = async (newUser) => {
        console.log(newUser);
        console.log('let us create this');
        // send a request to the backend
        const apiResponse = await fetch(`${apiUrl}/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // parse the response
        const parsedResponse = await apiResponse.json();
        // if response is success: 
        if (parsedResponse.status == 200) {
            if (parsedResponse.data == 'this username already exists') {
                console.log('username already exists, in if');
                alert('This username already exists! Please create a unique username.');
                navigate('/users');
            } else {
                console.log('username does not exist and in else')
                // add the new item to state
                setUsers([parsedResponse.data, ...users]);
                console.log(users);
            }
        } else {
            //else:
            // show the error message in the form, don't change it back
            console.log('in catch err');
            if (parsedResponse.data == 'duplicate usernames') {
                console.log('username already exists, in if');
                alert('This username already exists! Please create a unique username.');
                navigate('/users');
                setShowing(true);
            } else {
                console.log(parsedResponse.data);
                setNewUserServerError(parsedResponse.data);
            }
        }
    };
    // create delete function
    const deleteUser = async (userId) => {
        console.log('deleting user id');
        try {
            const apiResponse = await fetch(`${apiUrl}/users/${userId}`, {
                method: "DELETE"
            });
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            // was it successful in deleting?
            if (parsedResponse.status == 200) {
                // we want to return an array of new items without the deleted item
                const newUsers = [];
                // loop through each item and if it matches the id of the selected item, then don't add it to the array
                for (let i=0; i<users.length; i++) {
                    if (users[i]._id !== userId) {
                        newUsers.push(users[i]);
                    }
                }
                // set the items equal to this new items array
                setUsers(newUsers);
            } else {

            }
        } catch (err) {
            console.log(err);
        };
    }
    // fetch items from server and display them
    const getUsers = async () => {
        try {
            const users = await fetch(`${apiUrl}/users`);
            const parsedUsers = await users.json();
            setUsers(parsedUsers.data);
        } catch (err) {
            console.log(err);
        }
    };
    // const updateUser = async (idToUpdate, userToUpdate) => {
    //     const apiResponse = await fetch(`${apiUrl}/${idToUpdate}`, {
    //         method: "PUT",
    //         body: JSON.stringify(userToUpdate),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     const parsedResponse = await apiResponse.json();
    //     if (parsedResponse.status == 200) {
    //         const newUsers = [];
    //         for (let i=0; i<users.length; i++) {
    //             if (users[i]._id == idToUpdate) {
    //                 newUsers.push(userToUpdate);
    //             } else {
    //                 newUsers.push(users[i]);
    //             }
    //         }
    //         setUsers(newUsers);
    //     } else {
    //         setRequestError(parsedResponse.data);
    //     }
    // }
    // const joinNeighborhood = async (userId, neighborhoodToJoin) => {
    //     try{
    //         const apiResponse = await fetch(`${apiUrl}/users/${userId}`, {
    //             method: "PUT",
    //             body: JSON.stringify(neighborhoodToJoin),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         // const apiResponse = await fetch(`${apiUrl}/users/${userId}`, {
    //         //     method: "PUT",
    //         //     body: JSON.stringify(neighborhoodToJoin),
    //         //     headers: {
    //         //         "Content-Type": "application/json"
    //         //     }
    //         // });
    //         // const parsedResponse = await apiResponse.json();
    //         // console.log(parsedResponse);
    //         // if (parsedResponse.status == 200) {
    //         //     // how to add neighborhood to user neighborhood property?
    //         //     console.log('hello');
    //         // } else {
    //         //     console.log(parsedResponse.data);
    //         // }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    const checkAccounts = async (userLogin) => {
        const apiResponse = await fetch(`${apiUrl}/users/login`, {
            method: "POST",
            body: JSON.stringify(userLogin),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const parsedResponse = await apiResponse.json();
        if (parsedResponse.status == 200) {
            if (parsedResponse.data == 'not a possible user') {
                console.log('in if not a possible user');
                alert('Sorry, the username login info you provided is not correct. If you would like to create an account, please click the Create New Account button below.');
                navigate('/users');
            } else if (parsedResponse.data == 'did not match') {
                console.log('in else if that password data from api did not match');
                alert('Sorry, but the password you provided is not correct, please retry or create a new account.');
                navigate('/users');
            } else {
                console.log('in else that is a possible user');
                setCurrentUser({
                    ...currentUser,
                    username: parsedResponse.data.username,
                    password: parsedResponse.data.password
                });
                localStorage.setItem('currentUser', JSON.stringify(parsedResponse.data));
                console.log(localStorage.getItem('currentUser'));
                console.log(currentUser);
                navigate('/view');
                navigate('/profile');
            }
        } else {
            console.log(parsedResponse.data);
        };
    };
    useEffect(getUsers, []);
    return (
        <div>
            { showing ?
                <div className="background">
                    <div className="login-wrapper">
                        <CreateAccount createNewUser={createNewUser} newUserServerError={newUserServerError} toggleShowing={toggleShowing} ></CreateAccount>
                        <button onClick={toggleShowing}>Back</button>
                    </div>
                </div>
                 :
                <div className="background">
                    <div className="login-wrapper">
                        <Login users={users} checkAccounts={checkAccounts} joinNeighborhood={props.joinNeighborhood} ></Login>
                        <button onClick={toggleShowing} id="create-new-user-btn">Create New Account</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserContainer;