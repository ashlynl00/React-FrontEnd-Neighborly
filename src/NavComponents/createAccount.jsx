import React from "react";
import './style.css';
import { useState } from "react";

const Login = (props) => {
    const [isValidState, setIsValidState] = useState ({valid: true, message: ""});
    const [newUser, setNewUser] = useState ({
        username: "",
        password: ""
    });
    const handleInputChange = (e) => {
        setNewUser ({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };
    const submitNewUser = (e)=>{
        e.preventDefault();
        let validSubmission = true;
        // check if input is valid
        if (newUser.username.length < 3) {
            setIsValidState({
                valid: false,
                message: "Username needs to be longer"
            });
            validSubmission = false;
        };
        if (validSubmission) {
            // call new item function and pass in the newItem state as the parameter
            props.createNewUser(newUser);
            // when we hit submit, we also want to reset values of input fields and set default value to equal these
            setNewUser({
                username: "",
                password: ""
            });
            setIsValidState({
                valid: true,
                message: ""
            });
        }; 
    };
    return (
        <>
            <h1>Create an Account: </h1>
            <form onSubmit={submitNewUser}>
                Username: <input type="text" name="username" onChange={handleInputChange} value={newUser.username}></input>
                Password: <input type="text" name="password" onChange={handleInputChange} value={newUser.password}></input>
                {/* Add a Neighborhood: <input type="text" name="neighborhood" onChange={handleInputChange} value={newUser.neighborhood}></input> */}
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Login;