import { Button, Table } from 'antd'
import { deleteArea, getAreaActive } from 'features/slice/area/areaSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Column from 'antd/es/table/Column'

const DisplayArea = () => {
  const area = useSelector((state) => state.area.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreaActive())
  }, [])

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteArea(id))
  }

  return (
    <Table rowKey="id" dataSource={area.data}>
      <Column title="Tên khu vực" dataIndex="name" key="1" />
      <Column title="Diện tích" dataIndex="fArea" key="2" />
      <Column title="Tên trang trại" dataIndex="farmName" key="3" />
      <Column
        title="Xoá"
        key="4"
        dataIndex="id"
        render={(_, record) => (
          <Button size="middle" danger onClick={() => handleDelete(record.id)}>
            Xoá
          </Button>
        )}
      />

      {/* <Column
        title="Cập nhật"
        key="5"
        dataIndex="id"
        render={(_, record) => (
          <Button
            type="primary"
            size="middle"
            onClick={() => console.log('ss')}
          >
            Cập nhật
          </Button>
        )}
      /> */}
    </Table>
  )
}
export default DisplayArea
