import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

import Home from 'pages/Home'
import Detail from 'pages/Detail'
import Top from 'pages/Top'
import Chef from 'pages/Chef'

import Header from 'components/Header'
import Footer from 'components/Footer'

import './styles/main.scss'

const firebaseConfig = {
  apiKey: 'AIzaSyD1aFNmurYnlebw07V3PRQ_kJiKv25nBPE',
  authDomain: 'quarentinning.firebaseapp.com',
  databaseURL: 'https://quarentinning.firebaseio.com',
  projectId: 'quarentinning',
  storageBucket: 'quarentinning.appspot.com',
  messagingSenderId: '869286519127',
  appId: '1:869286519127:web:c3687b76e2ac09ec891e12',
  measurementId: 'G-HN4J0MXZD5'
}

const App = () => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
  }, [])

  return (
     <Router>
      <div className="app-container">
        <Header />
        <AppAnimated />
        <Footer />
      </div>
    </Router>
  );
}

const AppAnimated = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <TransitionGroup>
      <CSSTransition key={pathname} classNames="fade" timeout={300}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/recipes/:slug">
            <Detail />
          </Route>

          <Route path="/top">
            <Top />
          </Route>

          <Route path="/chefs/:slug">
            <Chef />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App;
