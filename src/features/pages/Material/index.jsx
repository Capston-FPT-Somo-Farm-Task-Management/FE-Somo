import { useDispatch } from 'react-redux'
import AddMaterial from './components/AddMaterial/AddMaterial'
import DisplayMaterial from './components/DisplayMaterial/DisplayMaterial'
import { useSelector } from 'react-redux'
import {
  createMaterial,
  deleteMaterial,
  getMaterial,
  updateMaterial,
} from 'features/slice/material/materialSlice'
import { useEffect } from 'react'

const Material = () => {
  const dispatch = useDispatch()
  const material = useSelector((state) => state.material.data)

  useEffect(() => {
    dispatch(getMaterial())
  }, [dispatch])

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
    dispatch(getMaterial())
  }

  return (
    <>
      <AddMaterial onFinishCreate={onFinishCreate} />
      <DisplayMaterial
        material={material}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default Material
