import React from "react";

function ThirdModal({ option }) {
  if (option === "specificAnimal") {
    return (
      <div>
        <p>Nhập thông tin con vật cụ thể</p>
      </div>
    );
  } else if (option === "wholeBarn") {
    return (
      <div>
        <p>Nhập thông tin chuồng</p>
      </div>
    );
  }  else if (option === "specificPlant") {
    return (
      <div>
        <p>Nhập thông tin cây trồng cụ thể</p>
      </div>
    );
  } else if (option === "wholeGarden") {
    return (
      <div>
        <p>Nhập thông tin vườn</p>
      </div>
    );
  } 
  return null;
}

export default ThirdModal;
