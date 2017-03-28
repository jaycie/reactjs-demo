import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './index';
import Detail from './detail';

const Routers = () => (
  <Router>
    <div>
      <Route exact path="/" component={Index}/>
      <Route path="/detail/:productId" component={Detail}/>
    </div>
  </Router>
)

export default Routers