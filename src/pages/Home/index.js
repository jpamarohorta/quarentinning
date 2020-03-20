import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import FlexSearch from 'flexsearch'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import RecipeCard from 'components/RecipeCard'

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
      console.log('MATCHES', matches)
      setFilteredRecipes(matches)
    } else if (searchValue.length === 0) {
      setFilteredRecipes(recipes)
    }
  }, [searchValue, searchIndex])

  return (
    <div className="page-home uk-container">
      { filteredRecipes ?
        <div className="content">
          <form className="uk-search uk-search-default search-container">
            <input
              className="uk-search-input"
              type="text"
              placeholder="Procura por nome ou ingrientes..."
              value={searchValue}
              onChange={handleSearchValueChange} />
          </form>

          <div className="uk-grid">
            { filteredRecipes.map((recipe, index) => (
              <Link to={`recipes/${recipe.slug}`} key={index} className="recipe">
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
