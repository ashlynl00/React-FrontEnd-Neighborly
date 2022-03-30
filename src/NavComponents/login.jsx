import React from "react";
import './style.css';

const Login = () => {
    return (
        <>
            <form>
                Username: <input type="text" name="username"></input>
                Password: <input type="text" name="password"></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Login;