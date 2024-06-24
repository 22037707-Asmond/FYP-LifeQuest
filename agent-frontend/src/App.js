<<<<<<< HEAD
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListAgentsComponents from './components/ListAgentsComponents';
import AddAgentsComponent from './components/AddAgentsComponents';
import AddAgentsComponents from './components/AddAgentsComponents';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className="container"> 
          <Routes> 
            <Route exact path="/" element={<ListAgentsComponents />} />
            <Route path="/agents" element={<ListAgentsComponents />} />
            <Route path="/add-agent" element={<AddAgentsComponents />} />
          </Routes>
        </div>
        <FooterComponent/>
      </Router>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> refs/remotes/origin/main
    </div>
  );
}

export default App;
