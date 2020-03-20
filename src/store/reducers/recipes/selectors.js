import { createSelector } from 'reselect'

export const getRecipes = createSelector(
  (state) => state.recipes.recipes,
  (recipes) => recipes
)

