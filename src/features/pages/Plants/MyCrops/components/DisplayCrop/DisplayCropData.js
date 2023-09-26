import { Tag, Space, Table } from 'antd'

export const columns = [
  {
    title: 'Tên cây',
    dataIndex: 'nameCrop',
    key: 'nameCrop',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Loại cây',
    dataIndex: 'typeCrop',
    key: 'typeCrop',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
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
    nameCrop: 'Cây Đa',
    typeCrop: 'Đa Gia Lai',
    id: 1,
  },
  {
    key: '2',
    nameCrop: 'Cây Cóc',
    typeCrop: 'Cóc Mỹ',
    id: 2,
  },
  {
    key: '3',
    nameCrop: 'Cây Khế',
    typeCrop: 'Khế Bình Thuận',
    id: 3,
  },
  {
    key: '4',
    nameCrop: 'Cây Mận',
    typeCrop: 'Mận Bắc',
    id: 4,
  },
  {
    key: '5',
    nameCrop: 'Cây Xoài',
    typeCrop: 'Xoài Thái',
    id: 5,
  },
  {
    key: '6',
    nameCrop: 'Cây Ổi',
    typeCrop: 'Ổi Hồng',
    id: 6,
  },
  {
    key: '7',
    nameCrop: 'Cây Táo',
    typeCrop: 'Táo Mỹ',
    id: 7,
  },
  {
    key: '8',
    nameCrop: 'Cây Lựu',
    typeCrop: 'Lựu Việt Nam',
    id: 8,
  },
  {
    key: '9',
    nameCrop: 'Cây Quýt',
    typeCrop: 'Quýt nhỏ',
    id: 9,
  },
  {
    key: '10',
    nameCrop: 'Cây Cam',
    typeCrop: 'Cam to',
    id: 10,
  },
  {
    key: '11',
    nameCrop: 'Cây Bưởi',
    typeCrop: 'Bưởi Long Thành',
    id: 11,
  },
  {
    key: '12',
    nameCrop: 'Cây Sầu Riêng',
    typeCrop: 'Sầu Riêng hạt lép',
    id: 12,
  },
]
