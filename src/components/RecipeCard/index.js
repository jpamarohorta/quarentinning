import React from 'react'
import Truncate from 'react-truncate'

const RecipeCard = ({ recipe }) => {
  return (

    <div className="component-recipe-card">
      <div className="image" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>

      <div className="info-container">
        <h4>
          <Truncate lines={2} ellipsis={<span>...</span>}>
            {recipe.name}
          </Truncate>
        </h4>

        <div className="time-and-difficulty">
          <p>
            <Truncate lines={1} ellipsis={<span>...</span>}>
              {recipe.time}
            </Truncate>
          </p>

          <p>{recipe.difficulty}</p>
        </div>
      </div>

      <div className="backdrop"></div>
    </div>
  )
}

export default RecipeCard
