import React from "react";
import { useState } from "react";
import EditItemComponent from "./EditItemComponent/EditItemComponent";

const SingleItemComponent = (props) => {
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    // // we want the form to start as filled out
    // const [updateNeighborhood, setUpdateNeighborhood] = useState({
    //     name: props.neighborhood.name,
    //     location: props.neighborhood.location,
    //     _id: props.neighborhood._id
    // });
    // // create a new function to listen for change, which is determined by an event, and get the value of the change
    // const handleInputChange = (e) => {
    //     //// e.target will target the element that you are targeting the event on
    //     // update state
    //     setUpdateNeighborhood ({
    //         // we still want to keep all of the new items becuase of the preset properties
    //         ...updateNeighborhood,
    //         // use e.target.name to get the name of the element
    //         [e.target.name]: e.target.value
    //     });
    //     console.log(updateNeighborhood);
    // };
    // const submitUpdateNeighborhood = (e) => {
    //     // want to stop the page from refreshing when submit button is pressed
    //     e.preventDefault();
    //     props.updateNeighborhood(props.neighborhood._id, updateNeighborhood);
    //     setShowing(false); 
    // }
    return (
        <div>
            <h1>{props.neighborhood.name}</h1>
            <img src={props.neighborhood.img} className="neighborhood-img"></img>
            <div className="buttons">
                <button>View More</button>
                <button onClick={ ()=> {
                    props.deleteNeighborhood(props.neighborhood._id);
                }}>Delete this Neighborhood</button>
            </div>
            {showing ?
                // <div id="edit-neighborhood-form">
                //     {/* close button for form */}
                //     <button onClick={toggleShowing}>Close</button>
                //     {/* we want to prevent the page from loading once we hit the submit button because we want to be able to take in that info which reloading would make it disappear */}
                //     {/* we also want to call new item from parent */}
                //     <form onSubmit={submitUpdateNeighborhood}>
                //         {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                //         Neighborhood Name: <input type="text" name="name" onChange={handleInputChange} value={updateNeighborhood.name}></input>
                //         Location: <input type="text" name="location" onChange={handleInputChange} value={updateNeighborhood.location}></input>
                //         Image: <input type="text" name="img" onChange={handleInputChange} value={updateNeighborhood.img}></input>
                //         <br></br>
                //         <button type="submit">Submit</button>
                //     </form>
                // </div>
                <div id="edit-neighborhood-form">
                    {/* close button for form */}
                    <button onClick={toggleShowing}>Close</button>
                    <EditItemComponent neighborhood={props.neighborhood} updateNeighborhood={props.updateNeighborhood} setShowing={setShowing}></EditItemComponent>
                </div>
                :
                // else, show the button to create one that also has an event listener attached
                <button onClick={toggleShowing}>Edit this item</button>
            }
        </div>
    );
};

export default SingleItemComponent;