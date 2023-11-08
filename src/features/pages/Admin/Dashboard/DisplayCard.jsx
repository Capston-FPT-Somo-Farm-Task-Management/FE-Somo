import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = () => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={10}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Số lượng khu vực"
              value={40}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Số lượng vùng"
              value={159}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Số lượng chuồng"
              value={217}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Số lượng vườn"
              value={281}
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
