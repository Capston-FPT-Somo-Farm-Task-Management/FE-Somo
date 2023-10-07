import { Tag, Space, Table } from 'antd'
import TableDisplayAnimal from './TableDisplayAnimal'
import TableDisplayAnimalType from './TableDisplayAnimalType'

export const columns = [
  {
    title: 'Tên vật nuôi',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Loại vật nuôi',
    dataIndex: 'habitantTypeName',
    key: 'habitantTypeName',
  },
  {
    title: 'Mã vật nuôi',
    dataIndex: 'externalId',
    key: 'externalId',
    sorter: (a, b) => a.externalId - b.externalId,
  },

  {
    title: 'Chuồng',
    dataIndex: 'fieldName',
    key: 'fieldName',
  },

  // {
  //   title: 'Trạng thái',
  //   key: 'status',
  //   dataIndex: 'status',
  //   filters: [
  //     {
  //       text: 'Sống',
  //       value: 'Sống',
  //     },
  //     {
  //       text: 'Đã mất',
  //       value: 'Đã mất',
  //     },
  //   ],
  //   onFilter: (value, record) => record.status.indexOf(value) === 0,
  //   render: (_, { status }) => (
  //     <>
  //       {status.map((status) => {
  //         let color = status === 'Sống' ? 'green' : 'volcano'
  //         return (
  //           <Tag color={color} key={status}>
  //             {status.toUpperCase()}
  //           </Tag>
  //         )
  //       })}
  //     </>
  //   ),
  // },

  {
    title: 'Tuỳ chọn',
    key: 'action',
    render: (_, record) => (
      <Space size="small">
        <a>Xoá</a>
        <a>Sửa</a>
      </Space>
    ),
  },
]

export const onChange = (sorter) => {
  console.log('params', sorter)
}

// Tabs

export const itemTabs = [
  {
    key: '1',
    label: 'Vật nuôi',
    children: <TableDisplayAnimal />,
  },
  {
    key: '2',
    label: 'Loại vật nuôi',
    children: <TableDisplayAnimalType />,
  },
]

// animal Type
export const columnsAnimalType = [
  {
    title: 'Tên loại vật nuôi',
    dataIndex: 'name',
    key: '1',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Hệ',
    dataIndex: 'status',
    key: '2',
  },

  {
    title: 'Số lượng trong loại',
    dataIndex: 'quantity',
    key: '2',
  },
  {
    title: 'Tuỳ chọn',
    key: 'action',
    render: (_, record) => (
      <Space size="small">
        <a>Xoá</a>
        <a>Sửa</a>
      </Space>
    ),
  },
]
