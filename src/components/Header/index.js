import React from 'react'
import { Link, useLocation } from "react-router-dom"

import { logExploreClicked, logTopChefClicked, logContributeClicked } from 'utils/analytics'

const Header = () => {
  const location = useLocation();

  const classes = `component-header ${location.pathname === '/' ? 'transparent' : ''}`

  const handleExploreClick = () => {
    logExploreClicked()
  }

  const handleTopClick = () => {
    logTopChefClicked()
  }

  const handleContributeClick = () => {
    logContributeClicked()
  }

  return (
    <div className={classes}>
      <Link to="/" className="link" onClick={handleExploreClick}>Explorar</Link>
      <Link to="/top" className="link" onClick={handleTopClick}>Top Chefs</Link>
      <a
        className="link"
        href="https://forms.gle/rFxbCHLjAwBRRTxX9"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleContributeClick}>
        Contribuir
      </a>
    </div>
  )
}

export default Header
