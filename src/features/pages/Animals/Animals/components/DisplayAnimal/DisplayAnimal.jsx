import { Tabs } from 'antd'
import { itemTabs } from './DisplayAnimalData'

const DisplayAnimal = () => {
  return <Tabs defaultActiveKey="1" items={itemTabs} />
}
export default DisplayAnimal
