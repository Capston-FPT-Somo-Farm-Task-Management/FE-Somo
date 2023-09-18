import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { DashOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'

const AddAndSearchAnimals = () => {
  return (
    <>
      <div className="">
        <div className="animal-title">
          <h1>Chăn nuôi</h1>
        </div>

        <div className="group">
          <span className="button-add">
            {/* Add Animal*/}
            <Button type="primary">
              <Link to="new">Tạo mới</Link>
            </Button>

            {/* Add group */}
            <Button type="default">
              <Link to="">Tạo mới theo nhóm</Link>
            </Button>

            <Button type="dashed">
              <Link to="">
                <DashOutlined />
              </Link>
            </Button>
          </span>
          <span className="search-animal">
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
export default AddAndSearchAnimals
