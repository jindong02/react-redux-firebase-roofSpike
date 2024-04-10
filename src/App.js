import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import ResidentialScreen from './components/Residential';
import CommercialScreen from './components/Commercial';
import Leads from './components/leads';
import Property from './components/Property';
import store from './store/store'; // Ensure this path is correct
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}> {/* Wrap your Router with the Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/residential" element={<ResidentialScreen />} />
          <Route path="/commercial" element={<CommercialScreen />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/property-report/:propertyId" element={<Property />} />
          {/* Other routes */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
