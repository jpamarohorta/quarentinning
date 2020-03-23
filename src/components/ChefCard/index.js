import React from 'react'

const ChefCard = ({ chef }) => {
  const { name, recipes } = chef
  const recipesCount = recipes.length

  return (
    <div className="component-chef-card">
      <h4>{name}</h4>
      <p>{`${recipesCount} ${recipesCount === 1 ? 'receita' : 'receitas'}`}</p>
    </div>
  )
}

export default ChefCard
