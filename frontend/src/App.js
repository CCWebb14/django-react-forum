import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home'
import Login from "./components/Login";
import Header from "./components/Header";

import { GlobalStyle } from './GlobalStyle';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    <GlobalStyle />
  </Router>
)

export default App;
