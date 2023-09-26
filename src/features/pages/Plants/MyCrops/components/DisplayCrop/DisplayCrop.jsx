import { Table } from 'antd'
import { columns, data, onChange } from './DisplayCropData'

const DisplayCrop = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      rowSelection={{}}
    />
  )
}
export default DisplayCrop
