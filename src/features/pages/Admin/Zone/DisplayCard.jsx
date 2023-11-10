import { Card, Col, Divider, Progress, Row, Space, Statistic } from 'antd'
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
      <Space style={{ margin: '0 20px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Số lượng vùng đang mở"
                value={activeZoneCount}
                precision={2}
                formatter={formatter}
              />
              <Progress showInfo={false} percent={100} strokeColor="#2291f4" />
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
              <Progress showInfo={false} percent={100} strokeColor="#ff0000" />
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
              <Progress showInfo={false} percent={100} strokeColor="#ffbc3d" />
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
              <Progress showInfo={false} percent={100} strokeColor="#00e9a3" />
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
              <Progress showInfo={false} percent={100} strokeColor="#053e73" />
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  )
}
export default DisplayCard
