//import logo from './logo.svg';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import Nav from './NavComponents/nav';
import About from './NavComponents/about';
import CreateAccount from './NavComponents/createAccount';
import Profile from './NavComponents/profile';
import Users from './NavComponents/Users';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewItemComponent from './ItemContainer/NewItemComponent/NewItemComponent';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import apiUrl from "./apiConfig";

function App() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [updateUser, setUpdateUser] = useState({});
  // if there is a user logged in then:
  // if (JSON.parse(localStorage.getItem('currentUser')) !== null) {
  //   setUpdateUser({
  //     username: JSON.parse(localStorage.getItem('currentUser')).username,
  //     password: JSON.parse(localStorage.getItem('currentUser')).password,
  //     neighborhoods: [JSON.parse(localStorage.getItem('currentUser')).neighborhood]
  //   });
  // } else {
  //   console.log('you must log in');
  // }
  
  const joinNeighborhood = async (userId, neighborhoodToJoin) => {
    console.log("user id", userId);
    console.log("neighborhood id", neighborhoodToJoin)
    try{
        const apiResponse = await fetch(`${apiUrl}/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify({neighborhood: neighborhoodToJoin, userId: userId}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        console.log(parsedResponse);
        if (parsedResponse.status == 200) {
            // how to add neighborhood to user neighborhood property?
            console.log('below is now user');
            console.log(parsedResponse.data);
            // now remove the current user from local storage
            localStorage.removeItem('currentUser');
            // and reset the local storage user with the updated version using parsed data
            localStorage.setItem('currentUser', JSON.stringify(parsedResponse.data));
            console.log('below is now local storage user updated version');
            console.log(localStorage.getItem('currentUser'));
        } else {
            console.log(parsedResponse.data);
        }
    } catch (err) {
        console.log(err);
    }
};
const unJoinNeighborhood = async (userId, neighborhoodIdToRemove) => {
  try {
    const apiResponse = await fetch(`${apiUrl}/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({neighborhoodIdToRemove: neighborhoodIdToRemove}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const parsedResponse = await apiResponse.json();
    console.log(parsedResponse);
    if (parsedResponse.status == 200) {
      console.log('below is now user');
      console.log(parsedResponse.data);
      // now remove the current user from local storage
      localStorage.removeItem('currentUser');
      // and reset the local storage user with the updated version using parsed data
      localStorage.setItem('currentUser', JSON.stringify(parsedResponse.data));
      console.log('below is now local storage user updated version');
      console.log(localStorage.getItem('currentUser'));
    } else {
      console.log(parsedResponse.data)
    }
  } catch (err) {
    console.log(err);
  }
}
  return (
    <Router>
      <div className="App" alt="Logo">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/view" element={<ItemContainer neighborhoods={neighborhoods} setNeighborhoods={setNeighborhoods} joinNeighborhood={joinNeighborhood} unJoinNeighborhood={unJoinNeighborhood} updateUser={updateUser} setUpdateUser={setUpdateUser} />}></Route>
          <Route path="/users" element={<Users joinNeighborhood={joinNeighborhood} />}></Route>
          <Route path="/profile" element={<Profile neighborhoods={neighborhoods} setNeighborhoods={setNeighborhoods} />}></Route>
          {/* <Route path="/create" element={<NewItemComponent createNewNeighborhood={createNewNeighborhood} newItemServerError={newItemServerError} />}></Route> */}
        </Routes>
      </div>
    </Router>
  );
};
const Home = () => {
  return (
    <main>
          <h1>Welcome to Neighborly!</h1>
          <h2>Find your neighborhood community!</h2>
          <div className='buttons'>
            <Link to='/view'>
              <button>View Neighborhoods</button>
            </Link>
          </div>
          {/* <ItemContainer></ItemContainer> */}
    </main>
  );
};

export default App;
