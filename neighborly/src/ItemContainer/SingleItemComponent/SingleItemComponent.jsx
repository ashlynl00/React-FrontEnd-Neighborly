import React from "react";

const SingleItemComponent = (props) => {
    return (
        <div>
            <h1>{props.neighborhood.name}</h1>
        </div>
    );
};

export default SingleItemComponent;