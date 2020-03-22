import produce from 'immer'

import * as actionTypes from './actionTypes'

const initialState = {
  recipes: undefined,
  recipesLoading: false,
  recipesLoaded: false,
  recipesError: undefined,
}

const parseRecipes = (data) => (
  data
    .slice(1)
    .filter((d) => d.approved === 'yes')
    .map((d, index) => ({
    ...d,
    slug: `${d.name.replace(/ /g,"-")}-${index}`,
    imageUrl: `https://drive.google.com/uc?id=${d.image_url.match(/id=(.*)/)[1]}`,
  }))
)

const reducer = (state = initialState, action = {}) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.FETCH_RECIPES:
        draft.recipesLoading = true
        break
      case actionTypes.FETCH_RECIPES_SUCCESS:
        draft.recipesLoading = false
        draft.recipesLoaded = true
        draft.recipesError = undefined
        draft.recipes = parseRecipes(action.payload.recipes)
        break
      case actionTypes.FETCH_RECIPES_FAIL:
        draft.recipesLoading = false
        draft.recipesLoaded = false
        draft.recipesError = { status: action.error.status }
        break

      default:
        break
    }
  })
}

export default reducer;
