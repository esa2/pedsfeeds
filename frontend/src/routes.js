import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/home'
import RouteError from './components/route-error'

export default () =>
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route component={RouteError}/>
  </Switch>
