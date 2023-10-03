import { configureStore } from '@reduxjs/toolkit'
import plantReducer from './slice/plant/plantSlice'
import areaReducer from './slice/area/areaSlice'
import zoneReducer from './slice/zone/zoneSlice'
import fieldReducer from './slice/field/fieldSlice'
import plantTypeReducer from './slice/plantType/plantTypeSlice'

export const store = configureStore({
  reducer: {
    plant: plantReducer,
    area: areaReducer,
    zone: zoneReducer,
    field: fieldReducer,
    plantType: plantTypeReducer,
  },
})
