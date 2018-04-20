import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/home'
import Signin from './components/signin'
import RouteError from './components/route-error'

export default () =>
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/signin" exact component={Signin}/>
    <Route component={RouteError}/>
  </Switch>
