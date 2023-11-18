import { useState } from 'react'
import FormAddPlantType from './FormAddPlantType'
import { Button } from 'antd'
import Search from 'antd/es/input/Search'

const AddPlantType = ({ farmId, onFinishCreatePlantType, handleSearch }) => {
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModalType = () => {
    setIsModalOpenType(true)
  }

  const closeModalType = () => {
    setIsModalOpenType(false)
  }

  return (
    <>
      <div className="plant-content content">
        <h3>Loại cây trồng</h3>

        <div className="plant-operate">
          <div className="plant-operate-left">
            {/* Add Plant Type */}
            <Button type="primary" onClick={openModalType}>
              Tạo mới loại cây
            </Button>
            <FormAddPlantType
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
              onFinishCreatePlantType={onFinishCreatePlantType}
              farmId={farmId}
            />
          </div>

          <div className="plant-operate-right">
            <Search
              placeholder="Tìm kiếm"
              allowClear
              style={{
                marginLeft: '15px',
                width: 300,
              }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddPlantType
