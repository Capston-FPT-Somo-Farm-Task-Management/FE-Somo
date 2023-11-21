import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Divider } from 'antd'
import TableMaterial from './TableMaterial'
import {
  adminDeleteMaterial,
  getMaterialByFarmId,
} from 'features/slice/material/materialSlice'
import DisplayCard from './DisplayCard'

const StatisticMaterial = () => {
  const dispatch = useDispatch()
  const material = useSelector((state) => state.material.data)
  const loading = useSelector((state) => state.material.loading)

  const farmId = localStorage.getItem('farmId')

  useEffect(() => {
    dispatch(getMaterialByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteMaterial(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getMaterialByFarmId(farmId))
  }

  // Count
  const filterActiveMaterials = (material) => {
    if (material && material.data) {
      const activeMaterials = material.data.filter(
        (mate) => mate.status === 'Hiện'
      )
      return activeMaterials.length
    }
    return 0
  }
  const activeMaterialCount = filterActiveMaterials(material)
  const inActiveMaterialCount = material?.data?.length - activeMaterialCount

  return (
    <>
      <DisplayCard
        activeMaterialCount={activeMaterialCount}
        inActiveMaterialCount={inActiveMaterialCount}
      />
      <Divider dashed />
      <TableMaterial
        material={material}
        onFinishDelete={onFinishDelete}
        loading={loading}
      />
    </>
  )
}
export default StatisticMaterial
