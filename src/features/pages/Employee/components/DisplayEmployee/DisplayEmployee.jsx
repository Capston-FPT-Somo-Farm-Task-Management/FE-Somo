import { Badge, Button, Skeleton, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import UpdateEmployee from './UpdateEmployee'
import DetailEmployee from './DetailEmployee'
import { getEmployeeById } from 'features/slice/employee/employeeSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const DisplayEmployee = ({
  employeeByFarm,
  onFinishDelete,
  onFinishUpdate,
  searchTerm,
  loadData,
  taskTypeActive,
  farmId,
  loading,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const employeeById = useSelector((state) => state.employee.data)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  useEffect(() => {
    if (selectedData) {
      dispatch(getEmployeeById(selectedData.id)).then(() => {
        loadData()
      })
    }
  }, [selectedData, dispatch])

  const openModal = async (record) => {
    await dispatch(getEmployeeById(record.id)).then(() => {
      loadData()
    })
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedData(null)
  }

  // Detail

  const openModalDetail = (record) => {
    setSelectedDataDetail(record)
    setIsModalDetailOpen(true)
  }
  const closeModalDetail = () => {
    setSelectedDataDetail(null)
    setIsModalDetailOpen(false)
  }

  const searchEmployee = employeeByFarm
    ? employeeByFarm?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Table rowKey="id" dataSource={searchEmployee}>
            <Column
              title="Tên nhân viên"
              dataIndex="name"
              key="1"
              render={(text, record) => (
                <h4
                  onClick={() => openModalDetail(record)}
                  style={{ cursor: 'pointer' }}
                >
                  {text}
                </h4>
              )}
            />
            <Column title="Mã nhân viên" dataIndex="code" key="2" />
            {/* <Column title="Loại nhiệm vụ" dataIndex="taskTypeName" key="3" /> */}
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="3"
              filters={[
                { text: 'Đang làm việc', value: 'Đang làm việc' },
                { text: 'Không làm việc', value: 'Không làm việc' },
              ]}
              onFilter={(value, record) => record.status.indexOf(value) === 0}
              render={(status) =>
                status === 'Đang làm việc' ? (
                  <Badge status="success" text="Đang làm việc" />
                ) : (
                  <Badge status="error" text="Không làm việc" />
                )
              }
            />
            <Column
              title="Đổi trạng thái"
              key="6"
              dataIndex="id"
              render={(_, record) => (
                <Button
                  size="middle"
                  danger
                  onClick={() => onFinishDelete(record.id)}
                >
                  Đổi
                </Button>
              )}
            />
            <Column
              title="Cập nhật"
              key="7"
              dataIndex="id"
              render={(_, record) => (
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => openModal(record)}
                >
                  Cập nhật
                </Button>
              )}
            />
          </Table>

          <DetailEmployee
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />

          <UpdateEmployee
            key={selectedData ? selectedData.id : null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            employeeById={employeeById}
            taskTypeActive={taskTypeActive}
            selectedData={selectedData}
            onFinishUpdate={onFinishUpdate}
          />
        </>
      )}
    </>
  )
}
export default DisplayEmployee
