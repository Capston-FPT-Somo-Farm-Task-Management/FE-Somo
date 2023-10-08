import TableDisplayAnimal from './TableDisplayAnimal'
import TableDisplayAnimalType from './TableDisplayAnimalType'

// Tabs

export const itemTabs = [
  {
    key: '1',
    label: 'Vật nuôi',
    children: <TableDisplayAnimal />,
  },
  {
    key: '2',
    label: 'Loại vật nuôi',
    children: <TableDisplayAnimalType />,
  },
]
