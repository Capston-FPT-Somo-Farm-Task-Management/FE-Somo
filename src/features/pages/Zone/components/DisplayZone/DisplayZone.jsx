import { Button, Table } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteZone, getZoneActive } from 'features/slice/zone/zoneSlice'
import { columns, onChange } from './DisplayZoneData'
import Column from 'antd/es/table/Column'

const DisplayZone = () => {
  const zone = useSelector((state) => state.zone.data)

  // const zoneData = zone.data.value
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getZoneActive())
  }, [])

  const handleDelete = (id) => {
    deleteZone(id)
  }
  return (
    // <Table
    //   rowKey="id"
    //   columns={columns}
    //   // dataSource={zoneData}
    //   onChange={onChange}
    //   rowSelection={{
    //     onSelect: (record) => {
    //       console.log({ record })
    //     },
    //   }}
    // />

    <Table rowKey="id">
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
export default DisplayZone
