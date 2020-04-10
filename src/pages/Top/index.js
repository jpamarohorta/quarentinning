import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-spinkit'
import { orderBy } from 'lodash'
import Carousel from '@brainhubeu/react-carousel'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import RecipeCard from 'components/RecipeCard'
import ChefCard from 'components/ChefCard'

import { logChefClicked, logRecipeClicked } from 'utils/analytics'

import '@brainhubeu/react-carousel/lib/style.css';

const sortRecipesByChef = (recipes) => {
  let chefsObject = {}

  recipes.forEach((r) => {
    const { chef } = r

    if (chefsObject[chef]) {
      chefsObject[chef].push(r)
    } else {
      chefsObject[chef] = [r]
    }
  })

  const chefsArray = Object.keys(chefsObject).map((c) => ({
    name: c, slug: c.replace(/ /g,"-"), recipes: chefsObject[c]
  }))

  return orderBy(chefsArray, [(c) => c.recipes.length], ['desc'])
}

const Top = () => {
  const [chefs, setChefs] = useState(null)
  const [topChefRecipes, setTopChefRecipes] = useState(null)

  const dispatch = useDispatch()

  const recipes = useSelector(recipesSelectors.getRecipes)

  const handleChefClicked = useCallback((slug) => {
    logChefClicked({ slug })
  }, [])

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
      const orderedChefs = sortRecipesByChef(recipes)
      setChefs(orderedChefs)
      setTopChefRecipes(recipes.filter((r) => r.chef === orderedChefs[0].name))
    }
  }, [recipes])

  return (
    <div className="page-top">
      { chefs ?
        <>
          <div className="top-chef">
            <div className="top-chef-info uk-container">
              <p>O nosso top chef é</p>
              <Link
                to={`chefs/${chefs[0].slug}`}
                onClick={() => handleRecipeClicked(chefs[0].slug)}
                className="top-chef-name">
                <h1>{chefs[0].name}</h1>
              </Link>
              <p>{`${chefs[0].recipes.length} ${chefs[0].recipes.length === 1 ? 'receita' : 'receitas'}`}</p>
            </div>
          </div>

          <div className="content-container">
            <div className="content uk-container">
              <div className="discover-section">
                <div className="discover-section-header">
                  <h4>A descobrir</h4>
                  <p>Descubra as especialidades do nosso top chef</p>
                </div>

                <div className="discover-recipe-list">
                  <Carousel slidesPerPage={4} offset={32} animationSpeed={250}>
                    { topChefRecipes?.map((recipe, index) => (
                      <Link
                        to={`/recipes/${recipe.slug}`}
                        key={index}
                        className="recipe"
                        onClick={() => handleChefClicked(recipe.slug)}>
                        <RecipeCard recipe={recipe} key={index} />
                      </Link>
                    ))}
                  </Carousel>
                </div>
              </div>

              <div className="chefs-section">
                <div className="chefs-section-header">
                  <h4>Todos os chefs</h4>
                  <p>Conheça todos os chefs têm contribuído para este projecto</p>
                </div>
                <div className="chefs-list">
                  { chefs.slice(1).map((chef, index) => (
                    <Link
                      to={`chefs/${chef.slug}`}
                      key={index}
                      onClick={() => handleRecipeClicked(chef.slug)}>
                      <ChefCard chef={chef} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <div className="loading">
          <Spinner name="double-bounce" color="#F60118" />
        </div>
      }
    </div>
  )
}

export default Top
