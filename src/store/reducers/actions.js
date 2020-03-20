import * as actionTypes from './actionTypes'

export const fetchRecipes = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_RECIPES })

  const recipes

  return Tabletop.init({ key: spreadsheetUrl, simpleSheet: true })
    .then((data) => {
      dispatch({ type: actionTypes.FETCH_RECIPES_SUCCESS, payload: { recipes: data } })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_RECIPES_FAIL, payload: { error } })
    })
}
