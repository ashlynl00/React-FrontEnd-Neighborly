//import logo from './logo.svg';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import Nav from './NavComponents/nav';
import About from './NavComponents/about';
import Login from './NavComponents/login';
import CreateAccount from './NavComponents/createAccount';
import Users from './NavComponents/Users';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewItemComponent from './ItemContainer/NewItemComponent/NewItemComponent';
import {Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App" alt="Logo">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/view" element={<ItemContainer />}></Route>
          <Route path="/users" element={<Users />}></Route>
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
