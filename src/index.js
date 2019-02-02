import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import { BrowserRouter as Router } from "react-router-dom";
import MainAppRouter from './Components/MainAppRouter';


ReactDOM.render(

<Router>
  <MainAppRouter />
</Router>

,
document.getElementById('root'));