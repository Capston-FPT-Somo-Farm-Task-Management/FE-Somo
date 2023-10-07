import { Space } from 'antd'
import TableDisplayCrop from './TableDisplayCrop'
import TableDisplayCropType from './TableDisplayCropType'

export const columnsCrop = [
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

// Tabs

export const itemTabs = [
  {
    key: '1',
    label: 'Cây trồng',
    children: <TableDisplayCrop />,
  },
  {
    key: '2',
    label: 'Loại cây trồng',
    children: <TableDisplayCropType />,
  },
]

// CropType

export const columnsCropType = [
  {
    title: 'Tên loại cây trồng',
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
