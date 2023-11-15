import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import FormAddZone from '../FormAddZone/FormAddZone'

const AddZone = ({ onFinishCreateZone, areaByFarm, zoneType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="animal-group-content content">
        <h3>Vùng</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm vùng
            </Button>

            <FormAddZone
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreateZone={onFinishCreateZone}
              areaByFarm={areaByFarm}
              zoneType={zoneType}
            />
          </div>

          <div className="animal-group-operate-right">
            <Search
              placeholder="Tìm kiếm"
              allowClear
              style={{
                marginLeft: '15px',
                width: 300,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddZone
