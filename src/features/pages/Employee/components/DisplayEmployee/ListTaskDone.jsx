import { Button, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTaskDoneByEmployeeId } from 'features/slice/task/taskDoneSlice'
import { useSelector } from 'react-redux'
const ListTaskDone = ({ toggleTaskList, selectedDataDetail }) => {
  const taskDone = useSelector((state) => state.taskDone.data)
  const dispatch = useDispatch()

  console.log(taskDone)

  useEffect(() => {
    dispatch(
      getTaskDoneByEmployeeId({
        startDay: '',
        endDay: '',
        pageIndex: 1,
        employeeId: selectedDataDetail.id,
      })
    )
  }, [dispatch, selectedDataDetail])

  return (
    <div>
      <Button type="default" onClick={toggleTaskList}>
        <ArrowLeftOutlined />
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={taskDone}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item?.name}</a>}
              description={item?.statusTaskType}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
export default ListTaskDone
