import dayjs from 'dayjs';


export const taskTitle = [
  {
    title: 'Tên nhiệm vụ',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4 className="task-name" data-name-clicked="true">{text}</h4>,
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (text) => dayjs(text).format('HH:mm DD/MM/YYYY'),
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'endDate',
    key: 'endDate',
    render: (text) => dayjs(text).format('HH:mm DD/MM/YYYY'),
  },
  {
    title: 'Ưu tiên',
    dataIndex: 'priority',
    key: 'priority',
    sorter: (a, b) => a.priority - b.priority,
  },
  {
    title: 'Giao cho',
    dataIndex: 'employeeName',
    key: 'employeeName',
  },
  {
    title: 'Vị trí',
    dataIndex: 'fieldName',
    key: 'fieldName',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },

]

export const onChange = (sorter) => {
  console.log('params', sorter)
}
