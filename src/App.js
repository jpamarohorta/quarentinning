import React from 'react'

import Home from 'pages/Home'

import Header from 'components/Header'

import './styles/main.scss'

const App = () => {
  return (
    <div className="app-container">
      <Header />

      <div className="main-container">
        <Home />
      </div>
    </div>
  );
}

export default App;
