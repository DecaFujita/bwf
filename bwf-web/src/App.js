import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import Header from './components/layout/header';
import Main from './components/layout/main';
import Sidebar from './components/layout/sidebar';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './hooks/useAuth';
import { NotificationContainer } from 'react-notifications';
 

function App() {

  const user = JSON.parse(localStorage.getItem('bwf-user'));

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <div className="App">
          <BrowserRouter>
            <Header />
            <div className='general-content'>
              <Sidebar />
              <Main />
            </div>
          </BrowserRouter>
        </div>
        <NotificationContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
