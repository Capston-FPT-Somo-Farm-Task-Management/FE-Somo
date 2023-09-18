import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Search from 'antd/es/input/Search'

const AddAndSearchAnimalGroup = () => {
  return (
    <>
      <div>
        <div>
          <h1>Chăn nuôi</h1>
        </div>

        <div>
          <span>
            {/* Add group */}
            <Button type="default">
              <Link to="new">Tạo mới theo nhóm</Link>
            </Button>
          </span>
          <span>
            <Search
              placeholder="Tìm kiếm"
              allowClear
              style={{
                marginLeft: '15px',
                width: 300,
              }}
            />
          </span>
        </div>
      </div>
    </>
  )
}
export default AddAndSearchAnimalGroup
