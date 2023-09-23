import FirstStepAddPlant from '../FirstStepAddPlant/FirstStepAddPlant'
import FirstStepAddPlantType from '../FirstStepAddPlantType/FirstStepAddPlantType'

export const steps = [
  {
    title: 'Cây trồng',
    content: <FirstStepAddPlant />,
  },
  {
    title: 'Chi tiết',
    content: 'Second-content',
  },
  {
    title: 'Hoàn thành',
    content: 'Third-content',
  },
]

export const plantType = [
  {
    label: 'Cây ăn quả',
    value: 'fruit',
    id: '1',
  },
  {
    label: 'Lúa mì',
    value: 'wheat',
    id: '2',
  },
  {
    label: 'Rau',
    value: 'vegetable',
    id: '3',
  },
  {
    label: 'Củ',
    value: 'vegetable',
    id: '4',
  },
]

export const plantArea = [
  {
    label: 'Khu vực A',
    value: 'AreaA',
    id: '1',
  },
  {
    label: 'Khu vực B',
    value: 'AreaB',
    id: '2',
  },
  {
    label: 'Khu vực C',
    value: 'AreaC',
    id: '3',
  },
]

export const plantZone = [
  {
    label: 'Vùng A',
    value: 'ZoneA',
    id: '1',
  },
  {
    label: 'Vùng B',
    value: 'ZoneB',
    id: '2',
  },
  {
    label: 'Vùng C',
    value: 'ZoneC',
    id: '3',
  },
]

export const plantField = [
  {
    label: 'Khu đất A',
    value: 'FieldA',
    id: '1',
  },
  {
    label: 'Khu đất B',
    value: 'FieldB',
    id: '2',
  },
  {
    label: 'Khu đất C',
    value: 'FieldC',
    id: '3',
  },
]

// ----------------------------------------------------

export const stepsType = [
  {
    title: 'Cây trồng',
    content: <FirstStepAddPlantType />,
  },
  {
    title: 'Chi tiết',
    content: 'Second-content',
  },
  {
    title: 'Hoàn thành',
    content: 'Third-content',
  },
]
