import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './index';
import Detail from './detail';
import Register from './register';
import Order from './order';
import Address from './address';
import { App, Login, Logout, Dashboard, RequireAuth } from './app';

    

const Routers = () => (
  <Router>
    <div>
      <Route exact path="/" component={Index}/>
      <Route path="/detail/:productId" component={Detail}/>

      <Route path="/register" component={Register} />
      <Route path="/order" component={Order} />
      <Route path="/address" component={Address} />

      <Route path="/app" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={Dashboard} onEnter={RequireAuth} />
    </div>
  </Router>
)

export default Routers