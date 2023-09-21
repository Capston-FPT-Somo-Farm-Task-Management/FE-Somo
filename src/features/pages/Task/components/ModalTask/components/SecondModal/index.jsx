import React from 'react'

function SecondModal({ type }) {
  if (type === 'planting') {
    return (
      <div>
        <p>Chọn cây trồng cụ thể hoặc cà vườn</p>
        {/* Thêm các options cho trồng trọt */}
      </div>
    );
  } else if (type === 'livestock') {
    return (
      <div>
        <p>Chọn con vật cụ thể hoặc cả chuồng</p>
        {/* Thêm các options cho chăn nuôi */}
      </div>
    );
  }

  return null;
}

export default SecondModal