import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'

ReactDOM.render(
  
  <React.StrictMode>
    <Router>
      <Navbar />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
