import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import RecipeDetail from 'components/RecipeDetail'

const Detail = () => {
  const [recipe, setRecipe] = useState(null)

  const { slug } = useParams()

  const dispatch = useDispatch()

  const recipes = useSelector(recipesSelectors.getRecipes)

  useEffect(() => {
    if (!recipes) {
      dispatch(recipesActions.fetchRecipes())
    }
  }, [recipes, dispatch])

  useEffect(() => {
    if (recipes) {
      setRecipe(recipes.find((r) => r.slug === slug))
    }
  }, [recipes, slug])

  return (
    <div className="page-detail">
      { recipe ?
        <div className="content">
          <RecipeDetail recipe={recipe} />
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

export default Detail
