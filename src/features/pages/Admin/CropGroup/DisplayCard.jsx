import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ fieldPlant }) => {
  const formatter = (value) => <CountUp end={value} separator="," />
  const filterActiveCropGroups = (fieldPlant) => {
    if (fieldPlant && fieldPlant.data) {
      const activeCropGroups = fieldPlant.data.filter(
        (field) => field.isDelete === false
      )
      return activeCropGroups.length
    }
    return 0
  }
  const activeCropGroup = filterActiveCropGroups(fieldPlant)
  const inActiveCropGroup = fieldPlant?.data?.length - activeCropGroup

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vườn đang mở"
              value={activeCropGroup}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng vườn đang đóng"
              value={inActiveCropGroup}
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
