import { useDispatch } from 'react-redux'
import AddMaterial from './components/AddMaterial/AddMaterial'
import DisplayMaterial from './components/DisplayMaterial/DisplayMaterial'
import { useSelector } from 'react-redux'
import {
  createMaterial,
  deleteMaterial,
  getMaterialByFarmId,
  updateMaterial,
} from 'features/slice/material/materialSlice'
import { useEffect, useState } from 'react'
import { authServices } from 'services/authServices'
import { getMemberById } from 'features/slice/user/memberSlice'

const Material = () => {
  const dispatch = useDispatch()
  const material = useSelector((state) => state.material.data)
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }
  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getMaterialByFarmId(farmId))
  }, [dispatch, farmId])

  const onFinishCreate = (values) => {
    dispatch(createMaterial(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    dispatch(updateMaterial(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteMaterial(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getMaterialByFarmId(farmId))
  }

  return (
    <>
      <AddMaterial
        onFinishCreate={onFinishCreate}
        farmId={farmId}
        handleSearch={handleSearch}
      />
      <DisplayMaterial
        material={material}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
        farmId={farmId}
        loadData={loadData}
        searchTerm={searchTerm}
      />
    </>
  )
}
export default Material
