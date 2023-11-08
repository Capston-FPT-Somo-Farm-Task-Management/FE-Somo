import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = () => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vườn đang đóng"
              value={111}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vườn đang mở"
              value={313}
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
