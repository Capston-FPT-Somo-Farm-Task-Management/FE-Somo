import { Tabs } from 'antd'
import { itemTabs } from './DisplayCropData'

const DisplayCrop = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={itemTabs} type="card" />
    </>
  )
}
export default DisplayCrop
