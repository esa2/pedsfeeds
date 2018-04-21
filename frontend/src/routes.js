import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/home'
import Signin from './components/signin'
import AppliedRoute from './components/applied-route'
import RouteError from './components/route-error'

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps}/>
    <AppliedRoute path="/signin" exact component={Signin} props={childProps}/>
    <Route component={RouteError}/>
  </Switch>
