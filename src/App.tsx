import React  from 'react';
import { Route , Routes , BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';

// import components
import Dashboard from './components/routes/dashboard';
import Todos from './components/routes/todos';
import Wheater from './components/routes/wheater';
import Profile from './components/routes/profile';
import { CssBaseline, ThemeProvider , createTheme } from '@mui/material';

function App() {

  const queryClient = new QueryClient()


  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });
 

  return (
    <QueryClientProvider client={queryClient} >
      <ThemeProvider theme={theme}  >
      <CssBaseline />
      <div className="App font-['Vazirmatn']" dir={localStorage.getItem('i18nextLng') === 'fa' ? 'rtl' : 'ltr'}>
        <Router>
          <Routes>
            <Route path='/' Component={Dashboard} />
            <Route path='/todos' Component={Todos} />
            <Route path='/wheater' Component={Wheater} />
            <Route path='/profile' Component={Profile} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
