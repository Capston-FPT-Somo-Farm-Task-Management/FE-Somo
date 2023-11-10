import { Badge, Button, Popconfirm, Table } from 'antd'
import Column from 'antd/es/table/Column'

const TableCropGroup = ({ fieldPlant, onFinishDelete }) => {
  return (
    <>
      <Table
        dataSource={fieldPlant ? fieldPlant.data : null}
        rowKey="id"
        locale={{ emptyText: 'Chưa có vườn nào' }}
      >
        <Column
          title="Tên vườn"
          dataIndex="name"
          key="1"
          render={(text) => <h4>{text}</h4>}
        />
        <Column title="Mã vườn" dataIndex="code" key="2" />
        <Column title="Diện tích" dataIndex="area" key="3" />
        <Column title="Vùng" dataIndex="zoneName" key="4" />
        <Column title="Khu vực" dataIndex="areaName" key="5" />

        <Column
          title="Trạng thái"
          dataIndex="isDelete"
          key="5"
          render={(isDelete) =>
            isDelete === false ? (
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
              title="Xoá vườn"
              description="Bạn có chắc muốn xoá vườn này?"
              onConfirm={() => onFinishDelete(record.id)}
              // onCancel={cancel}
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
export default TableCropGroup
