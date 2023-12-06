import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ areaByFarm, zoneByFarm, fieldAnimal, fieldPlant }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={10} style={{justifyContent: "space-around"}}>
        <Col span={5} className='dashboard-card'>
          <Card className='card-area'>
            <Statistic
              title="Số lượng khu vực"
              value={areaByFarm ? areaByFarm?.data?.length : ''}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={5} className='dashboard-card'>
          <Card className='card-zone'>
            <Statistic
              title="Số lượng vùng"
              value={zoneByFarm ? zoneByFarm?.data?.length : ''}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={5} className='dashboard-card'>
          <Card className='card-barn'>
            <Statistic
              title="Số lượng chuồng"
              value={fieldAnimal ? fieldAnimal?.data?.length : ''}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={5} className='dashboard-card'>
          <Card className='card-garden'>
            <Statistic
              title="Số lượng vườn"
              value={fieldPlant ? fieldPlant?.data?.length : ''}
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
