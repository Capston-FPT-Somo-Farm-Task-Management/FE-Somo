import SecondModal from './components/SecondModal/index';
import FirstModal from './components/FirstModal/index';
import ThirdModal from './components/ThirdModal';

export const steps = [

  {
    title: 'Chọn loại công việc',
    content: <FirstModal/>,
  },
  {
    title: 'Chọn loại công việc',
    content: <SecondModal/>,
  },
  {
    title: 'Thêm công việc',
    content: <ThirdModal/>,
  },
]

export const statusItem = [
    {
      label: "Đang làm",
      value: "todo",
    },
    {
      label: "Hoàn thành",
      value: "done",
    },
  ];

export const assignItem = [
    {
      label: "Minh Anh",
      value: "supervisor1",
    },
    {
      label: "Hoàng Vũ",
      value: "supervisor2",
    },
  ];

export const priorityItem = [
    {
      label: "Cao nhất",
      value: "highest",
    },
    {
      label: "Cao",
      value: "high",
    },
    {
      label: "Trung bình",
      value: "medium",
    },
    {
      label: "Thấp",
      value: "low",
    },
    {
      label: "Thấp nhất",
      value: "lowest",
    },
  ];
  
  export const repeatItem = [
    {
      label: "Hàng tuần",
      value: "daily",
    },
    {
      label: "Hàng tháng",
      value: "monthly",
    },
    {
      label: "Hàng năm",
      value: "yearly",
    },
  ];