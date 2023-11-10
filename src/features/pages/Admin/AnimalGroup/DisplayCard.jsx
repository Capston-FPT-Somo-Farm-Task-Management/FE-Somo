import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ fieldAnimal, animalByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  const filterActiveAnimalGroups = (fieldAnimal) => {
    if (fieldAnimal && fieldAnimal.data) {
      const activeAnimalGroups = fieldAnimal.data.filter(
        (field) => field.isDelete === false
      )
      return activeAnimalGroups.length
    }
    return 0
  }
  const activeAnimalGroup = filterActiveAnimalGroups(fieldAnimal)
  const inActiveAnimalGroup = fieldAnimal?.data?.length - activeAnimalGroup
  const animalByFarmCount = animalByFarm?.data?.length
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng chuồng đang mở"
              value={activeAnimalGroup}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng chuồng đang đóng"
              value={inActiveAnimalGroup}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng vật nuôi trong các chuồng"
              value={animalByFarmCount}
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
