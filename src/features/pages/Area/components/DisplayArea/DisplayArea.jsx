import { Table } from 'antd'
import { getAreas } from 'features/slice/area/areaSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { columns, onChange } from './DisplayAreaData'

const DisplayArea = () => {
  const area = useSelector((state) => state.area.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAreas())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={area}
      onChange={onChange}
      rowSelection={{
        onSelect: (record) => {
          console.log({ record })
        },
      }}
    />
  )
}
export default DisplayArea
