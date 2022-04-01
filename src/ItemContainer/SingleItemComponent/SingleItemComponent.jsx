import React from "react";
import { useState } from "react";
import EditItemComponent from "./EditItemComponent/EditItemComponent";
import apiUrl from "../../apiConfig";

const SingleItemComponent = (props) => {
    //const [joinNeighborhoods, setJoinNeighborhoods] = useState();
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    // const joinNeighborhood = async (userId, neighborhoodToJoin) => {
    //     try{
    //         const apiResponse = await fetch(`${apiUrl}/users/${userId}`, {
    //             method: "PUT",
    //             body: JSON.stringify(neighborhoodToJoin),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //     const parsedResponse = await apiResponse.json();
    //     console.log(parsedResponse);
    //     if (parsedResponse.status == 200) {
    //         // how to add neighborhood to user neighborhood property?
    //         console.log('hello');
    //     } else {
    //         console.log(parsedResponse.data);
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
    // };
    
    return (
        <div>
            <h1>{props.neighborhood.name}</h1>
            <img src={props.neighborhood.img} className="neighborhood-img"></img>
            <div className="buttons">
                <button>View More</button>
                <button onClick={(e)=>{
                    //e.preventDefault();
                    const userId = JSON.parse(localStorage.getItem('currentUser'))._id
                    console.log(userId);
                    console.log('below is neighborhood id')
                    console.log(props.neighborhood._id);
                    props.joinNeighborhood(userId, props.neighborhood._id);
                }}>Join</button>
                <button onClick={ ()=> {
                    props.deleteNeighborhood(props.neighborhood._id);
                }}>Delete this Neighborhood</button>
            </div>
            {showing ?
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