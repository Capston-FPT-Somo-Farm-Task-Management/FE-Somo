import { Button } from 'antd'
import Search from 'antd/es/input/Search'

const AddMember = () => {
  return (
    <>
      <div className="animal-group-content content">
        <h3>Thành viên</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button
              type="primary"
              // onClick={openModal}
            >
              Thêm thành viên
            </Button>

            {/* <FormAddArea
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreate={onFinishCreate}
            /> */}
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
export default AddMember
