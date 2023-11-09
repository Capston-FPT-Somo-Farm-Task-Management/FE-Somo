import { Card, Col, Divider, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ zoneByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  const filterActiveZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const activeZones = zoneByFarm.data.filter(
        (zone) => zone.status === 'Active'
      )
      return activeZones.length
    }
    return 0
  }
  const activeZoneCount = filterActiveZones(zoneByFarm)
  const inActiveZoneCount = zoneByFarm?.data?.length - activeZoneCount

  // zoneType
  const filterAnimalZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const animalZones = zoneByFarm.data.filter(
        (area) => area.zoneTypeName === 'Chăn nuôi'
      )
      return animalZones.length
    }
    return 0
  }
  const animalZoneCount = filterAnimalZones(zoneByFarm)

  const filterPlantZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const plantZones = zoneByFarm.data.filter(
        (area) => area.zoneTypeName === 'Trồng trọt'
      )
      return plantZones.length
    }
    return 0
  }
  const plantZoneCount = filterPlantZones(zoneByFarm)

  const otherZoneCount =
    zoneByFarm?.data?.length - (animalZoneCount + plantZoneCount)

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vùng đang mở"
              value={activeZoneCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vùng đang đóng"
              value={inActiveZoneCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Divider>Loại vùng</Divider>

        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng vùng chăn nuôi"
              value={animalZoneCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng vùng trồng trọt"
              value={plantZoneCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng vùng khác"
              value={otherZoneCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default DisplayCard
