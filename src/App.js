import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from 'pages/Home'
import Detail from 'pages/Detail'

import Header from 'components/Header'

import './styles/main.scss'

const App = () => {
  return (
     <Router>
      <div className="app-container">
        <Header />

        <div className="main-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/recipes/:slug">
              <Detail />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
