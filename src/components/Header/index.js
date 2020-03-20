import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="component-header">
      <div className="menu">
        <Link to="/" className="menu-item">Explorar</Link>
        <a className="menu-item" href="https://forms.gle/rFxbCHLjAwBRRTxX9" target="_blank">Contribuir</a>
      </div>

      <div className="title-container">
        <h1>À Mesa com o Covid</h1>
      </div>
    </div>
  )
}

export default Header
