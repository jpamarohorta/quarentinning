import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import FlexSearch from 'flexsearch'
import Spinner from 'react-spinkit'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import RecipeCard from 'components/RecipeCard'

const bannerImage = require('images/egg.jpg')

const Home = () => {
  const [searchIndex, setSearchIndex] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState(null)

  const dispatch = useDispatch()

  const recipes = useSelector(recipesSelectors.getRecipes)

  const handleSearchValueChange = useCallback((event) => {
    setSearchValue(event.target.value)
  }, [])

  useEffect(() => {
    if (!recipes) {
      dispatch(recipesActions.fetchRecipes())
    }
  }, [recipes, dispatch])

  useEffect(() => {
    if (recipes) {
      const index = new FlexSearch({
        doc: {
          id: 'slug',
          field: [
            'name',
            'ingredients',
            'chef'
          ]
        }
      })

      recipes.forEach((r) => {
        index.add(r);
      })

      setFilteredRecipes(recipes)
      setSearchIndex(index)
    }
  }, [recipes])

  useEffect(() => {
    if (searchValue.length > 2) {
      const matches = searchIndex.search(searchValue.toLowerCase())
      setFilteredRecipes(matches)
    } else if (searchValue.length === 0) {
      setFilteredRecipes(recipes)
    }
  }, [searchValue, searchIndex])

  return (
    <div className="page-home">
      <div className="banner" style={{backgroundImage: `url(${bannerImage})`}}>
        <h1>À Mesa com o Covid</h1>
      </div>
      
      <div className="content-container">
        { filteredRecipes ?
          <div className="content uk-container">
            <form className="search-container">
              <input
                type="text"
                placeholder="Procura por nome ou ingredientes..."
                value={searchValue}
                onChange={handleSearchValueChange} />
            </form>

            <div className="recipes-grid">
              { filteredRecipes.map((recipe, index) => (
                <Link to={`recipes/${recipe.slug}`} key={index} className="recipe">
                  <RecipeCard recipe={recipe} key={index} />
                </Link>
              ))}
            </div>
          </div>
          :
          <div className="loading">
            <Spinner name="double-bounce" color="#F60118" />
          </div>
        }
      </div>
    </div>
  )
}

export default Home
