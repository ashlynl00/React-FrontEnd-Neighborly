import React from 'react';
import { useState, useEffect } from 'react';
import SingleItemComponent from './SingleItemComponent/SingleItemComponent';
import NewItemComponent from './NewItemComponent/NewItemComponent';

const ItemContainer = () => {
    const [neighborhoods, setNeighborhoods] = useState([]);
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
        const apiResponse = await fetch('http://localhost:3001/neighborhoods', {
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
            setNeighborhoods([parsedResponse.data, ...neighborhoods]);
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
            const apiResponse = await fetch(`http://localhost:3001/neighborhoods/${neighborhoodId}`, {
                method: "DELETE"
            });
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            // was it successful in deleting?
            if (parsedResponse.status == 200) {
                // we want to return an array of new items without the deleted item
                const newNeighborhoods = [];
                // loop through each item and if it matches the id of the selected item, then don't add it to the array
                for (let i=0; i<neighborhoods.length; i++) {
                    if (neighborhoods[i]._id !== neighborhoodId) {
                        newNeighborhoods.push(neighborhoods[i]);
                    }
                }
                // set the items equal to this new items array
                setNeighborhoods(newNeighborhoods);
            } else {

            }
        } catch (err) {
            console.log(err);
        };
    }
    // fetch items from server and display them
    const getNeighborhoods = async () => {
        try {
            const neighborhoods = await fetch("http://localhost:3001/neighborhoods");
            const parsedNeighborhoods = await neighborhoods.json();
            setNeighborhoods(parsedNeighborhoods.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(getNeighborhoods, []);
    return (
        <div>
            { showing ?
                neighborhoods.map( (neighborhood) => {
                    console.log(neighborhood._id);
                    return (
                        <SingleItemComponent key={neighborhood._id} neighborhood={neighborhood} deleteNeighborhood={deleteNeighborhood}></SingleItemComponent>
                    )
                })
                :
                <button onClick={toggleShowing}>View Neighborhoods</button>
            }
            <NewItemComponent createNewNeighborhood={createNewNeighborhood} newItemServerError={newItemServerError}></NewItemComponent>
        </div>
    );
};

export default ItemContainer;