import { Space } from 'antd'

export const columns = [
  {
    title: 'Tên cây trồng',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: 'Loại cây',
    dataIndex: 'habitantTypeName',
    key: 'habitantTypeName',
  },
  {
    title: 'Mã cây trồng',
    dataIndex: 'externalId',
    key: 'externalId',
    sorter: (a, b) => a.externalId - b.externalId,
  },
  {
    title: 'Vườn',
    dataIndex: 'fieldName',
    key: 'fieldName',
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
