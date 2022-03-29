//import logo from './logo.svg';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import Nav from './NavComponents/nav';
import About from './NavComponents/about';
import Contact from './NavComponents/contact';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App" alt="Logo">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
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
          <ItemContainer></ItemContainer>
    </main>
  );
};

export default App;
