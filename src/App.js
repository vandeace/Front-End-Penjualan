import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home'
import Stock from './pages/stocks'
import Transaction from './pages/transaction'
import Order from './pages/order';

import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home}/>
        <Route path='/stock' exact component={Stock} />
        <Route path='/transaction' exact component={Transaction} />
        <Route path='/order' exact component={Order} />
      </Router>
    </div>
  );
}

export default App;
