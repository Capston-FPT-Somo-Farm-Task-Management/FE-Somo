import { Button } from 'antd'

const AddMember = () => {
  return (
    <>
      <div className="animal-group-content content">
        <h3>Nhân sự</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button
              type="primary"
              // onClick={openModal}
            >
              Thêm nhân sự
            </Button>

            {/* <FormAddArea
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreate={onFinishCreate}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default AddMember
