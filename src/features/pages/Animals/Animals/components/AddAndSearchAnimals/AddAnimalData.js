import FirstStepAddAnimalGroup from '../../../AnimalGroup/components/FirstStepAddAnimalGroup/FirstStepAddAnimalGroup'
import SecondStepAddAnimalGroup from 'features/pages/Animals/AnimalGroup/components/SecondStepAddAnimalGroup/SecondStepAddAnimalGroup'
import FirstStepAddAnimal from '../FirstStepAddAnimal/FirstStepAddAnimal'

export const steps = [
  {
    title: 'Vật nuôi',
    content: <FirstStepAddAnimal />,
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

export const animalType = [
  {
    label: 'Heo',
    value: 'pig',
    id: '1',
  },
  {
    label: 'Bò',
    value: 'cow',
    id: '2',
  },
  {
    label: 'Gà',
    value: 'chicken',
    id: '3',
  },
  {
    label: 'Vịt',
    value: 'duck',
    id: '4',
  },
  {
    label: 'Dê',
    value: 'goat',
    id: '5',
  },
]

// export const animalSex = [
//   {
//     label: 'Trống/Đực',
//     value: 'male',
//     id: '1',
//   },
//   {
//     label: 'Mái/Cái',
//     value: 'female',
//     id: '2',
//   },
// ]

// export const animalStatus = [
//   {
//     label: 'Sống',
//     value: 'active',
//     id: '1',
//   },
//   {
//     label: 'Chết',
//     value: 'sick',
//     id: '2',
//   },
// ]

//-----------------------------------------
export const stepsType = [
  {
    title: 'Chuồng',
    content: <FirstStepAddAnimalGroup />,
  },
  {
    title: 'Chi tiết',
    content: <SecondStepAddAnimalGroup />,
  },
  {
    title: 'Hoàn thành',
    content: 'Third-content',
  },
]

// ------------------------------
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
