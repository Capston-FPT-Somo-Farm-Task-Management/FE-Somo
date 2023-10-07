import { Space, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldPlant } from 'features/slice/field/fieldPlantSlice'
import { useEffect } from 'react'
import Column from 'antd/es/table/Column'
import { deleteField } from 'features/slice/field/fieldSlice'

const DisplayCropGroup = () => {
  const fieldPlant = useSelector((state) => state.fieldPlant.data)
  const field = fieldPlant.data
  console.log(fieldPlant)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFieldPlant())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteField(id))
  }

  return (
    <Table dataSource={field} rowKey="id" on>
      <Column
        title="Tên vườn"
        dataIndex="name"
        key="1"
        render={(text) => <h4>{text}</h4>}
      />
      <Column title="Vùng" dataIndex="zoneName" key="2" />
      <Column title="Diện tích" dataIndex="area" key="3" />
      <Column title="Hệ" dataIndex="status" key="4" />
      <Column
        title="Tuỳ chọn"
        key="5"
        dataIndex="id"
        render={(_, record) => (
          <Space size="middle">
            <a onClick={() => handleDelete(record.id)}>Xoá</a>
          </Space>
        )}
      />
    </Table>
  )
}

export default DisplayCropGroup
