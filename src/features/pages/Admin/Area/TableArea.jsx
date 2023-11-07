import { Badge, Button, Popconfirm, Table } from 'antd'
import Column from 'antd/es/table/Column'

const TableArea = ({ areaByFarm, onFinishDelete }) => {
  return (
    <>
      <Table
        rowKey="id"
        dataSource={areaByFarm ? areaByFarm.data : null}
        locale={{ emptyText: 'Chưa có khu vực' }}
      >
        <Column title="Tên khu vực" dataIndex="name" key="1" />
        <Column title="Mã khu vực" dataIndex="code" key="2" />
        <Column title="Diện tích" dataIndex="fArea" key="3" />
        <Column title="Tên trang trại" dataIndex="farmName" key="4" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="5"
          render={(status) =>
            status === 'Active' ? (
              <Badge status="success" text="Active" />
            ) : (
              <Badge status="error" text="Inactive" />
            )
          }
        />
        <Column
          title="Xoá"
          key="6"
          dataIndex="id"
          render={(_, record) => (
            <Popconfirm
              title="Xoá khu vực"
              description="Bạn có chắc muốn xoá khu vực này?"
              onConfirm={() => onFinishDelete(record.id)}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <Button size="middle" danger>
                Xoá
              </Button>
            </Popconfirm>
          )}
        />
      </Table>
    </>
  )
}
export default TableArea
