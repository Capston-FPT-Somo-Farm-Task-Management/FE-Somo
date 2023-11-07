import { Card, Col, Divider, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = () => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vùng đang đóng"
              value={40}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vùng đang mở"
              value={159}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Divider>Loại vùng</Divider>

        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vùng chăn nuôi"
              value={234}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vùng trồng trọt"
              value={345}
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
