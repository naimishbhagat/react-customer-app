import React from 'react';
import './App.css';
import NavBar from './components/navbar/navbar';
import AllRoutes from './utils/allRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <AllRoutes />
    </React.Fragment>
  );
}

export default App;
