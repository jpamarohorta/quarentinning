import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import RecipeCard from 'components/RecipeCard'

const Home = () => {
  const dispatch = useDispatch()

  const recipes = useSelector(recipesSelectors.getRecipes)

  useEffect(() => {
    if (!recipes) {
      dispatch(recipesActions.fetchRecipes())
    }
  }, [recipes, dispatch])

  return (
    <div className="page-home">
      { recipes ?
        <div className="content">
          <div className="recipes-list">
            { recipes.map((recipe, index) => (
              <Link to={`recipes/${recipe.slug}`} key={index}>
                <RecipeCard recipe={recipe} key={index} />
              </Link>
            ))}
          </div>
        </div>
        :
        <div className="loading">
          <div className="sk-bounce">
            <div className="sk-bounce-dot"></div>
            <div className="sk-bounce-dot"></div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home
