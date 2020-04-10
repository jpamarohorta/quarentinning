import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-spinkit'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import RecipeCard from 'components/RecipeCard'

import { logRecipeClicked } from 'utils/analytics'

const Chef = () => {
  const { slug } = useParams()

  const [chef] = useState(slug.replace(/-/g, ' '))
  const [chefRecipes, setChefRecipes] = useState(null)

  const dispatch = useDispatch()

  const recipes = useSelector(recipesSelectors.getRecipes)

  const handleRecipeClicked = useCallback((slug) => {
    logRecipeClicked(slug)
  }, [])

  useEffect(() => {
    if (!recipes) {
      dispatch(recipesActions.fetchRecipes())
    }
  }, [recipes, dispatch])

  useEffect(() => {
    if (recipes) {
      setChefRecipes(recipes.filter((r) => r.chef === chef))
    }
  }, [recipes, chef])

  return (
    <div className="page-chef">
      <div className="chef-header">
        <div className="chef-header-info uk-container">
          <p>Descubra todas as receitas de</p>
          <h1>{chef}</h1>
          { chefRecipes &&
            <p>{`${chefRecipes.length} ${chefRecipes.length === 1 ? 'receita' : 'receitas'}`}</p>
          }
        </div>
        <div className="chef-header-info uk-container">
          <h4>Receitas do Chef</h4>
          <h1>{chef}</h1>
        </div>
      </div>
      <div className="content-container">
        <div className="content uk-container">
          { chefRecipes ?
            <div className="recipes-grid">
              { chefRecipes.map((recipe, index) => (
                <Link
                  to={`/recipes/${recipe.slug}`}
                  key={index}
                  className="recipe"
                  onClick={() => handleRecipeClicked(recipe.slug)}>
                  <RecipeCard recipe={recipe} key={index} />
                </Link>
              ))}
            </div>
            :
            <div className="loading">
              <Spinner name="double-bounce" color="#F60118" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Chef
