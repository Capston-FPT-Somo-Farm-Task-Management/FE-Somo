import { Tabs } from 'antd'
import TableDisplayZone from './TableDisplayZone'

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
        ]}
      />
    </>
  )
}
export default DisplayZone
