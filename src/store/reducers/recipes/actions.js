import Tabletop from 'tabletop'

import * as actionTypes from './actionTypes'

const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Ny4rhbJaae-3aXqUl5x7YijQk6uK40nnHxaCqfEcbbw/pubhtml'

export const fetchRecipes = (url) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_RECIPES })

  return Tabletop.init({ key: spreadsheetUrl, simpleSheet: true })
    .then((data) => {
      dispatch({ type: actionTypes.FETCH_RECIPES_SUCCESS, payload: { recipes: data } })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_RECIPES_FAIL, payload: { error } })
    })
}
