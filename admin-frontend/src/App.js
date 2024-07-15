import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Agents from "./pages/agents";
import PostsListing from "./pages/articles/PostingsView";
import Dashboard from "./pages/dashboard/index";
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import PostingsAdd from "./pages/articles/PostingsAdd";
import { ColorModeContext, useMode } from "./theme";

//Agent Components
import AllAgents from './pages/AllAgents';
import HiredAgents from './pages/HiredAgents';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Router>
                <Routes>
                  <Route path="/home" element={<Dashboard />} />
                  <Route path="/article" element={<PostsListing />} />
                  <Route path="/article/add" element={<PostingsAdd />} />
                  <Route path="/agents" element={<Agents />} />
                  <Route path="/hiredAgents" element={<HiredAgents />} />
                  <Route path="/allAgents" element={<AllAgents />} />
                  {/* <Route path="/Customers" element={<CustomersView />} /> */}
                  {/* <Route path="/Admins" element={<AdminsView />} /> */}
                  {/* <Route path="/Invoices" element={<InvoicesView />} /> */}
                </Routes>
              </Router>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
