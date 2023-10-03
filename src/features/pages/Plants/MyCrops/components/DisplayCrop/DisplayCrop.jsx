import { Table } from 'antd'
import { columns, onChange } from './DisplayCropData'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPlants } from 'features/slice/plant/plantSlice'

const DisplayCrop = () => {
  const plant = useSelector((state) => state.plant.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlants())
  }, [])

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={plant}
      onChange={onChange}
      rowSelection={{
        onSelect: (record) => {
          console.log({ record })
        },
      }}
    />
  )
}
export default DisplayCrop
