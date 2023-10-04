import React from 'react'

import DisplayAnimal from './components/DisplayAnimal/DisplayAnimal'
import AddAnimalAndAnimalType from './components/AddAnimalAndAnimalType/AddAnimalAndAnimalType'

const Animals = () => {
  return (
    <>
      <AddAnimalAndAnimalType />
      <DisplayAnimal />
    </>
  )
}

export default Animals
