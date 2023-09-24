import { Table } from 'antd'
import { columns, data, onChange } from './DisplayAnimalData'

const DisplayAnimal = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      rowSelection={{}}
    />
  )
}
export default DisplayAnimal
