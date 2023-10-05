import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import animalReducer from './slice/animal/animalSlice'
import animalTypeReducer from './slice/animal/animalTypeSlice'
import areaReducer from './slice/area/areaSlice'
import zoneReducer from './slice/zone/zoneSlice'
import zonePlantReducer from './slice/zone/zonePlantSlice'
import zoneAnimalReducer from './slice/zone/zoneAnimalSlice'
<<<<<<< HEAD
=======
<<<<<<< HEAD
import zoneTypeReducer from './slice/zone/zoneTypeSlice'
=======
import priorityReducer from "./slice/priority/prioritySlice"
>>>>>>> df3a003cf6c803240c000e40abf1952118acd9f4
import taskTypePlantReducer from './slice/task/taskTypePlant'
import taskTypeLivestockReducer from './slice/task/taskTypeAnimal'
import memberReducer from "./slice/member/memberSlice"
import employeeReducer from "./slice/employee/employeeSlice"
import materialReducer from "./slice/material/materialSlice"
>>>>>>> dcc146590244152f82ad770b339f50b857f0c0dd
import fieldReducer from './slice/field/fieldSlice'
import fieldPlantReducer from './slice/field/fieldPlantSlice'
import fieldAnimalReducer from './slice/field/fieldAnimalSlice'
import fieldByZoneReducer from './slice/field/fieldByZoneSlice'
import plantTypeReducer from './slice/plantType/plantTypeSlice'
import taskReducer from './slice/task/taskSlice'

export const store = configureStore({
  reducer: {
    plant: plantReducer,
    animal: animalReducer,
    area: areaReducer,
    zone: zoneReducer,
    zonePlant: zonePlantReducer,
    zoneAnimal: zoneAnimalReducer,
<<<<<<< HEAD
=======
<<<<<<< HEAD
    zoneType: zoneTypeReducer,
=======
    priority: priorityReducer,
>>>>>>> df3a003cf6c803240c000e40abf1952118acd9f4
    taskTypePlant: taskTypePlantReducer,
    taskTypeLivestock: taskTypeLivestockReducer,
    member: memberReducer,
    employee: employeeReducer,
    material: materialReducer,
>>>>>>> dcc146590244152f82ad770b339f50b857f0c0dd
    field: fieldReducer,
    fieldPlant: fieldPlantReducer,
    fieldAnimal: fieldAnimalReducer,
    fieldByZone: fieldByZoneReducer,
    plantType: plantTypeReducer,
    animalType: animalTypeReducer,
    task: taskReducer,
  },
})
