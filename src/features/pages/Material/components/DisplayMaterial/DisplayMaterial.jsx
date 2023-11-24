import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Image,
  Row,
  Skeleton,
  Space,
  Table,
} from 'antd'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import UpdateMaterial from './UpdateMaterial'
import { getMaterialById } from 'features/slice/material/materialById'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import DetailMaterial from './DetailMaterial'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import { style } from '@mui/system'

const DisplayMaterial = ({
  material,
  onFinishDelete,
  onFinishUpdate,
  farmId,
  loadData,
  searchTerm,
  loading,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const materialById = useSelector((state) => state.materialById.data)

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
  const [selectedDataDetail, setSelectedDataDetail] = useState(null)

  useEffect(() => {
    if (selectedData) {
      dispatch(getMaterialById(selectedData.id)).then(() => {
        loadData()
      })
    }
  }, [selectedData, dispatch])

  const openModal = async (record) => {
    await dispatch(getMaterialById(record.id)).then(() => {
      loadData()
    })
    setSelectedData(record)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedData(null)
    setIsModalOpen(false)
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

  const searchMaterial = material
    ? material?.data?.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Table rowKey="id" dataSource={searchMaterial}>
            <Column
              title="Tên công cụ"
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
            <Column
              title="Hình ảnh"
              dataIndex="urlImage"
              key="2"
              render={(text, record) => (
                <Image width={50} src={record.urlImage} />
              )}
            />
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="3"
              filters={[
                { text: 'Hiện', value: 'Hiện' },
                { text: 'Ẩn', value: 'Ẩn' },
              ]}
              onFilter={(value, record) => record.status.indexOf(value) === 0}
              render={(status) =>
                status === 'Hiện' ? (
                  <Badge status="success" text="Hiện" />
                ) : (
                  <Badge status="error" text="Ẩn" />
                )
              }
            />
            <Column
              title="Đổi trạng thái"
              key="4"
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
              key="5"
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

          {/* <Row gutter={[16, 16]} style={{ justifyContent: 'space-around' }}>
        {searchMaterial?.map((mate) => (
          <Col
          xs={14}
          sm={10}
          md={7}
          key={mate.id}
          style={{ marginTop: '10px' }}
          >
          <Card
          key={mate.id}
          cover={
            <img
            alt={mate.name}
            src={mate.urlImage}
            style={{
              width: '100%',
              height: '150px',
              display: 'block',
              objectFit: 'cover',
            }}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
            <Card.Meta
            // avatar={<Avatar src={mate.avatar} />}
            title={mate.name}
            description={mate.description}
            />
            </Card>
            </Col>
            ))}
          </Row> */}

          <DetailMaterial
            key={selectedDataDetail ? selectedDataDetail.id : null}
            isModalDetailOpen={isModalDetailOpen}
            closeModalDetail={closeModalDetail}
            selectedDataDetail={selectedDataDetail}
          />

          <UpdateMaterial
            key={selectedData ? selectedData.id : null}
            materialById={materialById}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            selectedData={selectedData}
            onFinishUpdate={onFinishUpdate}
            farmId={farmId}
          />
        </>
      )}
    </>
  )
}
export default DisplayMaterial
