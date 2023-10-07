import { Tabs } from 'antd'
import { itemTabs } from './DisplayCropData'

const DisplayCrop = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={itemTabs} />
    </>
  )
}
export default DisplayCrop
