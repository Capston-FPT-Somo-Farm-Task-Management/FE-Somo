import { Tabs } from 'antd'
import TableDisplayZone from './TableDisplayZone'
import TableDisplayZoneType from './TableDisplayZoneType'

const DisplayZone = ({
  areaByFarm,
  zoneByFarm,
  zoneType,
  onFinishUpdateZone,
  onFinishDeleteZone,
}) => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={[
          {
            key: '1',
            label: 'Vùng',
            children: (
              <TableDisplayZone
                areaByFarm={areaByFarm}
                zoneByFarm={zoneByFarm}
                zoneType={zoneType}
                onFinishUpdateZone={onFinishUpdateZone}
                onFinishDeleteZone={onFinishDeleteZone}
              />
            ),
          },
          {
            key: '2',
            label: 'Loại vùng',
            children: (
              <TableDisplayZoneType
              // plantType={plantType}
              // onFinishDeletePlantType={onFinishDeletePlantType}
              // onFinishUpdatePlantType={onFinishUpdatePlantType}
              />
            ),
          },
        ]}
      />{' '}
    </>
  )
}
export default DisplayZone
