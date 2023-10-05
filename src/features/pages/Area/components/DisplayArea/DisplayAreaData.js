import { Space } from 'antd'

export const columns = [
  {
    title: 'Tên khu vực',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Diện tích',
    dataIndex: 'fArea',
    key: 'fArea',
  },
  {
    title: 'Trạng thái',
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
