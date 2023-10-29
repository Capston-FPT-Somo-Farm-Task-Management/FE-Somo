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
    render: (text) => {
      let color = '';
      switch (text) {
        case 'Cao nhất':
          color = '#f94144';
          break;
        case 'Cao':
          color = '#f3722c';
          break;
        case 'Trung bình':
          color = '#f9c74f';
          break;
        case 'Thấp':
          color = '#90be6d';
          break;
        case 'Thấp nhất':
          color = '#277da1';
          break;
        default:
          color = '';
      }
      return <span style={{ color }}>{text}</span>;
    },
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
