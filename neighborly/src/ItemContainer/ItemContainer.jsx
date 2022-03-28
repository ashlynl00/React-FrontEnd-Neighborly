import React from 'react';
import { useState } from 'react';
import SingleItemComponent from './SingleItemComponent/SingleItemComponent';

const ItemContainer = () => {
    const [neighborhoods, setNeighborhoods] = useState([{"name": "newNeighborhood", "location": "Vancouver"}]);
    return (
        <div>
            <h3>Here are neighborhoods: </h3>
            {neighborhoods.map( (neighborhood, index) => {
                return (
                    <SingleItemComponent key={index} neighborhood={neighborhood}></SingleItemComponent>
                )
            })}
        </div>
    );
};

export default ItemContainer;