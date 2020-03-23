import React from 'react'

const Footer = () => {
  return (
    <div className="component-footer">
      <div className="info-container">
        <p className="label">Ideia</p>
        <a href="https://twitter.com/jarr5" target="_blank" rel="noopener noreferrer" className="value">Jaime</a>
      </div>

      <div className="info-container">
        <p className="label">Desenho</p>
        <a href="/" target="_blank" rel="noopener noreferrer" className="value">Ana</a>
      </div>

      <div className="info-container">
        <p className="label">Código</p>
        <a href="https://twitter.com/jpahorta" target="_blank" rel="noopener noreferrer" className="value">João</a>
      </div>
    </div>
  )
}

export default Footer
