import { Table } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getZones } from 'features/slice/zone/zoneSlice'
import { columns, onChange } from './DisplayZoneData'

const DisplayZone = () => {
  const zone = useSelector((state) => state.zone.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getZones())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={zone}
      onChange={onChange}
      rowSelection={{
        onSelect: (record) => {
          console.log({ record })
        },
      }}
    />
  )
}
export default DisplayZone
