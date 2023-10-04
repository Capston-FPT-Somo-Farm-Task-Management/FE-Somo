import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import animalReducer from './slice/animal/animalSlice'
import areaReducer from './slice/area/areaSlice'
import zoneReducer from './slice/zone/zoneSlice'
import zonePlantReducer from './slice/zone/zonePlantSlice'
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
    field: fieldReducer,
    fieldByZone: fieldByZoneReducer,
    plantType: plantTypeReducer,
    task: taskReducer,
  },
})
