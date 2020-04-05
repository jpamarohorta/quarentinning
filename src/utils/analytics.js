import * as firebase from 'firebase/app'

const logEvent = (name, params) => {
  firebase.analytics().logEvent(name, params)
}

export const logSearch = (query) => {
  logEvent('search', { query })
}

export const logRecipeClicked = (slug) => {
  logEvent('recipe_clicked', { slug })
}

export const logSubmitClicked = () => {
  logEvent('submit_clicked')
}

export const logJaimeClicked = () => {
  logEvent('jaime_clicked')
}

export const logAnaClicked = () => {
  logEvent('ana_clicked')
}

export const logJoaoClicked = () => {
  logEvent('joao_clicked')
}

export const logExploreClicked = () => {
  logEvent('explore_clicked')
}

export const logTopChefClicked = () => {
  logEvent('top_chef_clicked')
}

export const logChefClicked = (slug) => {
  logEvent('chef_clicked', { slug })
}

export const logContributeClicked = () => {
  logEvent('contribute_clicked')
}
