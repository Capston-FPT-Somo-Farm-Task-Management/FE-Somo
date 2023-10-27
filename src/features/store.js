import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import animalReducer from './slice/animal/animalSlice'
import animalTypeReducer from './slice/animal/animalTypeSlice'
import animalByFarmReducer from './slice/animal/animalByFarmSlice'
import areaReducer from './slice/area/areaSlice'
import areaByFarmReducer from './slice/area/areaByFarmSlice'
import zoneReducer from './slice/zone/zoneSlice'
import zoneByFarmReducer from './slice/zone/zoneByFarmSlice'
import zonePlantReducer from './slice/zone/zonePlantSlice'
import zoneAnimalReducer from './slice/zone/zoneAnimalSlice'
import zoneTypeReducer from './slice/zone/zoneTypeSlice'
import taskTypeReducer from './slice/task/taskTypeSlice'
import taskTypePlantReducer from './slice/task/taskTypePlantSlice'
import taskTypeLivestockReducer from './slice/task/taskTypeAnimalSlice'
import supervisorReducer from './slice/supervisor/supervisorSlice'
import employeeReducer from './slice/employee/employeeSlice'
import materialReducer from './slice/material/materialSlice'
import fieldReducer from './slice/field/fieldSlice'
import fieldPlantReducer from './slice/field/fieldPlantSlice'
import fieldAnimalReducer from './slice/field/fieldAnimalSlice'
import fieldByZoneReducer from './slice/field/fieldByZoneSlice'
import fieldByFarmReducer from './slice/field/fieldByFarmSlice'
import plantTypeReducer from './slice/plant/plantTypeSlice'
import plantByFarmReducer from './slice/plant/plantByFarmSlice'
import taskReducer from './slice/task/taskSlice'
import evidenceReducer from './slice/task/taskEvidenceSlice'
import subTaskReducer from './slice/subTask/subTaskSlice'
import habitantTypeReducer from './slice/habitant/habitantTypeSlice'
import memberReducer from './slice/user/memberSlice'
import statusReducer from "./slice/status/statusSlice"

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
    taskType: taskTypeReducer,
    taskTypePlant: taskTypePlantReducer,
    taskTypeLivestock: taskTypeLivestockReducer,
    supervisor: supervisorReducer,
    employee: employeeReducer,
    material: materialReducer,
    field: fieldReducer,
    fieldPlant: fieldPlantReducer,
    fieldAnimal: fieldAnimalReducer,
    fieldByZone: fieldByZoneReducer,
    fieldByFarm: fieldByFarmReducer,
    plantType: plantTypeReducer,
    plantByFarm: plantByFarmReducer,
    animalType: animalTypeReducer,
    animalByFarm: animalByFarmReducer,
    task: taskReducer,
    evidence: evidenceReducer,
    subTask: subTaskReducer,
    habitantType: habitantTypeReducer,
    member: memberReducer,
    status: statusReducer,
  },
})
