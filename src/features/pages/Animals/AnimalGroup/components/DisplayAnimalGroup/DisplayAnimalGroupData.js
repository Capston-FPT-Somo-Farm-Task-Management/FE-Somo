import { Tag, Space, Table } from 'antd'

export const columns = [
  {
    title: 'Tên chuồng',
    dataIndex: 'nameAnimalGroup',
    key: 'nameAnimalGroup',
    render: (text) => <h4>{text}</h4>,
  },

  {
    title: 'Số lượng vật nuôi trong chuồng',
    dataIndex: 'quantityAnimalInGroup',
    key: 'quantityAnimalInGroup',
  },
]

export const onChange = (pagination, filters, sorter, extra, sorterStatus) => {
  console.log('params', pagination, filters, sorter, extra, sorterStatus)
}
export const data = [
  {
    key: '1',
    nameAnimalGroup: 'Gà',
    quantityAnimalInGroup: 8,
    // type: 'Gà công nghiệp',
    // status: ['Sống'],
  },
  {
    key: '2',
    nameAnimalGroup: 'Bò',
    quantityAnimalInGroup: 9,
    // type: 'Bò sữa',
    // status: ['Đã mất'],
  },
  {
    key: '3',
    nameAnimalGroup: 'Heo',
    quantityAnimalInGroup: 10,
    // type: 'Heo rừng',
    // status: ['Sống'],
  },
  {
    key: '4',
    nameAnimalGroup: 'Vịt',
    quantityAnimalInGroup: 12,
    // type: 'Vịt trời',
    // status: ['Sống'],
  },
  {
    key: '5',
    nameAnimalGroup: 'Thỏ',
    quantityAnimalInGroup: 4,
    // type: 'Bò sữa',
    // status: ['Đã mất'],
  },
  {
    key: '6',
    nameAnimalGroup: 'Nai',
    quantityAnimalInGroup: 5,
    // type: 'Nai rừng',
    // status: ['Sống'],
  },
  {
    key: '7',
    nameAnimalGroup: 'Cừu',
    quantityAnimalInGroup: 8,
    // type: 'Cừu Mỹ',
    // status: ['Sống'],
  },
  {
    key: '8',
    nameAnimalGroup: 'Chim Cút',
    quantityAnimalInGroup: 17,
    // type: 'Cút rừng',
    // status: ['Đã mất'],
  },
  {
    key: '9',
    nameAnimalGroup: 'Dê',
    quantityAnimalInGroup: 19,
    // type: 'Dê núi',
    // status: ['Sống'],
  },
  {
    key: '10',
    nameAnimalGroup: 'Chồn',
    quantityAnimalInGroup: 13,
    // type: 'Chồn hương',
    // status: ['Sống'],
  },
  {
    key: '11',
    nameAnimalGroup: 'Nhím',
    quantityAnimalInGroup: 3,
    // type: 'Nhím rừng',
    // status: ['Đã mất'],
  },
  {
    key: '12',
    nameAnimalGroup: 'Rắn',
    quantityAnimalInGroup: 14,
    // type: 'Rắn nước',
    // status: ['Sống'],
  },
]
