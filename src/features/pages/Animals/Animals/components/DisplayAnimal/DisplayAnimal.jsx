import { Tabs } from 'antd'
import { itemTabs } from './DisplayAnimalData'

const DisplayAnimal = () => {
  return <Tabs defaultActiveKey="1" items={itemTabs} type="card" />
}
export default DisplayAnimal
