import { Tabs } from 'antd'
import TableDisplayCrop from './TableDisplayCrop'
import TableDisplayCropType from './TableDisplayCropType'

const DisplayCrop = ({
  areaByFarm,
  plantByFarm,
  onFinishUpdatePlant,
  onFinishDeletePlant,
  plantType,
  onFinishUpdatePlantType,
  onFinishDeletePlantType,
}) => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={[
          {
            key: '1',
            label: 'Cây trồng',
            children: (
              <TableDisplayCrop
                areaByFarm={areaByFarm}
                plantByFarm={plantByFarm}
                onFinishUpdatePlant={onFinishUpdatePlant}
                onFinishDeletePlant={onFinishDeletePlant}
              />
            ),
          },
          {
            key: '2',
            label: 'Loại cây trồng',
            children: (
              <TableDisplayCropType
                plantType={plantType}
                onFinishDeletePlantType={onFinishDeletePlantType}
                onFinishUpdatePlantType={onFinishUpdatePlantType}
              />
            ),
          },
        ]}
      />{' '}
    </>
  )
}
export default DisplayCrop
