import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import animalReducer from './slice/animal/animalSlice'
import areaReducer from './slice/area/areaSlice'
import zoneReducer from './slice/zone/zoneSlice'
import zonePlantReducer from './slice/zone/zonePlantSlice'
import zoneLivestockReducer from './slice/zone/zoneLivestockSlice'
import priorityReducer from "./slice/priority/prioritySlice"
import taskTypePlantReducer from './slice/task/taskTypePlant'
import taskTypeLivestockReducer from './slice/task/taskTypeAnimal'
import memberReducer from "./slice/member/memberSlice"
import employeeReducer from "./slice/employee/employeeSlice"
import materialReducer from "./slice/material/materialSlice"
import fieldReducer from './slice/field/fieldSlice'
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
    zoneLivestock: zoneLivestockReducer,
    priority: priorityReducer,
    taskTypePlant: taskTypePlantReducer,
    taskTypeLivestock: taskTypeLivestockReducer,
    member: memberReducer,
    employee: employeeReducer,
    material: materialReducer,
    field: fieldReducer,
    fieldByZone: fieldByZoneReducer,
    plantType: plantTypeReducer,
    task: taskReducer,
  },
})
