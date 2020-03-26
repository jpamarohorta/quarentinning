import React from 'react'

import { logJaimeClicked, logAnaClicked, logJoaoClicked } from 'utils/analytics'

const Footer = () => {
  const handleJaimeClick = () => {
    logJaimeClicked()
  }

  const handleAnaClick = () => {
    logAnaClicked()
  }

  const handleJoaoClick = () => {
    logJoaoClicked()
  }

  return (
    <div className="component-footer">
      <div className="info-container">
        <p className="label">Ideia</p>
        <a
          href="https://twitter.com/jarr5"
          target="_blank"
          rel="noopener noreferrer"
          className="value"
          onClick={handleJaimeClick}>Jaime</a>
      </div>

      <div className="info-container">
        <p className="label">Desenho</p>
        <a href="/" target="_blank" rel="noopener noreferrer" className="value" onClick={handleAnaClick}>Ana</a>
      </div>

      <div className="info-container">
        <p className="label">Código</p>
        <a
          href="https://twitter.com/jpahorta"
          target="_blank"
          rel="noopener noreferrer"
          className="value"
          onClick={handleJoaoClick}>João</a>
      </div>
    </div>
  )
}

export default Footer
