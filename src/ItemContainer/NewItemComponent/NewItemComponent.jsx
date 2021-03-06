import React from "react";
import { useState, useEffect } from 'react';

const NewItemComponent = (props) => {
    const [isValidState, setIsValidState] = useState ({valid: true, message: ""});
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    const [newNeighborhood, setNewNeighborhood] = useState ({
        name: "",
        location: "",
        img: "https://i.imgur.com/wG8tIvl.jpg"
    });
    const handleInputChange = (e) => {
        setNewNeighborhood ({
            ...newNeighborhood,
            [e.target.name]: e.target.value
        });
    };
    const submitNewItem = (e)=>{
        e.preventDefault();
        let validSubmission = true;
        // check if input is valid
        if (newNeighborhood.name.length < 3) {
            setIsValidState({
                valid: false,
                message: "Name needs to be longer"
            });
            validSubmission = false;
        };
        if (validSubmission) {
            // call new item function and pass in the newItem state as the parameter
            props.createNewNeighborhood(newNeighborhood);
            // when we hit submit, we also want to reset values of input fields and set default value to equal these
            setNewNeighborhood({
                name: "",
                location: "",
                img: ""
            });
            setIsValidState({
                valid: true,
                message: ""
            });
            setShowing(false);
        } 
    };
    return (
        <>
            { showing ?
                <div id="new-item-form">
                    {/* close button for form */}
                    <button onClick={toggleShowing}>Close</button>
                    {/* we want to prevent the page from loading once we hit the submit button because we want to be able to take in that info which reloading would make it disappear */}
                    {/* we also want to call new item from parent */}
                    <form onSubmit={submitNewItem}>
                        {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                        {console.log(isValidState)}
                        {props.newItemServerError ? <p className='form-error'>{props.newItemServerError}</p> : null}
                        Neighborhood Name: <input type="text" name="name" onChange={handleInputChange} value={newNeighborhood.name}></input>
                        Location: <input type="text" name="location" onChange={handleInputChange} value={newNeighborhood.location}></input>
                        Image: <input type="text" name="img" onChange={handleInputChange} value={newNeighborhood.img}></input>
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                :
                <button onClick={toggleShowing}>Create New Neighborhood</button>
            }
            
        </>
    );
};

export default NewItemComponent;