import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const CardMember = () => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng người quản lý"
              value={99}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng người giám sát"
              value={111}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default CardMember
