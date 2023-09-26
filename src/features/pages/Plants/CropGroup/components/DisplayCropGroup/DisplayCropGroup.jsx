import { Table } from 'antd'
import { columns, data, onChange } from './DisplayCropGroupData'

const DisplayCropGroup = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      // rowSelection={{}}
    />
  )
}
export default DisplayCropGroup
