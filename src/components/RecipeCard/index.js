import React from 'react'

const RecipeCard = ({ recipe }) => {
  return (

    <div className="component-recipe-card">
      <div className="image" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>

      <div className="info-container">
        <h4>{recipe.name}</h4>

        <div className="time-and-difficulty">
          <p>{recipe.time}</p>

          <p>{recipe.difficulty}</p>
        </div>
      </div>

      <div className="backdrop"></div>
    </div>
  )
}

export default RecipeCard
