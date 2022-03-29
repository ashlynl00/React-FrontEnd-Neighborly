//import logo from './logo.svg';
import './App.css';
import ItemContainer from './ItemContainer/ItemContainer';
import logo from '../src/icons8-marker-n-50.png';

function App() {
  return (
    <div className="App" alt="Logo">
      <nav>
        <img src={logo}></img>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <main>
        <h1>Welcome to Neighborly!</h1>
        <h2>Find your neighborhood community!</h2>
        <ItemContainer></ItemContainer>
      </main>
    </div>
  );
}

export default App;
