import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ areaByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  const filterActiveAreas = (areaByFarm) => {
    if (areaByFarm && areaByFarm.data) {
      const activeAreas = areaByFarm.data.filter(
        (area) => area.status === 'Active'
      )
      return activeAreas.length
    }
    return 0
  }
  const activeAreaCount = filterActiveAreas(areaByFarm)
  const inActiveAreaCount = areaByFarm?.data?.length - activeAreaCount

  return (
    <>
      <Row gutter={16}>
        {/* Active */}
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng khu vực đang mở"
              value={activeAreaCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        {/* Inactive */}
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng khu vực đang đóng"
              value={inActiveAreaCount}
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
