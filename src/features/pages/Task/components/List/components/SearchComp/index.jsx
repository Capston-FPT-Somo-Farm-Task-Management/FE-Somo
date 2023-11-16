import React, { useState, useEffect } from 'react';
import Search from 'antd/es/input/Search';

function SearchComp({ handleSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearchChange(searchTerm);
    }, 100); // Chờ 1 giây sau khi ngừng gõ để gọi hàm getTasks

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearchChange]);

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <Search
      placeholder="Tìm kiếm theo tên"
      allowClear
      onChange={(e) => setSearchTerm(e.target.value)}
      onSearch={onSearch}
      style={{
        marginLeft: '15px',
        width: 500,
      }}
    />
  );
}

export default SearchComp;
