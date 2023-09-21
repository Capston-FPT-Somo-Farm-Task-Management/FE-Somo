import React from 'react'

function SecondModal({ type, onOptionSelect }) {
  const handleOptionSelect = (option) => {
    onOptionSelect(option);
  }
  if (type === 'planting') {
    return (
      <div>
        <button onClick={() => handleOptionSelect("specificPlant")}> Cây trồng cụ thể</button>
        <button onClick={() => handleOptionSelect("wholeGarden")}> Cả vườn</button>
      </div>
    );
  } else if (type === 'livestock') {
    return (
      <div>
        <button onClick={() => handleOptionSelect("specificAnimal")}> Con vật cụ thể</button>
        <button onClick={() => handleOptionSelect("wholeBarn")}> Cả chuồng</button>
      </div>
    );
  }

  return null;
}

export default SecondModal