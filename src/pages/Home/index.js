import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Tabletop from 'tabletop'

import RecipeCard from 'components/RecipeCard'

const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Ny4rhbJaae-3aXqUl5x7YijQk6uK40nnHxaCqfEcbbw/pubhtml'

const parseRecipes = (data) => (
  data.slice(1).map((d, index) => ({
    slug: `${d.name}-${index}`,
    ...d,
  }))
)

const Home = () => {
  const [recipes, setRecipes] = useState(null)

  useEffect(() => {
    const callback = (data) => {
      console.log('DATA', data)
      const parsedData = parseRecipes(data)
      setRecipes(parsedData)
      window.recipes = parsedData
    }

    Tabletop.init({ key: spreadsheetUrl, callback, simpleSheet: true })
  }, [])

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
