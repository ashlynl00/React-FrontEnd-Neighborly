import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import CreateAccount from './createAccount';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import Login from './login';
import apiUrl from "../apiConfig";
import { parse } from 'ipaddr.js';

const UserContainer = (props) => {
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
            // add the new item to state
            setUsers([parsedResponse.data, ...users]);
            console.log(users);
        } else {
            //else:
            // show the error message in the form, don't change it back
            console.log('here');
            console.log(parsedResponse.data);
            setNewUserServerError(parsedResponse.data);
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
            console.log(parsedResponse.data);
            setCurrentUser({
                ...currentUser,
                username: parsedResponse.data.username,
                password: parsedResponse.data.password
            });
            localStorage.setItem('currentUser', JSON.stringify(parsedResponse.data));
            console.log(localStorage.getItem('currentUser'));
            console.log(currentUser);
        } else {
            console.log(parsedResponse.data);
        };
    };
    useEffect(getUsers, []);
    return (
        <div>
            <Login users={users} checkAccounts={checkAccounts} joinNeighborhood={props.joinNeighborhood} ></Login>
            { showing ?
                <CreateAccount createNewUser={createNewUser} newUserServerError={newUserServerError}></CreateAccount>
                :
                <button onClick={toggleShowing}>Create New Account</button>
            }
            
        </div>
    );
};

export default UserContainer;