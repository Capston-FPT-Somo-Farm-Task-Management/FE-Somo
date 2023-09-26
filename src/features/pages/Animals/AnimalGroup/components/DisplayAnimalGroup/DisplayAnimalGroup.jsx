import { Table } from 'antd'
import { columns, data, onChange } from './DisplayAnimalGroupData'

const DisplayAnimalGroup = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      // rowSelection={{}}
    />
  )
}
export default DisplayAnimalGroup
