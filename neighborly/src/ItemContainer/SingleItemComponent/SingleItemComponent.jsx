import React from "react";
import { useState } from "react";

const SingleItemComponent = (props) => {
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing);
    };
    return (
        <div>
            <h1>{props.neighborhood.name}</h1>
            <button>View More</button>
            <button onClick={ ()=> {
                props.deleteNeighborhood(props.neighborhood._id);
            }}>Delete this Neighborhood</button>
            <button onClick={ ()=> {
                // don't forget to put in the parameter!
                props.deleteNeighborhood(props.neighborhood._id);
            }}>Delete</button>
        </div>
    );
};

export default SingleItemComponent;