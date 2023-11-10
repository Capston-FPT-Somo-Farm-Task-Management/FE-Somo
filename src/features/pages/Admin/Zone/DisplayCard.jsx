import { Card, Col, Divider, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({
  activeZoneCount,
  inActiveZoneCount,
  animalZoneCount,
  plantZoneCount,
  otherZoneCount,
}) => {
  const formatter = (value) => <CountUp end={value} separator="," />

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
              title="Số lượng các loại vùng khác"
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
