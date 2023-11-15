import { configureStore } from '@reduxjs/toolkit'
import farmReducer from './slice/farm/farmSlice'
import plantReducer from './slice/plant/plantSlice'
import animalReducer from './slice/animal/animalSlice'
import animalTypeReducer from './slice/animal/animalTypeSlice'
import animalTypeActiveReducer from './slice/animal/animalTypeActiveSlice'
import animalByFarmReducer from './slice/animal/animalByFarmSlice'
import areaReducer from './slice/area/areaSlice'
import areaByFarmReducer from './slice/area/areaByFarmSlice'
import areaLivestockByZoneReducer from "./slice/area/areaLivestockWithZoneSlice"
import areaPlantByZoneReducer from "./slice/area/areaPlantWithZoneSlice"
import zoneReducer from './slice/zone/zoneSlice'
import zoneByFarmReducer from './slice/zone/zoneByFarmSlice'
import zonePlantReducer from './slice/zone/zonePlantSlice'
import zoneAnimalReducer from './slice/zone/zoneAnimalSlice'
import zoneTypeReducer from './slice/zone/zoneTypeSlice'
import zoneByAreaReducer from "./slice/zone/zoneByAreaSlice"
import taskTypeReducer from './slice/task/taskTypeSlice'
import taskTypeActiveReducer from "./slice/task/taskTypeActiveSlice"
import taskForCalendarReducer from './slice/task/taskForCalendarSlice'
import taskTypePlantReducer from './slice/task/taskTypePlantSlice'
import taskTypeLivestockReducer from './slice/task/taskTypeAnimalSlice'
import supervisorReducer from './slice/supervisor/supervisorSlice'
import employeeReducer from './slice/employee/employeeSlice'
import employeeByTaskReducer from './slice/employee/employeeByTask'
import materialReducer from './slice/material/materialSlice'
import materialActiveReducer from './slice/material/materialActiveByFarmSlice'
import fieldReducer from './slice/field/fieldSlice'
import fieldPlantReducer from './slice/field/fieldPlantSlice'
import fieldAnimalReducer from './slice/field/fieldAnimalSlice'
import fieldByZoneReducer from './slice/field/fieldByZoneSlice'
import plantTypeReducer from './slice/plant/plantTypeSlice'
import plantTypeActiveReducer from './slice/plant/plantTypeActiveSlice'
import plantByFarmReducer from './slice/plant/plantByFarmSlice'
import taskReducer from './slice/task/taskSlice'
import taskByIdReducer from './slice/task/taskByIdSlice'
import taskByWeekReducer from './slice/task/taskByWeekSlice'
import evidenceReducer from './slice/task/taskEvidenceSlice'
import subTaskReducer from './slice/subTask/subTaskSlice'
import effortReducer from './slice/subTask/effortSlice'
import habitantTypeReducer from './slice/habitant/habitantTypeSlice'
import memberReducer from './slice/user/memberSlice'
import statusReducer from './slice/status/statusSlice'
import hubReducer from './slice/hub/hubSlice'
import notificationReducer from './slice/notification/notificationSlice'
import notificationCountReducer from './slice/notification/notificationCountSlice'
import notificationIsNewReducer from './slice/notification/notificationIsNewSlice'
import notificationReadReducer from './slice/notification/notificationReadSlice'
import employeeByFarmReducer from './slice/employee/employeeByFarmSlice'

export const store = configureStore({
  reducer: {
    farm: farmReducer,
    plant: plantReducer,
    animal: animalReducer,
    area: areaReducer,
    areaByFarm: areaByFarmReducer,
    areaLivestockByZone: areaLivestockByZoneReducer,
    areaPlantByZone: areaPlantByZoneReducer,
    zone: zoneReducer,
    zoneByFarm: zoneByFarmReducer,
    zoneByArea: zoneByAreaReducer,
    zonePlant: zonePlantReducer,
    zoneAnimal: zoneAnimalReducer,
    zoneType: zoneTypeReducer,
    supervisor: supervisorReducer,
    employee: employeeReducer,
    employeeByTask: employeeByTaskReducer,
    material: materialReducer,
    materialActive: materialActiveReducer,
    field: fieldReducer,
    fieldPlant: fieldPlantReducer,
    fieldAnimal: fieldAnimalReducer,
    fieldByZone: fieldByZoneReducer,
    plantType: plantTypeReducer,
    plantTypeActive: plantTypeActiveReducer,
    plantByFarm: plantByFarmReducer,
    animalType: animalTypeReducer,
    animalTypeActive: animalTypeActiveReducer,
    animalByFarm: animalByFarmReducer,
    task: taskReducer,
    taskById: taskByIdReducer,
    taskByWeek: taskByWeekReducer,
    taskForCalendar: taskForCalendarReducer,
    taskType: taskTypeReducer,
    taskTypeActive: taskTypeActiveReducer,
    taskTypePlant: taskTypePlantReducer,
    taskTypeLivestock: taskTypeLivestockReducer,
    evidence: evidenceReducer,
    subTask: subTaskReducer,
    effort: effortReducer,
    habitantType: habitantTypeReducer,
    member: memberReducer,
    status: statusReducer,
    hub: hubReducer,
    notification: notificationReducer,
    notificationCount: notificationCountReducer,
    notificationIsNew: notificationIsNewReducer,
    notificationRead: notificationReadReducer,
    employeeByFarm: employeeByFarmReducer,
  },
})
