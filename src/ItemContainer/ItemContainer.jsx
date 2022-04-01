import React from 'react';
import { useState, useEffect } from 'react';
import SingleItemComponent from './SingleItemComponent/SingleItemComponent';
import NewItemComponent from './NewItemComponent/NewItemComponent';
import './style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import apiUrl from "../apiConfig";

const ItemContainer = (props) => {
    //const [neighborhoods, setNeighborhoods] = useState([]);
    const [joinNeighborhoods, setJoinNeighborhoods] = useState();
    const [requestError, setRequestError] = useState("");
    const [newItemServerError, setNewItemServerError] = useState("");
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    }
    // create new item function
    const createNewNeighborhood = async (newNeighborhood) => {
        console.log(newNeighborhood);
        console.log('let us create this');
        // send a request to the backend
        const apiResponse = await fetch(`${apiUrl}/neighborhoods`, {
            method: "POST",
            body: JSON.stringify(newNeighborhood),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // parse the response
        const parsedResponse = await apiResponse.json();
        // if response is success: 
        if (parsedResponse.status == 200) {
            // add the new item to state
            props.setNeighborhoods([parsedResponse.data, ...props.neighborhoods]);
        } else {
            //else:
            // show the error message in the form, don't change it back
            console.log('here');
            console.log(parsedResponse.data);
            setNewItemServerError(parsedResponse.data);
        }
    };
    // create delete function
    const deleteNeighborhood = async (neighborhoodId) => {
        console.log('deleting item id');
        try {
            const apiResponse = await fetch(`${apiUrl}/neighborhoods/${neighborhoodId}`, {
                method: "DELETE"
            });
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            // was it successful in deleting?
            if (parsedResponse.status == 200) {
                // we want to return an array of new items without the deleted item
                const newNeighborhoods = [];
                // loop through each item and if it matches the id of the selected item, then don't add it to the array
                for (let i=0; i<props.neighborhoods.length; i++) {
                    if (props.neighborhoods[i]._id !== neighborhoodId) {
                        newNeighborhoods.push(props.neighborhoods[i]);
                    }
                }
                // set the items equal to this new items array
                props.setNeighborhoods(newNeighborhoods);
            } else {

            }
        } catch (err) {
            console.log(err);
        };
    }
    // fetch items from server and display them
    const getNeighborhoods = async () => {
        try {
            const neighborhoods = await fetch(`${apiUrl}/neighborhoods`);
            const parsedNeighborhoods = await neighborhoods.json();
            props.setNeighborhoods(parsedNeighborhoods.data);
        } catch (err) {
            console.log(err);
        }
    };
    const updateNeighborhood = async (idToUpdate, neighborhoodToUpdate) => {
        const apiResponse = await fetch(`${apiUrl}/neighborhoods/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(neighborhoodToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        if (parsedResponse.status == 200) {
            const newNeighborhoods = [];
            for (let i=0; i<props.neighborhoods.length; i++) {
                if (props.neighborhoods[i]._id == idToUpdate) {
                    newNeighborhoods.push(neighborhoodToUpdate);
                } else {
                    newNeighborhoods.push(props.neighborhoods[i]);
                }
            }
            props.setNeighborhoods(newNeighborhoods);
        } else {
            setRequestError(parsedResponse.data);
        }
        
    }
    // const joinNeighborhood = async (userId, neighborhoodToJoin) => {
    //     console.log("user id", userId);
    //     console.log("neighborhood id", neighborhoodToJoin)
    //     try{
    //         const apiResponse = await fetch(`${apiUrl}/users/${userId}`, {
    //             method: "PUT",
    //             body: JSON.stringify(neighborhoodToJoin),
    //             headers: {
    //                 "accept": "application/json"
    //             }
    //         })
    //         const parsedResponse = await apiResponse.json();
    //         console.log(parsedResponse);
    //         if (parsedResponse.status == 200) {
    //             // how to add neighborhood to user neighborhood property?
    //             console.log('hello');
    //         } else {
    //             console.log(parsedResponse.data);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    useEffect(getNeighborhoods, []);
    return (
        <div>
            {props.neighborhoods.map( (neighborhood) => {
                console.log(neighborhood._id);
                return (
                    <SingleItemComponent key={neighborhood._id} joinNeighborhood={props.joinNeighborhood} neighborhood={neighborhood} deleteNeighborhood={deleteNeighborhood} updateNeighborhood={updateNeighborhood}></SingleItemComponent>
                )
            })}
            <br></br>
            <NewItemComponent createNewNeighborhood={createNewNeighborhood} newItemServerError={newItemServerError}></NewItemComponent>
        </div>
    );
};

export default ItemContainer;