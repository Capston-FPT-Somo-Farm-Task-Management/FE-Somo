import { getFarm } from 'features/slice/farm/farmSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import DisplayFarm from './DisplayFarm'

const StatisticFarm = () => {
  const dispatch = useDispatch()
  const farm = useSelector((state) => state.farm.data)
  useEffect(() => {
    dispatch(getFarm())
  }, [dispatch])

  return (
    <>
      <DisplayFarm farm={farm} />
    </>
  )
}
export default StatisticFarm
