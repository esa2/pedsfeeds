import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/home'
import Signin from './containers/signin'
import Signup from './containers/signup'
import Profile from './containers/profile'
import Manage from './containers/manage'
import CalendarNew from './containers/calendar-new'
import Calendar from './containers/calendar'
import About from './containers/about'
import Consent from './containers/consent'
import Directory from './containers/directory'
import Resources from './containers/family-resources'
import Providers from './containers/provider-resources'
import Library from './containers/library'
import Education from './containers/education'
import Join from './containers/join'
import Jobs from './containers/jobs'
import Faq from './containers/faq'
import Tos from './containers/tos'
import Contact from './containers/contact'
import AppliedRoute from './components/applied-route'
import RouteError from './components/route-error'

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/signin" exact component={Signin} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute
      path="/profile"
      exact
      component={Profile}
      props={childProps}
    />
    <AppliedRoute
      path="/calendar/new"
      exact
      component={CalendarNew}
      props={childProps}
    />
    <AppliedRoute
      path="/calendar/:id"
      exact
      component={Calendar}
      props={childProps}
    />
    <Route path="/manage" exact component={Manage} />
    <Route path="/directory" exact component={Directory} />
    <Route path="/about" exact component={About} />
    <Route path="/resources" exact component={Resources} />
    <Route path="/consent" exact component={Consent} />
    <Route path="/providers" exact component={Providers} />
    <Route path="/library" exact component={Library} />
    <Route path="/education" exact component={Education} />
    <Route path="/join" exact component={Join} />
    <Route path="/jobs" exact component={Jobs} />
    <Route path="/faq" exact component={Faq} />
    <Route path="/tos" exact component={Tos} />
    <Route path="/contact" exact component={Contact} />
    <Route component={RouteError} />
  </Switch>
)
