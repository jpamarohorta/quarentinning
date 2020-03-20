import React from 'react'

const RecipeDetail = ({ recipe }) => {
  return (
    <div className="component-recipe-detail">
      <div className="image" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>

      <div className="info-container">
        <h1>{recipe.name}</h1>

        <div className="ingredients-container">
          <h4>Ingredientes</h4>
          { recipe.ingredients.split('\n').map((p) => (
            <p>{p}</p>
          ))}
        </div>

        <div className="steps-container">
          <h4>Passos</h4>
          { recipe.steps.split('\n').map((p) => (
            <p>{p}</p>
          ))}
        </div>

        <div className="time-container">
          <h4>Tempo aproximado de confeção</h4>
          <p>{recipe.time} min</p>
        </div>

        <div className="difficulty-container">
          <h4>Dificuldade</h4>
          <p>{recipe.difficulty}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
