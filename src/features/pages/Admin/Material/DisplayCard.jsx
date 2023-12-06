import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ activeMaterialCount, inActiveMaterialCount }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={10} style={{ justifyContent: "center" }}>
        {/* Active */}
        <Col span={6} className='dashboard-card'>
          <Card className='card-material'>
            <Statistic
              title="Số công cụ có thể sử dụng"
              value={activeMaterialCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        {/* Inactive */}
        <Col span={6} className='dashboard-card'>
          <Card className='card-material'>
            <Statistic
              title="Số công cụ chưa được sử dụng"
              value={inActiveMaterialCount}
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
