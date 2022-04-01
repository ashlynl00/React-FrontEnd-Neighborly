import React from "react";
import './style.css';
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

const Login = (props) => {
    const navigate = useNavigate();
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
    const submitUserInfo = async (e)=>{
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
            await props.checkAccounts(userLogin)
                // when we hit submit, we also want to reset values of input fields and set default value to equal these
                setUserLogin({
                    username: "",
                    password: ""
                });
                setIsValidState({
                    valid: true,
                    message: ""
                });
                navigate('/profile');
                //props.joinNeighborhood('624686e7a5a81532df154b34','62424700236c84c48eac723f')
        }; 
        // navigate to the profile page which will eventually show the neighborhood they are apart of 
    };
    return (
        <>
            <h1>Login: </h1>
            <form onSubmit={submitUserInfo}>
                Username: <input type="text" name="username" onChange={handleInputChange} value={userLogin.username}></input>
                Password: <input type="text" name="password" onChange={handleInputChange} value={userLogin.password}></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Login;