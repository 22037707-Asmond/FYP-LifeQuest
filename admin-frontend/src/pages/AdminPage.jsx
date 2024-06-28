import { CssBaseline, ThemeProvider } from '@mui/material';
import SideBar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import { ColorModeContext, useMode } from '../theme';
import Dashboard from './Dashboard';

const AdminPage = () => {
    const [theme, colorMode] = useMode();

    return (
        <>
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className='row'>
          <div className='col-1'>
            <SideBar />
          </div>
            <div className='col-11'>
              <Topbar />
              <main>
                <Dashboard/>
              </main>
            </div>
        </div>
        </ThemeProvider>
        </ColorModeContext.Provider>
        </>
    );
};

export default AdminPage;