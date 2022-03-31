import React from "react";
import './style.css';
import { useState } from "react";

const Login = (props) => {
    const [isValidState, setIsValidState] = useState ({valid: true, message: ""});
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    });
    const handleInputChange = (e) => {
        setUserLogin ({
            ...userLogin,
            [e.target.name]: e.target.value
        });
    };
    const submitUserInfo = (e)=>{
        e.preventDefault();
        let validSubmission = true;
        // check if input is valid
        if (userLogin.username.length < 3) {
            setIsValidState({
                valid: false,
                message: "Name needs to be longer"
            });
            validSubmission = false;
        };
        if (validSubmission) {
            // call new item function and pass in the newItem state as the parameter
            props.checkAccounts(userLogin);
            // when we hit submit, we also want to reset values of input fields and set default value to equal these
            setUserLogin({
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
            <form onSubmit={submitUserInfo}>
                Username: <input type="text" name="username" onChange={handleInputChange} value={userLogin.username}></input>
                Password: <input type="text" name="password" onChange={handleInputChange} value={userLogin.password}></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Login;