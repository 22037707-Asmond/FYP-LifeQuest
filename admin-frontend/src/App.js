
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AdminsAdd from "./pages/admins/AdminsAdd";
import AdminsListing from "./pages/admins/AdminsView";
import AgentsAdd from "./pages/agents/AgentsAdd";
import AgentsListing from "./pages/agents/AgentsView";
import AllAgents from './pages/AllAgents';
import PostingsAdd from "./pages/articles/PostingsAdd";
import PostsListing from "./pages/articles/PostingsView";
import Bar from "./pages/Charts/BarChart";
import Line from "./pages/Charts/LineChart";
import Pie from "./pages/Charts/PieChart";
import Dashboard from "./pages/dashboard/index";
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import HiredAgents from './pages/HiredAgents';
import { ColorModeContext, useMode } from "./theme";
import RequestsListing from "./pages/requests/ClaimsView";

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
              <Route path="/article" element={<PostsListing/>} />
              <Route path="/article/add" element={<PostingsAdd />} />
              //Agent Routes
              <Route path="/agents" element={<AllAgents />} />
              <Route path="/hiredAgents" element={<HiredAgents />} />
              <Route path="/Home" element={<Dashboard />} />
              <Route path="/article" element={<PostsListing />} />
              <Route path="/add_articles" element={<PostingsAdd/>} />
              <Route path="/agent" element={<AgentsListing />} />
              <Route path="/add_agents" element={<AgentsAdd/>} />
              <Route path="/admin" element={<AdminsListing />} />
              <Route path="/add_admins" element={<AdminsAdd/>} />
              <Route path="/agents" element={<AllAgents />} />
              <Route path="/hiredAgents" element={<HiredAgents />} />
              <Route path="/bar" element={<Bar/>} />
              <Route path="/pie" element={<Pie/>} />
              <Route path="/LineChart" element={<Line/>} />
              <Route path="/requests" element={<RequestsListing />} />
              {/* <Route path="/Customers" element={<CustomersView />} /> */}
              {/* <Route path="/Admins" element={<AdminsView />} /> */}
              {/* <Route path="/Invoices" element={<InvoicesView />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    //   <Router>
    //   <Routes>
    //     <Route path="/" element={<SignIn />} />  {/*To Be routed to the proper SignIn*/}
    //     <Route path="/dashboard" element={<AdminPage />} />
    //     <Route path="/article" element={<PostsListing />} />
    //     <Route path="/article/add" element={<PostingsAdd />} />
    //     {/* <Route path='/Agents' element={<AgentPage/>}/>
    //     <Route path='/Customers' element={<CustomerPage/>}/> */}

    //   </Routes>
    // </Router>
  );
}

export default App;
