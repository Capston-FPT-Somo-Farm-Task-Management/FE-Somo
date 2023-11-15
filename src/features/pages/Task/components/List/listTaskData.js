import dayjs from 'dayjs';


export const taskTitle = [
  {
    title: <p>Mã công việc</p>,
    dataIndex: 'code',
    key: 'code',
    render: (code) => <h4 className="task-name" data-name-clicked="true">#{code}</h4>,
  },
  {
    title: <p>Tên công việc</p>,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h4 className="task-name" data-name-clicked="true">{text}</h4>,
  },
  {
    title: <p>Ngày bắt đầu</p>,
    dataIndex: 'startDate',
    key: 'startDate',
    render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
  },
  {
    title: <p>Ngày kết thúc</p>,
    dataIndex: 'endDate',
    key: 'endDate',
    render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
  },
  {
    title: <p>Ưu tiên</p>,
    dataIndex: 'priority',
    key: 'priority',
    render: (text) => {
      let color = '';
      switch (text) {
        case 'Cao':
          color = '#f94144';
          break;
        case 'Trung bình':
          color = '#fca311';
          break;
        case 'Thấp':
          color = '#90be6d';
          break;
        default:
          color = '';
      }
      return <span style={{ color }}>{text}</span>;
    },
  },
  {
    title: <p>Người giám sát</p>,
    dataIndex: 'supervisorName',
    key: 'supervisorName',
  },
  {
    title: <p>Được tạo bởi</p>,
    dataIndex: 'managerName',
    key: 'managerName',
    render: (text) => (
      <span>
        {text ? <p>Tôi</p> : <p>Người giám sát</p>}
      </span>
    ),
  },

]

export const onChange = (sorter) => {
  console.log('params', sorter)
}
