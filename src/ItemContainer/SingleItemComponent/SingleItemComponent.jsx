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
                <button onClick={()=>{
                    //e.preventDefault();
                    const userId = JSON.parse(localStorage.getItem('currentUser'))._id
                    console.log(userId);
                    console.log('below is neighborhood id')
                    console.log(props.neighborhood._id);
                    //props.joinNeighborhood(userId, props.neighborhood._id);
                    // set updateUser here to get the second parameter for the join function
                    // loop through all neighborhoods in user array and add new one by creating a whole new array
                    let userNeighborhoods = JSON.parse(localStorage.getItem('currentUser')).neighborhood.push(props.neighborhood._id)
                    console.log('below is now the new user with newly added neighborhood');
                    console.log(localStorage.getItem('currentUser'));
                    // const newJoined = [];
                    // for (let i=0; i<userNewNeighborhoods.length; i++) {
                    //     if (userNewNeighborhoods[i] == props.neighborhood._id) {
                    //         userNewNeighborhoods.push(props.neighborhood._id)
                    //     } else {
                    //         user
                    //     }
                    // }
                    props.setUpdateUser({
                        username: JSON.parse(localStorage.getItem('currentUser')).username,
                        password: JSON.parse(localStorage.getItem('currentUser')).password,
                        neighborhood: [userNeighborhoods]
                    })
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