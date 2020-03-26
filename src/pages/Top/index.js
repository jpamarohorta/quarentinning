import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-spinkit'
import { orderBy } from 'lodash'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import ChefCard from 'components/ChefCard'

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
    name: c, recipes: chefsObject[c]
  }))

  return orderBy(chefsArray, [(c) => c.recipes.length], ['desc'])
}

const Top = () => {
  const [chefs, setChefs] = useState(null)

  const dispatch = useDispatch()

  const recipes = useSelector(recipesSelectors.getRecipes)

  useEffect(() => {
    if (!recipes) {
      dispatch(recipesActions.fetchRecipes())
    }
  }, [recipes, dispatch])

  useEffect(() => {
    if (recipes) {
      setChefs(sortRecipesByChef(recipes))
    }
  }, [recipes])

  console.log('CHEFS', chefs)

  return (
    <div className="page-top">
      { chefs ?
        <>
          <div className="top-chef">
            <div className="top-chef-info uk-container">
              <h4>O Top Chef atual é</h4>
              <h1>{chefs[0].name}</h1>
              <h4>{`${chefs[0].recipes.length} ${chefs[0].recipes.length === 1 ? 'receita' : 'receitas'}`}</h4>
            </div>
          </div>

          <div className="content-container">
            <div className="content uk-container">
              <div className="chefs-list">
                { chefs.slice(1).map((chef, index) => (
                  <ChefCard chef={chef} key={index} />
                ))}
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
