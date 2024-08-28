import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReactGA from 'react-ga4';

const measurementId = 'G-21PSSKRKH5'; // Replace with your GA Measurement ID

// Initialize Google Analytics
ReactGA.initialize(measurementId);
ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
