import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/home'
import Signin from './containers/signin'
import Signup from './containers/signup'
import NewEvent from './containers/new-event'
import Events from './containers/events'
import AppliedRoute from './components/applied-route'
import RouteError from './components/route-error'

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps}/>
    <AppliedRoute path='/signin' exact component={Signin} props={childProps}/>
    <AppliedRoute path='/signup' exact component={Signup} props={childProps}/>
    <AppliedRoute path='/events/new' exact component={NewEvent} props={childProps}/>
    <AppliedRoute path='/events/:id' exact component={Events} props={childProps}/>
    <Route component={RouteError}/>
  </Switch>
