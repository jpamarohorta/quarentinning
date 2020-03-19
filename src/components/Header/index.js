import React from 'react'

const Header = () => {
  return (
    <div className="component-header">
      <div className="menu">
        <a className="menu-item" href="/">Explorar</a>
        <a className="menu-item" href="/contribuir">Contribuir</a>
      </div>

      <div className="title-container">
        <h1>Quarentinning</h1>
      </div>
    </div>
  )
}

export default Header
