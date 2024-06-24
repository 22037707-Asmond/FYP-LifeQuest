import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListAgentsComponents from './components/ListAgentsComponents';
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
            <Route path="/edit-agent/:id" element={<AddAgentsComponents />} />  
          </Routes>
        </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
