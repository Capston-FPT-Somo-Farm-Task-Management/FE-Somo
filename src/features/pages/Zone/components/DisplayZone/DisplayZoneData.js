import { Space } from 'antd'

export const columns = [
  {
    title: 'Tên vùng',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Loại vùng',
    dataIndex: 'zoneTypeName',
    key: 'zoneTypeName',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Thuộc khu vực',
    dataIndex: 'areaName',
    key: 'areaName',
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
