import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom';
import apiUrl from "../apiConfig";

const Profile = (props) => {
    const navigate = useNavigate();
    const [showing, setShowing] = useState([]);
    //let showing = [];
    // const toggleShowing = () => {
    //     setShowing(!showing);
    // }
    //const [currentNeighborhoodId, setCurrentNeighborhoodId] = useState();
    //let currentNeighborhoodId = [];
    //get local storage
    const userInfo = localStorage.getItem('currentUser');
    console.log(userInfo);
    console.log(JSON.parse(localStorage.getItem('currentUser')).username);
    const userName = JSON.parse(localStorage.getItem('currentUser')).username;
    const userNeighborhoods = JSON.parse(localStorage.getItem('currentUser')).neighborhood;
    const logout = () => {
        localStorage.removeItem('currentUser');
        console.log(localStorage.getItem('currentUser'));
        navigate('/users');
    };
    let currentNeighborhoodClicked;
    // fetch items from server and display them
    // const getNeighborhoods = async () => {
    //     try {
    //         const neighborhoods = await fetch(`${apiUrl}/neighborhoods`);
    //         const parsedNeighborhoods = await neighborhoods.json();
    //         props.setNeighborhoods(parsedNeighborhoods.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    //useEffect(getNeighborhoods, []);
    const [updateNeighborhoodEvents, setUpdateNeighborhoodEvents] = useState({
        name: "",
        description: "",
        when: ""
    });
    // create a new function to listen for change, which is determined by an event, and get the value of the change
    const handleInputChange = async (e) => {
        //// e.target will target the element that you are targeting the event on
        // update state
        setUpdateNeighborhoodEvents ({
            // we still want to keep all of the new items becuase of the preset properties
            ...updateNeighborhoodEvents,
            // use e.target.name to get the name of the element
            [e.target.name]: e.target.value
        });
        console.log(updateNeighborhoodEvents);
    };
    const submitUpdateNeighborhoodEvents = (e) => {
        // want to stop the page from refreshing when submit button is pressed
        e.preventDefault();
        console.log('this is the current neighborhood id');
        console.log(showing[0])
        updateNeighborhoodEvent(showing[0], updateNeighborhoodEvents);
        setUpdateNeighborhoodEvents({
            name: "",
            description: "",
            when: ""
        });
        setShowing([]);
        navigate('/view');
        //window.location.reload();
        navigate('/profile');
        //setShowing(false); 
    }
    const updateNeighborhoodEvent = async (idToUpdate, neighborhoodToUpdate) => {
        const apiResponse = await fetch(`${apiUrl}/neighborhoods/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify({events: neighborhoodToUpdate}),
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
            console.log(parsedResponse.data);
        }
        
    }
    
    console.log(props.neighborhoods)
    return (
        <>
            <h1>Hello {userName}!</h1>
            { JSON.parse(localStorage.getItem('currentUser')).neighborhood.length == 0 ?
                <>
                    <h3>You have not joined any neighborly groups yet!</h3>
                    <Link to='/view'>
                        <button>Join a Neighborhood</button>
                    </Link>
                </>
                :
                <>
                    <h3>Neighborly Groups Joined: </h3>
                    {props.neighborhoods.map((neighborhood)=> {
                        console.log(neighborhood)
                        console.log(userNeighborhoods);
                        //console.log(neighborhood.events.length);
                        return (
                            userNeighborhoods.map((userNeighborhood)=> {
                                if (neighborhood._id == userNeighborhood) {
                                    return(
                                        <div class="item">
                                            <h2>{neighborhood.name}, {neighborhood.location}</h2>
                                            <img src={neighborhood.img} id="joined-img"></img>
                                            <button onClick={()=>{
                                                console.log('clicked')
                                                if (showing.length == 0) {
                                                    console.log('in here')
                                                    setShowing([neighborhood._id])
                                                }
                                                }}>Add an event</button>
                                            {neighborhood.events.length == 0 ?
                                                <>
                                                    {console.log('inside this')}
                                                </>
                                                :
                                                <>
                                                    <h4>Current Events: </h4>
                                                    <ul id="event-list">
                                                        {neighborhood.events.map((event)=>{
                                                            return (
                                                                <li id="events"><span id="event-name">{event.name}</span>: {event.description}. <br></br> When: {event.when}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </>
                                            }
                                            {showing[0] == neighborhood._id ?
                                                <>
                                                    <p style={{display: 'none'}}>{showing[0] = neighborhood._id}</p>
                                                    <form onSubmit={submitUpdateNeighborhoodEvents}>
                                                        Event Name: <input type="text" name="name" onChange={handleInputChange} value={updateNeighborhoodEvents.name}></input>
                                                        Description: <input type="text" name="description" onChange={handleInputChange} value={updateNeighborhoodEvents.description}></input>
                                                        When: <input type="text" name="when" onChange={handleInputChange} value={updateNeighborhoodEvents.when}></input>
                                                        <br></br>
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                </>
                                                :
                                                ""
                                            }
                                        </div>
                                    )
                                }
                            })
                        )
                    })}
                    <Link to='/view'>
                        <button>Join a Neighborhood</button>
                    </Link>
                </>
            }
            <button onClick={logout}>Logout</button>
        </>
    );
};

export default Profile;