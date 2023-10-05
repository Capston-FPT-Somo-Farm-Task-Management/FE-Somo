import { Space } from 'antd'

export const columns = [
  {
    title: 'Tên vườn',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Vùng',
    dataIndex: 'zoneName',
    key: 'zoneName',
  },
  {
    title: 'Diện tích',
    dataIndex: 'area',
    key: 'area',
  },

  {
    title: 'Hệ',
    dataIndex: 'status',
    key: 'status',
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

export const onChange = (sorter) => {
  console.log('params', sorter)
}
