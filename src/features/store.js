import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import areaReducer from './slice/area/areaSlice'
import zoneReducer from './slice/zone/zoneSlice'
import plantTypeReducer from './slice/plantType/plantTypeSlice'

export const store = configureStore({
  reducer: {
    plant: plantReducer,
    area: areaReducer,
    zone: zoneReducer,
    plantType: plantTypeReducer,
  },
})
