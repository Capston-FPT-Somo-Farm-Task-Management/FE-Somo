import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import animalReducer from './slice/animal/animalSlice'
import animalTypeReducer from './slice/animal/animalTypeSlice'
import areaReducer from './slice/area/areaSlice'
import areaByFarmReducer from './slice/area/areaByFarm'
import zoneReducer from './slice/zone/zoneSlice'
import zoneByFarmReducer from './slice/zone/zoneByFarm'
import zonePlantReducer from './slice/zone/zonePlantSlice'
import zoneAnimalReducer from './slice/zone/zoneAnimalSlice'
import zoneTypeReducer from './slice/zone/zoneTypeSlice'
import taskTypePlantReducer from './slice/task/taskTypePlant'
import taskTypeLivestockReducer from './slice/task/taskTypeAnimal'
import supervisorReducer from './slice/supervisor/supervisorSlice'
import employeeReducer from './slice/employee/employeeSlice'
import materialReducer from './slice/material/materialSlice'
import fieldReducer from './slice/field/fieldSlice'
import fieldPlantReducer from './slice/field/fieldPlantSlice'
import fieldAnimalReducer from './slice/field/fieldAnimalSlice'
import fieldByZoneReducer from './slice/field/fieldByZoneSlice'
import plantTypeReducer from './slice/plantType/plantTypeSlice'
import taskReducer from './slice/task/taskSlice'
import subTaskReducer from "./slice/subTask/subTaskSlice"
import habitantTypeReducer from './slice/habitant/habitantTypeSlice'
import memberReducer from './slice/user/memberSlice'

export const store = configureStore({
  reducer: {
    plant: plantReducer,
    animal: animalReducer,
    area: areaReducer,
    areaByFarm: areaByFarmReducer,
    zone: zoneReducer,
    zoneByFarm: zoneByFarmReducer,
    zonePlant: zonePlantReducer,
    zoneAnimal: zoneAnimalReducer,
    zoneType: zoneTypeReducer,
    taskTypePlant: taskTypePlantReducer,
    taskTypeLivestock: taskTypeLivestockReducer,
    supervisor: supervisorReducer,
    employee: employeeReducer,
    material: materialReducer,
    field: fieldReducer,
    fieldPlant: fieldPlantReducer,
    fieldAnimal: fieldAnimalReducer,
    fieldByZone: fieldByZoneReducer,
    plantType: plantTypeReducer,
    animalType: animalTypeReducer,
    task: taskReducer,
    subTask: subTaskReducer,
    habitantType: habitantTypeReducer,
    member: memberReducer,
  },
})
