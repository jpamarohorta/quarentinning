import React from 'react'

const RecipeDetail = ({ recipe }) => {
  return (
    <div className="component-recipe-detail">
      <h1>{recipe.name}</h1>

      <div className="time-container">
        <p className="label">Tempo</p>
        <p className="value">{recipe.time} min</p>
      </div>

      <div className="difficulty-container">
        <p className="label">Dificuldade</p>
        <p className="value">{recipe.difficulty}</p>
      </div>

      <div className="ingredients-container">
        <h4>Ingredientes</h4>
        { recipe.ingredients.split('\n').map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>

      <div className="steps-container">
        <h4>Passos</h4>
        { recipe.steps.split('\n').map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
    </div>
  )
}

export default RecipeDetail
