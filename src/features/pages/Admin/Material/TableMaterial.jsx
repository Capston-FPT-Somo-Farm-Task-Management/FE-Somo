import { Badge, Button, Image, Popconfirm, Table } from 'antd'
import Column from 'antd/es/table/Column'

const TableMaterial = ({ material, onFinishDelete }) => {
  return (
    <>
      <Table
        rowKey="id"
        dataSource={material ? material.data : null}
        locale={{ emptyText: 'Chưa có công cụ nào' }}
      >
        <Column title="Tên công cụ" dataIndex="name" key="1" />
        <Column
          title="Hình ảnh"
          dataIndex="urlImage"
          key="2"
          render={(text, record) => <Image width={50} src={record.urlImage} />}
        />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="3"
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
          key="4"
          dataIndex="id"
          render={(_, record) => (
            <Popconfirm
              title="Xoá công cụ"
              description="Bạn có chắc muốn xoá công cụ này?"
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
export default TableMaterial
