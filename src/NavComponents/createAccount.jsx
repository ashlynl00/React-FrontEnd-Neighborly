import React from "react";
import './style.css';

const Login = () => {
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
                name: "",
                location: "",
                img: ""
            });
            setIsValidState({
                valid: true,
                message: ""
            });
        }; 
    };
    return (
        <>
            <form onSubmit={submitNewUser}>
                Username: <input type="text" name="username"></input>
                Password: <input type="text" name="password"></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Login;