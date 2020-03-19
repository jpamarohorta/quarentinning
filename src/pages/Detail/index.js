import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Tabletop from 'tabletop'

import RecipeDetail from 'components/RecipeDetail'

const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Ny4rhbJaae-3aXqUl5x7YijQk6uK40nnHxaCqfEcbbw/pubhtml'

const parseRecipes = (data) => (
  data.slice(1).map((d, index) => ({
    slug: `${d.name}-${index}`,
    ...d,
  }))
)

const Detail = () => {
  const { slug } = useParams()

  const [recipes, setRecipes] = useState(null)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    if (window.recipes) {
      setRecipes(window.recipes)
      
    } else {
      const callback = (data) => {
        const parsedData = parseRecipes(data)
        setRecipes(parsedData)
        window.recipes = parsedData
      }

      Tabletop.init({ key: spreadsheetUrl, callback, simpleSheet: true })
    }
  }, [])

  useEffect(() => {
    if (recipes) {
      setRecipe(recipes.find((r) => `${r.slug}` === slug))
    }
  }, [recipes])

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
