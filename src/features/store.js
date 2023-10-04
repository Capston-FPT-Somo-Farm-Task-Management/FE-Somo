import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import areaReducer from './slice/area/areaSlice'
import zoneReducer from './slice/zone/zoneSlice'
import zonePlantReducer from './slice/zone/zonePlantSlice'
import zoneLivestockReducer from './slice/zone/zoneLivestockSlice'
import fieldReducer from './slice/field/fieldSlice'
import plantTypeReducer from './slice/plantType/plantTypeSlice'
import taskReducer from './slice/task/taskSlice'


export const store = configureStore({
  reducer: {
    plant: plantReducer,
    area: areaReducer,
    zone: zoneReducer,
    zonePlant: zonePlantReducer,
    zoneLivestock: zoneLivestockReducer,
    field: fieldReducer,
    plantType: plantTypeReducer,
    task: taskReducer,
  },
})
