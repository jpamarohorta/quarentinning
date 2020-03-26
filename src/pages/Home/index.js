import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import FlexSearch from 'flexsearch'
import Spinner from 'react-spinkit'

import { useDebounce } from 'hooks/debounce'

import { actions as recipesActions, selectors as recipesSelectors } from 'store/reducers/recipes'

import RecipeCard from 'components/RecipeCard'

import { logSearch, logRecipeClicked, logSubmitClicked } from 'utils/analytics'

const bannerImage = require('images/egg.jpg')

const Home = () => {
  const [searchIndex, setSearchIndex] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState(null)
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const dispatch = useDispatch()

  const recipes = useSelector(recipesSelectors.getRecipes)

  const handleSearchValueChange = useCallback((event) => {
    setSearchValue(event.target.value)
  }, [])

  const handleRecipeClicked = useCallback((slug) => {
    logRecipeClicked({ slug })
  }, [])

  const handleSubmitClick = useCallback(() => {
    logSubmitClicked()
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
  }, [searchValue, searchIndex, recipes])

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 0) {
      logSearch(debouncedSearchValue)
    }
  }, [debouncedSearchValue])

  return (
    <div className="page-home">
      <div className="banner" style={{backgroundImage: `url(${bannerImage})`}}>
        <h1>À Mesa com o Covid</h1>
      </div>
      
      <div className="content-container">
        <div className="intro-container uk-container">
          <h1>Não são as receitas que queríamos,</h1>
          <h1>mas as receitas possíveis.</h1>

          <div className="description-container">
            <p>Uma lista de pequenas-grandes receitas, feitas com o que nos resta na dispensa, pouca arte e muito engenho. Acreditamos que existe um chef escondido em cada um de nós e está na hora de lhe dar voz.</p>
          </div>

          <div className="submit-container">
            <p className="submit-title">Envia-nos a tua receita</p>

            <a
              className="link"
              href="https://forms.gle/rFxbCHLjAwBRRTxX9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSubmitClick}>Submeter Receita</a>
          </div>
        </div>

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
                <Link
                  to={`recipes/${recipe.slug}`}
                  key={index}
                  className="recipe"
                  onClick={() => handleRecipeClicked(recipe.slug)}>
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
