import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import FoodItemList from './FoodItemList';
import Signup from './Signup';
import Login from './Login';
import BMICalculator from './BMICalculator';
import ReportPage from './ReportPage';
import AmdrCal from './AmdrCal';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/FoodItemList" element={<FoodItemList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/AmdrCal" element={<AmdrCal />} />
      </Routes>
    </Router>
  );
};

export default App;
