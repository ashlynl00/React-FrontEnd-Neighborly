import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import CreateAccount from './createAccount';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import Login from './login';

const UserContainer = () => {
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
        const apiResponse = await fetch('https://pacific-inlet-98825.herokuapp.com/users', {
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
            const apiResponse = await fetch(`https://pacific-inlet-98825.herokuapp.com/users/${userId}`, {
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
            const users = await fetch("https://pacific-inlet-98825.herokuapp.com/users");
            const parsedUsers = await users.json();
            setUsers(parsedUsers.data);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async (idToUpdate, userToUpdate) => {
        const apiResponse = await fetch(`https://pacific-inlet-98825.herokuapp.com/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(userToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        if (parsedResponse.status == 200) {
            const newUsers = [];
            for (let i=0; i<users.length; i++) {
                if (users[i]._id == idToUpdate) {
                    newUsers.push(userToUpdate);
                } else {
                    newUsers.push(users[i]);
                }
            }
            setUsers(newUsers);
        } else {
            setRequestError(parsedResponse.data);
        }
    }
    const checkAccounts = async (userLogin) => {
        const apiResponse = await fetch('https://pacific-inlet-98825.herokuapp.com/users/login');
        const parsedResponse = await apiResponse.json();
        if (parsedResponse.status == 200) {
            setCurrentUser(userLogin);
            console.log(currentUser);
        } else {
            console.log(parsedResponse.data);
        };
    };
    useEffect(getUsers, []);
    return (
        <div>
            <Login users={users} checkAccounts={checkAccounts}></Login>
            <CreateAccount createNewUser={createNewUser} newUserServerError={newUserServerError}></CreateAccount>
        </div>
    );
};

export default UserContainer;