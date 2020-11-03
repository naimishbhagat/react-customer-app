import React from 'react';
import './App.css';
import NavBar from './components/navbar/navbar';
import Router from './utils/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <Router />
    </React.Fragment>
  );
}

export default App;
