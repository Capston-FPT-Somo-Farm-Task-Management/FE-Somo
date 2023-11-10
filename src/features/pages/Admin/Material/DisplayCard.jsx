import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ activeMaterialCount, inActiveMaterialCount }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={16}>
        {/* Active */}
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng công cụ có thể sử dụng"
              value={activeMaterialCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        {/* Inactive */}
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng công cụ chưa được sử dụng"
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
