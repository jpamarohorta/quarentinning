import React from 'react'
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation();

  const classes = `component-header ${location.pathname === '/' ? 'transparent' : ''}`

  return (
    <div className={classes}>
      <Link to="/" className="link">Explorar</Link>
      <Link to="/top" className="link">Top Chefs</Link>
      <a className="link" href="https://forms.gle/rFxbCHLjAwBRRTxX9" target="_blank" rel="noopener noreferrer">
        Contribuir
      </a>
    </div>
  )
}

export default Header
