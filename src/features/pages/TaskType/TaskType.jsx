import { getMemberById } from 'features/slice/user/memberSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authServices } from 'services/authServices'
import AddTaskType from './AddTaskType'
import DisplayTaskType from './DisplayTaskType'
import {
  createTaskType,
  getTaskType,
  updateTaskType,
} from 'features/slice/task/taskTypeSlice'
import { getTaskTypeTemplate } from 'features/slice/task/taskTypeTemplate'
import { getTaskTypeExcel } from 'features/slice/task/taskTypeExcelSlice'

const TaskType = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const taskType = useSelector((state) => state.taskType.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getTaskType())
  }, [dispatch, farmId])

  const getTemplate = () => {
    dispatch(getTaskTypeTemplate())
  }

  const getTaskTypeByExcel = () => {
    dispatch(getTaskTypeExcel())
  }

  const onFinishCreateTaskType = (values) => {
    dispatch(createTaskType(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdateTaskType = (values) => {
    dispatch(updateTaskType(values)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getTaskType())
  }

  return (
    <>
      <AddTaskType
        onFinishCreateTaskType={onFinishCreateTaskType}
        getTemplate={getTemplate}
        getTaskTypeByExcel={getTaskTypeByExcel}
      />
      <DisplayTaskType
        taskType={taskType}
        onFinishUpdateTaskType={onFinishUpdateTaskType}
        loadData={loadData}
      />
    </>
  )
}

export default TaskType
