import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Home from 'pages/Home'
import Detail from 'pages/Detail'

import Header from 'components/Header'
import Footer from 'components/Footer'

import './styles/main.scss'

const App = () => {
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
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App;
