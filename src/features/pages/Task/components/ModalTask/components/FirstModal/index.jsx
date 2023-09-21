import React from 'react';

function FirstModal({ onNext }) {
  const handleSelection = (type) => {
    onNext(type);
  };

  return (
    <div>
      <button onClick={() => handleSelection('livestock')}>Chăn nuôi</button>
      <button onClick={() => handleSelection('planting')}>Trồng trọt</button>
    </div>
  );
}

export default FirstModal;