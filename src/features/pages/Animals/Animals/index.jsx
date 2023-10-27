import React, { useEffect } from 'react'
import DisplayAnimal from './components/DisplayAnimal/DisplayAnimal'
import AddAnimalAndAnimalType from './components/AddAnimalAndAnimalType/AddAnimalAndAnimalType'
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
import {
  createHabitantType,
  deleteHabitantType,
  updateHabitantType,
} from 'features/slice/habitant/habitantTypeSlice'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarmSlice'

const Animals = () => {
  const member = useSelector((state) => state.member.data)
  const animalByFarm = useSelector((state) => state.animalByFarm.data)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const farmId = member.farmId

  const animalType = useSelector((state) => state.animalType.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAnimalByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
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
    dispatch(getAnimalType())
  }, [dispatch])

  const onFinishCreateAnimalType = (values) => {
    dispatch(createHabitantType(values)).then(() => {
      loadDataAnimalType()
    })
  }

  const onFinishUpdateAnimalType = (values) => {
    dispatch(updateHabitantType(values)).then(() => {
      loadDataAnimalType()
    })
  }

  const onFinishDeleteAnimalType = (id) => {
    dispatch(deleteHabitantType(id)).then(() => {
      loadDataAnimalType()
    })
  }

  const loadDataAnimalType = () => {
    dispatch(getAnimalType())
  }

  return (
    <>
      <AddAnimalAndAnimalType
        areaByFarm={areaByFarm}
        onFinishCreateAnimal={onFinishCreateAnimal}
        onFinishCreateAnimalType={onFinishCreateAnimalType}
      />
      <DisplayAnimal
        areaByFarm={areaByFarm}
        animalByFarm={animalByFarm}
        animalType={animalType}
        onFinishDeleteAnimal={onFinishDeleteAnimal}
        onFinishUpdateAnimal={onFinishUpdateAnimal}
        onFinishDeleteAnimalType={onFinishDeleteAnimalType}
        onFinishUpdateAnimalType={onFinishUpdateAnimalType}
      />
    </>
  )
}

export default Animals
