import { Badge, Tabs } from 'antd'
import NotificationIsNew from './NotificationIsNew'
import NotificationAll from './NotificationAll'

const DisplayNotification = ({ countNew, changeStatusNotify }) => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={[
          {
            key: '1',
            label: 'Tất cả',
            children: (
              <NotificationAll changeStatusNotify={changeStatusNotify} />
            ),
          },
          {
            key: '2',
            label:
              // countNew?.data !== 0 ? (
              //   <Badge count={countNew?.data}>Chưa đọc</Badge>
              // ) : (
              //   'Chưa đọc'
              // ),
              'Chưa đọc',
            children: (
              <NotificationIsNew changeStatusNotify={changeStatusNotify} />
            ),
          },
        ]}
      />
    </>
  )
}
export default DisplayNotification
