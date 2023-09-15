import { Link } from 'react-router-dom'

export const quickAdd = [
  {
    options: [
      {
        label: 'Thêm nhanh',
        value: 'quickAdd',
      },
    ],
  },
  {
    label: 'Chăn nuôi',
    options: [
      {
        label: 'Cho ăn',
        value: 'feed',
      },
      {
        label: 'Tắm',
        value: 'bath',
      },
    ],
  },
  {
    label: 'Trồng trọt',
    options: [
      {
        label: 'Tưới cây',
        value: 'Yiminghe',
      },
    ],
  },
]

export const themeMode = [
  {
    options: [
      {
        label: 'Giao diện sáng',
        value: 'lightMode',
      },
      {
        label: 'Giao diện tối',
        value: 'darkMode',
      },
    ],
  },
]

export const userDropdown = [
  {
    key: '1',
    label: (
      <a target="_blank" href="https://www.antgroup.com">
        Hồ sơ
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Đăng xuất
      </a>
    ),
  },
  {
    key: '3',
    label: <Link to="/login">Đăng nhập</Link>,
  },
]

export const userName = 'Nguyễn Khánh Trình'
