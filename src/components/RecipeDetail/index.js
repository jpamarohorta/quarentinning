import React from 'react'

const RecipeDetail = ({ recipe }) => {
  return (
    <div className="component-recipe-detail">
      <img className="image" src={recipe['photo']} />

      <div className="info-container">
        <h4>{recipe['name']}</h4>

        <p>{recipe.ingredients}</p>

        <p>{recipe.steps}</p>

        <div className="time-and-difficulty">
          <p>{recipe['time']} min</p>

          <p>{recipe['difficulty']}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
