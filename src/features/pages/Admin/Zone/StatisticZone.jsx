import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import TableZone from './TableZone'
import { useDispatch, useSelector } from 'react-redux'
import { getZoneByFarmId } from 'features/slice/zone/zoneByFarmSlice'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useEffect } from 'react'
import { authServices } from 'services/authServices'
import { adminDeleteZone } from 'features/slice/zone/zoneSlice'
import ChartZone from './ChartZone'
import PieChartZone from './PieChartZone'

const StatisticZone = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = member.farmId
  const zoneByFarm = useSelector((state) => state.zoneByFarm.data)

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getZoneByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteZone(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getZoneByFarmId(farmId))
  }

  // --------Count------------
  //zone
  const filterActiveZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const activeZones = zoneByFarm.data.filter(
        (zone) => zone.status === 'Active'
      )
      return activeZones.length
    }
    return 0
  }
  const activeZoneCount = filterActiveZones(zoneByFarm)
  const inActiveZoneCount = zoneByFarm?.data?.length - activeZoneCount

  // zoneType
  const filterAnimalZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const animalZones = zoneByFarm.data.filter(
        (area) => area.zoneTypeName === 'Chăn nuôi'
      )
      return animalZones.length
    }
    return 0
  }
  const animalZoneCount = filterAnimalZones(zoneByFarm)

  const filterPlantZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const plantZones = zoneByFarm.data.filter(
        (area) => area.zoneTypeName === 'Trồng trọt'
      )
      return plantZones.length
    }
    return 0
  }
  const plantZoneCount = filterPlantZones(zoneByFarm)

  const otherZoneCount =
    zoneByFarm?.data?.length - (animalZoneCount + plantZoneCount)

  // -------------------------Chart-------------------------------
  // Vùng chăn nuôi
  const filterActiveAnimalZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const zones = zoneByFarm.data.filter(
        (zone) => zone.status === 'Active' && zone.zoneTypeName === 'Chăn nuôi'
      )
      return zones.length
    }
    return 0
  }
  const activeAnimalZoneCount = filterActiveAnimalZones(zoneByFarm) //Mở
  const inActiveAnimalZoneCount = animalZoneCount - activeAnimalZoneCount //Đóng

  // Vùng trồng trọt
  const filterActivePlantZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const zones = zoneByFarm.data.filter(
        (zone) => zone.status === 'Active' && zone.zoneTypeName === 'Trồng trọt'
      )
      return zones.length
    }
    return 0
  }
  const activePlantZoneCount = filterActivePlantZones(zoneByFarm) //Mở
  const inActivePlantZoneCount = plantZoneCount - activePlantZoneCount //Đóng

  // Khác
  const filterActiveOtherZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const zones = zoneByFarm.data.filter(
        (zone) => zone.status === 'Active' && zone.zoneTypeName === 'Khác'
      )
      return zones.length
    }
    return 0
  }
  const activeOtherZoneCount = filterActiveOtherZones(zoneByFarm) //Mở
  const inActiveOtherZoneCount = otherZoneCount - activeOtherZoneCount //Đóng

  return (
    <>
      <DisplayCard
        zoneByFarm={zoneByFarm}
        activeZoneCount={activeZoneCount}
        inActiveZoneCount={inActiveZoneCount}
        animalZoneCount={animalZoneCount}
        plantZoneCount={plantZoneCount}
        otherZoneCount={otherZoneCount}
      />
      <Divider dashed />
      {/* <ChartZone
        activeAnimalZoneCount={activeAnimalZoneCount}
        inActiveAnimalZoneCount={inActiveAnimalZoneCount}
        activePlantZoneCount={activePlantZoneCount}
        inActivePlantZoneCount={inActivePlantZoneCount}
        activeOtherZoneCount={activeOtherZoneCount}
        inActiveOtherZoneCount={inActiveOtherZoneCount}
      /> */}
      <PieChartZone
        activeAnimalZoneCount={activeAnimalZoneCount}
        activePlantZoneCount={activePlantZoneCount}
        activeOtherZoneCount={activeOtherZoneCount}
      />
      <TableZone zoneByFarm={zoneByFarm} onFinishDelete={onFinishDelete} />
    </>
  )
}

export default StatisticZone
