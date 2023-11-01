import { getEmployeeByFarmId } from 'features/slice/employee/employeeByFarmSlice'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useDispatch } from 'react-redux'
import DisplayEmployee from './components/DisplayEmployee/DisplayEmployee'
import AddEmployee from './components/AddEmployee/AddEmployee'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'

const Employee = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const employeeByFarm = useSelector((state) => state.employeeByFarm.data)
  const farmId = member.farmId

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getEmployeeByFarmId(farmId))
  }, [dispatch])

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

  //   const onFinishDelete = (id) => {
  //     dispatch(deleteArea(id)).then(() => {
  //       loadData()
  //     })
  //   }

  const loadData = () => {
    dispatch(getEmployeeByFarmId(farmId))
  }

  return (
    <>
      <AddEmployee />
      <DisplayEmployee employeeByFarm={employeeByFarm} />
    </>
  )
}
export default Employee
