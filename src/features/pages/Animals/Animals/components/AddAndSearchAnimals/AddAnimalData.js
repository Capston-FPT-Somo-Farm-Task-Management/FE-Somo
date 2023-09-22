import AddAnimals from './FirstStepAddAnimal'
import FirstStepAddAnimalGroup from '../../../AnimalGroup/components/AddAnimalGroup/FirstStepAddAnimalGroup'
import SecondStepAddAnimalGroup from 'features/pages/Animals/AnimalGroup/components/AddAnimalGroup/SecondStepAddAnimalGroup'

export const steps = [
  {
    title: 'Cây trồng',
    content: <AddAnimals />,
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

export const animalSex = [
  {
    label: 'Trống/Đực',
    value: 'male',
    id: '1',
  },
  {
    label: 'Mái/Cái',
    value: 'female',
    id: '2',
  },
]

export const animalStatus = [
  {
    label: 'Sống',
    value: 'active',
    id: '1',
  },
  {
    label: 'Chết',
    value: 'sick',
    id: '2',
  },
]

//-----------------------------------------
export const stepsType = [
  {
    title: 'Nhóm',
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
