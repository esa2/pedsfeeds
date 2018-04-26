import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/home'
import Signin from './containers/signin'
import Signup from './containers/signup'
import NewEvent from './containers/new-event'
import Events from './containers/events'
import About from './containers/about'
import Resources from './containers/family-resources'
import Providers from './containers/provider-resources'
import Education from './containers/education'
import Faq from './containers/faq'
import Join from './containers/join'
import Jobs from './containers/jobs'
import AppliedRoute from './components/applied-route'
import RouteError from './components/route-error'

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps}/>
    <AppliedRoute path='/signin' exact component={Signin} props={childProps}/>
    <AppliedRoute path='/signup' exact component={Signup} props={childProps}/>
    <AppliedRoute path='/events/new' exact component={NewEvent} props={childProps}/>
    <AppliedRoute path='/events/:id' exact component={Events} props={childProps}/>
    <Route path='/about' exact component={About}/>
    <Route path='/resources' exact component={Resources}/>
    <Route path='/providers' exact component={Providers}/>
    <Route path='/education' exact component={Education}/>
    <Route path='/join' exact component={Join}/>
    <Route path='/jobs' exact component={Jobs}/>
    <Route path='/faq' exact component={Faq}/>
    <Route component={RouteError}/>
  </Switch>
