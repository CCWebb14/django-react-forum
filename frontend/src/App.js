import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home'

import { GlobalStyle } from './GlobalStyle';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    <GlobalStyle />
  </Router>
)

export default App;
