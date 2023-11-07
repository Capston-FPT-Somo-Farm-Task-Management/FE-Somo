import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import DisplayChartTask from './DisplayChartTask'

const Dashboard = () => {
  return (
    <div>
      <DisplayCard />
      <Divider dashed />
      <DisplayChartTask />
    </div>
  )
}
export default Dashboard
