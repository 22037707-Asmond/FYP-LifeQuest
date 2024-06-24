import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import PostingsAdd from './pages/PostingsAdd';
import PostsListing from './pages/PostingsView';
// import MainDash from './Components/MainDash/MainDash';
// import RightSide from './Components/RigtSide/RightSide';
// import Sidebar from './Components/Sidebar';

function App() {
  return (
    // <div className="App">
    //   <PostingsAdd/>
    //   {/* <div className="AppGlass">
    //     <Sidebar/>
    //     <MainDash/>
    //     <RightSide/>
    //   </div> */}
    // </div>
    <Router>
    <Routes>
      <Route path="/article" element={<PostsListing/>} />
      <Route path="/article/add" element={<PostingsAdd />} />
    </Routes>
  </Router>
  );
}

export default App;
