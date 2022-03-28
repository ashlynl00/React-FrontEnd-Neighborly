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
        </div>
    );
};

export default SingleItemComponent;