import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';

const unauthenticatedPages = [
  '/', '/signup'
];

const authenticatedPages = [
  '/dashboard'
];

/**
 * Check if an user is logged, 
 * and then redirect him to /dashboard page
 */
const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};

/**
 * Check if an user is not logged, 
 * and then redirect him to root page
 */
const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

/**
 * Call method according to logged status
 * to choose how to redirect the user
 * @param boolean isAuthenticated 
 */
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/dashboard');
  }else if(!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Router path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Router path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Router path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Router path="*" component={NotFound}/>
  </Router>
);
