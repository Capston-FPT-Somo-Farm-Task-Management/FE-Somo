import { Tag, Space, Table } from 'antd'

export const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Loại',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Sống',
        value: 'Sống',
      },
      {
        text: 'Đã mất',
        value: 'Đã mất',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (_, { status }) => (
      <>
        {status.map((status) => {
          let color = status === 'Sống' ? 'green' : 'volcano'
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  Table.SELECTION_COLUMN,
  {
    title: 'Tuỳ chọn',
    key: 'action',
    render: (_, record) => (
      <Space size="small">
        <a>Xoá</a>
        <a>Sửa</a>
        <a>Khác</a>
      </Space>
    ),
  },
]

export const onChange = (pagination, filters, sorter, extra, sorterStatus) => {
  console.log('params', pagination, filters, sorter, extra, sorterStatus)
}
export const data = [
  {
    key: '1',
    name: 'Gà',
    id: 32,
    type: 'Gà công nghiệp',
    status: ['Sống'],
  },
  {
    key: '2',
    name: 'Bò',
    id: 42,
    type: 'Bò sữa',
    status: ['Đã mất'],
  },
  {
    key: '3',
    name: 'Heo',
    id: 27,
    type: 'Heo rừng',
    status: ['Sống'],
  },
  {
    key: '4',
    name: 'Vịt',
    id: 31,
    type: 'Vịt trời',
    status: ['Sống'],
  },
  {
    key: '5',
    name: 'Thỏ',
    id: 33,
    type: 'Bò sữa',
    status: ['Đã mất'],
  },
  {
    key: '6',
    name: 'Nai',
    id: 17,
    type: 'Nai rừng',
    status: ['Sống'],
  },
  {
    key: '7',
    name: 'Cừu',
    id: 99,
    type: 'Cừu Mỹ',
    status: ['Sống'],
  },
  {
    key: '8',
    name: 'Chim Cút',
    id: 22,
    type: 'Cút rừng',
    status: ['Đã mất'],
  },
  {
    key: '9',
    name: 'Dê',
    id: 11,
    type: 'Dê núi',
    status: ['Sống'],
  },
  {
    key: '10',
    name: 'Chồn',
    id: 81,
    type: 'Chồn hương',
    status: ['Sống'],
  },
  {
    key: '11',
    name: 'Nhím',
    id: 59,
    type: 'Nhím rừng',
    status: ['Đã mất'],
  },
  {
    key: '12',
    name: 'Rắn',
    id: 41,
    type: 'Rắn nước',
    status: ['Sống'],
  },
]
