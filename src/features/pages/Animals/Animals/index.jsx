import React, { useEffect } from 'react'
import AddAnimalAndAnimalType from './components/AddAnimal/AddAnimal'
import { useSelector } from 'react-redux'
import { getAnimalByFarmId } from 'features/slice/animal/animalByFarmSlice'
import { useDispatch } from 'react-redux'
import { getMemberById } from 'features/slice/user/memberSlice'
import { authServices } from 'services/authServices'
import {
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from 'features/slice/animal/animalSlice'
import { getAnimalType } from 'features/slice/animal/animalTypeSlice'
import { createHabitantType } from 'features/slice/habitant/habitantTypeSlice'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarmSlice'
import TableDisplayAnimal from './components/DisplayAnimal/TableDisplayAnimal'

const Animals = () => {
  const dispatch = useDispatch()
  const animalByFarm = useSelector((state) => state.animalByFarm.data)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAnimalByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
    dispatch(getAnimalType(farmId))
  }, [dispatch])

  const onFinishCreateAnimal = (values) => {
    dispatch(createAnimal(values)).then(() => {
      loadDataAnimal()
    })
  }

  const onFinishUpdateAnimal = (values) => {
    dispatch(updateAnimal(values)).then(() => {
      loadDataAnimal()
    })
  }

  const onFinishDeleteAnimal = (id) => {
    dispatch(deleteAnimal(id)).then(() => {
      loadDataAnimal()
    })
  }

  const loadDataAnimal = () => {
    dispatch(getAnimalByFarmId(farmId))
  }

  // Type

  useEffect(() => {
    dispatch(getAnimalType(farmId))
  }, [dispatch])

  const onFinishCreateAnimalType = (values) => {
    dispatch(createHabitantType(values)).then(() => {
      loadDataAnimalType()
    })
  }

  const loadDataAnimalType = () => {
    dispatch(getAnimalType(farmId))
  }

  return (
    <>
      <AddAnimalAndAnimalType
        farmId={farmId}
        areaByFarm={areaByFarm}
        onFinishCreateAnimal={onFinishCreateAnimal}
        onFinishCreateAnimalType={onFinishCreateAnimalType}
      />
      <TableDisplayAnimal
        farmId={farmId}
        areaByFarm={areaByFarm}
        animalByFarm={animalByFarm}
        onFinishDeleteAnimal={onFinishDeleteAnimal}
        onFinishUpdateAnimal={onFinishUpdateAnimal}
      />
    </>
  )
}

export default Animals
