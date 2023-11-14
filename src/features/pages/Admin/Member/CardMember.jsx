import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const CardMember = ({ member }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  const filterManager = (member) => {
    if (member && member.data) {
      const manager = member.data.filter((mem) => mem.roleName === 'Manager')
      return manager.length
    }
    return 0
  }

  const filterSupervisor = (member) => {
    if (member && member.data) {
      const supervisor = member.data.filter(
        (mem) => mem.roleName === 'Supervisor'
      )
      return supervisor.length
    }
    return 0
  }

  const managerCount = filterManager(member)
  const supervisorCount = filterSupervisor(member)

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Số lượng người quản lý"
              value={managerCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
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
