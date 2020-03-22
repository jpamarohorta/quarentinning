import React from 'react'
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation();

  const classes = `component-header ${location.pathname === '/' ? 'transparent' : ''}`

  return (
    <div className={classes}>
      <Link to="/" className="link">Explorar</Link>
      <a className="link" href="https://forms.gle/rFxbCHLjAwBRRTxX9" target="_blank">Contribuir</a>
    </div>
  )
}

export default Header
