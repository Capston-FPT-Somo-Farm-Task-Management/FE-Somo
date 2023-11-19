import { getEmployeeByFarmId } from 'features/slice/employee/employeeByFarmSlice'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useDispatch } from 'react-redux'
import DisplayEmployee from './components/DisplayEmployee/DisplayEmployee'
import AddEmployee from './components/AddEmployee/AddEmployee'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { authServices } from 'services/authServices'
import { getTaskTypeActive } from 'features/slice/task/taskTypeActiveSlice'
import { deleteEmployee } from 'features/slice/employee/employeeSlice'

const Employee = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const employeeByFarm = useSelector((state) => state.employeeByFarm.data)
  const taskTypeActive = useSelector((state) => state.taskTypeActive.data)

  const farmId = member.farmId

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getEmployeeByFarmId(farmId))
    dispatch(getTaskTypeActive())
  }, [dispatch, farmId])

  //   const onFinishCreate = (values) => {
  //     const finalValues = {
  //       farmId: farmId,
  //       ...values,
  //     }
  //     dispatch(createArea(finalValues)).then(() => {
  //       loadData()
  //     })
  //   }

  //   const onFinishUpdate = (values) => {
  //     const finalValues = {
  //       farmId: farmId,
  //       ...values,
  //     }
  //     dispatch(updateArea(finalValues)).then(() => {
  //       loadData()
  //     })
  //   }

  const onFinishDelete = (id) => {
    dispatch(deleteEmployee(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getEmployeeByFarmId(farmId))
  }

  return (
    <>
      <AddEmployee
        handleSearch={handleSearch}
        farmId={farmId}
        taskTypeActive={taskTypeActive}
      />
      <DisplayEmployee
        taskTypeActive={taskTypeActive}
        onFinishDelete={onFinishDelete}
        employeeByFarm={employeeByFarm}
        searchTerm={searchTerm}
        loadData={loadData}
      />
    </>
  )
}
export default Employee
