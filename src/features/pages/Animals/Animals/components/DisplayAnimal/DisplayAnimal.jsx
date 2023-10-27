import { Tabs } from 'antd'
import TableDisplayAnimal from './TableDisplayAnimal'
import TableDisplayAnimalType from './TableDisplayAnimalType'

const DisplayAnimal = ({
  areaByFarm,
  animalByFarm,
  onFinishUpdateAnimal,
  onFinishDeleteAnimal,
  animalType,
  onFinishDeleteAnimalType,
  onFinishUpdateAnimalType,
}) => {
  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      items={[
        {
          key: '1',
          label: 'Vật nuôi',
          children: (
            <TableDisplayAnimal
              areaByFarm={areaByFarm}
              animalByFarm={animalByFarm}
              onFinishUpdateAnimal={onFinishUpdateAnimal}
              onFinishDeleteAnimal={onFinishDeleteAnimal}
            />
          ),
        },
        {
          key: '2',
          label: 'Loại vật nuôi',
          children: (
            <TableDisplayAnimalType
              animalType={animalType}
              onFinishUpdateAnimalType={onFinishUpdateAnimalType}
              onFinishDeleteAnimalType={onFinishDeleteAnimalType}
            />
          ),
        },
      ]}
    />
  )
}
export default DisplayAnimal
