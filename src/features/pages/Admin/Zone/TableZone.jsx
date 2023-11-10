import { Badge, Button, Popconfirm, Table } from 'antd'
import Column from 'antd/es/table/Column'

const TableZone = ({ zoneByFarm, onFinishDelete }) => {
  return (
    <>
      <Table
        rowKey="id"
        dataSource={zoneByFarm ? zoneByFarm.data : null}
        locale={{ emptyText: 'Chưa có vùng nào' }}
        style={{ margin: '0 20px' }}
      >
        <Column title="Tên vùng" dataIndex="name" key="1" />
        <Column title="Mã vùng" dataIndex="code" key="2" />
        <Column title="Diện tích" dataIndex="farmArea" key="3" />
        <Column title="Loại vùng" dataIndex="zoneTypeName" key="4" />
        <Column title="Tên khu vực" dataIndex="areaName" key="5" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="6"
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
          key="7"
          dataIndex="id"
          render={(_, record) => (
            <Popconfirm
              title="Xoá vùn"
              description="Bạn có chắc muốn xoá vùng này?"
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
export default TableZone
