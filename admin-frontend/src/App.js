// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import SignIn from './Components/SignIn'; /*To Be routed to the proper SignIn*/
// import AdminPage from './pages/AdminPage';
// import PostingsAdd from './pages/PostingsAdd';
// import PostsListing from './pages/PostingsView';
import { CssBaseline, ThemeProvider } from "@mui/material";
import AgentsListing from "./pages/agents/AgentsView";
import AdminsListing from "./pages/admins/AdminsView";
import PostsListing from "./pages/articles/PostingsView";
import Dashboard from "./pages/dashboard/index";
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
// import ArticlesView from "./pages/Articles/PostingsView";
import { Route, Routes } from "react-router-dom";
import PostingsAdd from "./pages/articles/PostingsAdd";
import AgentsAdd from "./pages/agents/AgentsAdd";
import AdminsAdd from "./pages/admins/AdminsAdd";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar/>
            {/* Adjust here in routes to see the different pages */}
            <Routes>
              <Route path="/Home" element={<Dashboard />} />
              <Route path="/article" element={<PostsListing />} />
              <Route path="/add_articles" element={<PostingsAdd/>} />
              <Route path="/agent" element={<AgentsListing />} />
              <Route path="/add_agents" element={<AgentsAdd/>} />
              <Route path="/admin" element={<AdminsListing />} />
              <Route path="/add_admins" element={<AdminsAdd/>} />
              {/* <Route path="/Customers" element={<CustomersView />} /> */}
              {/* <Route path="/Invoices" element={<InvoicesView />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    //   <Router>
    //   <Routes>
    //     <Route path="/" element={<SignIn/>}/>  {/*To Be routed to the proper SignIn*/}
    //     <Route path="/dashboard" element={<AdminPage />}/>
    //     <Route path="/article" element={<PostsListing/>}/>
    //     <Route path="/article/add" element={<PostingsAdd />}/>
    //     {/* <Route path='/Agents' element={<AgentPage/>}/>
    //     <Route path='/Customers' element={<CustomerPage/>}/> */}

    //   </Routes>
    // </Router>
  );
}

export default App;
