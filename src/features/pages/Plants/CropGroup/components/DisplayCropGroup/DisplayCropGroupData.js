import { Tag, Space, Table } from 'antd'

export const columns = [
  {
    title: 'Tên vườn',
    dataIndex: 'nameCropGroup',
    key: 'nameCropGroup',
    render: (text) => <h4>{text}</h4>,
  },

  {
    title: 'Số lượng cây trong vườn',
    dataIndex: 'quantityCropInGroup',
    key: 'quantityCropInGroup',
  },
  //   {
  //     title: 'Trạng thái',
  //     key: 'status',
  //     dataIndex: 'status',
  //     filters: [
  //       {
  //         text: 'Sống',
  //         value: 'Sống',
  //       },
  //       {
  //         text: 'Đã mất',
  //         value: 'Đã mất',
  //       },
  //     ],
  //     onFilter: (value, record) => record.status.indexOf(value) === 0,
  //     render: (_, { status }) => (
  //       <>
  //         {status.map((status) => {
  //           let color = status === 'Sống' ? 'green' : 'volcano'
  //           return (
  //             <Tag color={color} key={status}>
  //               {status.toUpperCase()}
  //             </Tag>
  //           )
  //         })}
  //       </>
  //     ),
  //   },
  //   Table.SELECTION_COLUMN,
  //   {
  //     title: 'Tuỳ chọn',
  //     key: 'action',
  //     render: (_, record) => (
  //       <Space size="small">
  //         <a>Xoá</a>
  //         <a>Sửa</a>
  //         <a>Khác</a>
  //       </Space>
  //     ),
  //   },
]

export const onChange = (pagination, filters, sorter, extra, sorterStatus) => {
  console.log('params', pagination, filters, sorter, extra, sorterStatus)
}
export const data = [
  {
    key: '1',
    nameCropGroup: 'Gà',
    quantityCropInGroup: 8,
    // type: 'Gà công nghiệp',
    // status: ['Sống'],
  },
  {
    key: '2',
    nameCropGroup: 'Bò',
    quantityCropInGroup: 9,
    // type: 'Bò sữa',
    // status: ['Đã mất'],
  },
  {
    key: '3',
    nameCropGroup: 'Heo',
    quantityCropInGroup: 10,
    // type: 'Heo rừng',
    // status: ['Sống'],
  },
  {
    key: '4',
    nameCropGroup: 'Vịt',
    quantityCropInGroup: 12,
    // type: 'Vịt trời',
    // status: ['Sống'],
  },
  {
    key: '5',
    nameCropGroup: 'Thỏ',
    quantityCropInGroup: 4,
    // type: 'Bò sữa',
    // status: ['Đã mất'],
  },
  {
    key: '6',
    nameCropGroup: 'Nai',
    quantityCropInGroup: 5,
    // type: 'Nai rừng',
    // status: ['Sống'],
  },
  {
    key: '7',
    nameCropGroup: 'Cừu',
    quantityCropInGroup: 8,
    // type: 'Cừu Mỹ',
    // status: ['Sống'],
  },
  {
    key: '8',
    nameCropGroup: 'Chim Cút',
    quantityCropInGroup: 17,
    // type: 'Cút rừng',
    // status: ['Đã mất'],
  },
  {
    key: '9',
    nameCropGroup: 'Dê',
    quantityCropInGroup: 19,
    // type: 'Dê núi',
    // status: ['Sống'],
  },
  {
    key: '10',
    nameCropGroup: 'Chồn',
    quantityCropInGroup: 13,
    // type: 'Chồn hương',
    // status: ['Sống'],
  },
  {
    key: '11',
    nameCropGroup: 'Nhím',
    quantityCropInGroup: 3,
    // type: 'Nhím rừng',
    // status: ['Đã mất'],
  },
  {
    key: '12',
    nameCropGroup: 'Rắn',
    quantityCropInGroup: 14,
    // type: 'Rắn nước',
    // status: ['Sống'],
  },
]
