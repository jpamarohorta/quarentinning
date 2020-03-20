import React from 'react'

const RecipeCard = ({ recipe }) => {
  return (

    <div className="uk-card uk-card-default uk-card-body component-recipe-card">
      <div className="image" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>

      <div className="info-container">
        <h4>{recipe.name}</h4>

        <div className="time-and-difficulty">
          <p>{recipe.time} min</p>

          <p>{recipe.difficulty}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard