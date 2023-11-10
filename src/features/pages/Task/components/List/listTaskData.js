import dayjs from 'dayjs';


export const taskTitle = [
  {
    title: <p style={{textAlign:"center"}}>Tên công việc</p>,
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (text) => <h4 className="task-name" data-name-clicked="true">{text}</h4>,
  },
  {
    title: <p style={{textAlign:"center"}}>Ngày bắt đầu</p>,
    dataIndex: 'startDate',
    key: 'startDate',
    align: 'center',
    render: (text) => dayjs(text).format('HH:mm DD/MM/YYYY'),
  },
  {
    title: <p style={{textAlign:"center"}}>Ngày kết thúc</p>,
    dataIndex: 'endDate',
    key: 'endDate',
    align: 'center',
    render: (text) => dayjs(text).format('HH:mm DD/MM/YYYY'),
  },
  {
    title: <p style={{textAlign:"center"}}>Ưu tiên</p>,
    dataIndex: 'priority',
    key: 'priority',
    align: 'center',
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
    title: <p style={{textAlign:"center"}}>Người giám sát</p>,
    dataIndex: 'supervisorName',
    key: 'supervisorName',
    align: 'center',
  },
  {
    title: <p style={{textAlign:"center"}}>Được tạo bởi</p>,
    dataIndex: 'managerName',
    key: 'managerName',
    align: 'center',
    render: (text) => (
      <span>
        {text ? <p style={{textAlign: "center"}}>Tôi</p> : <p style={{textAlign: "center"}}>Người giám sát</p>}
      </span>
    ),
  },

]

export const onChange = (sorter) => {
  console.log('params', sorter)
}
