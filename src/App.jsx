import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import ReactGA from 'react-ga4';

function App() {

  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize('G-21PSSKRKH5'); // Replace with your Google Analytics Measurement ID

    // Track the initial page load
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  }, []);

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
