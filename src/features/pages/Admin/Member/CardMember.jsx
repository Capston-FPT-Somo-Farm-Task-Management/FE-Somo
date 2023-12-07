import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const CardMember = ({ memberByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  const filterManager = (memberByFarm) => {
    if (memberByFarm && memberByFarm.data) {
      const manager = memberByFarm.data.filter(
        (mem) => mem.roleName === 'Manager'
      )
      return manager.length
    }
    return 0
  }

  const filterSupervisor = (memberByFarm) => {
    if (memberByFarm && memberByFarm.data) {
      const supervisor = memberByFarm.data.filter(
        (mem) => mem.roleName === 'Supervisor'
      )
      return supervisor.length
    }
    return 0
  }

  const managerCount = filterManager(memberByFarm)
  const supervisorCount = filterSupervisor(memberByFarm)

  return (
    <>
      <Row gutter={10} style={{ justifyContent: "center" }}>
        <Col span={6} className='dashboard-card'>
          <Card className='card-member'>
            <Statistic
              title="Số lượng người quản lý"
              value={managerCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={6} className='dashboard-card'>
          <Card className='card-member'>
            <Statistic
              title="Số lượng người giám sát"
              value={supervisorCount}
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
