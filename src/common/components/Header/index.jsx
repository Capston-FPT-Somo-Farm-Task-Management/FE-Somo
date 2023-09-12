import React, { useState } from "react";
import LogoSomo from "../../../assets/logo_Somo.png"
import { CaretDownOutlined, SearchOutlined  } from "@ant-design/icons";
import { Dropdown, Space, Select } from "antd";

function Header() {
  const SearchInput = (props) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();
    const handleSearch = (newValue) => {
      fetch(newValue, setData);
    };
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    return (
      <Select
        showSearch
        value={value}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={(data || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
      />
    );
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const items = [
    {
      label: <a href="https://www.antgroup.com">Hồ sơ</a>,
      key: "0",
    },
    {
      label: "Đăng xuất",
      key: "3",
    },
  ];

  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  return (
    <nav className="navBar">
      <div className="navLeft">
        <div className="logo">
          <img src={LogoSomo} alt="" />
        </div>
        <div className="searchBar">
          <SearchInput
            placeholder={<div><SearchOutlined style={{ marginRight: "8px" }} />
          Tìm kiếm</div>}
            
            style={{
              width: 300,
              textAlign: "left",
              marginLeft: "15px"
            }}
          />
        </div>
      </div>

      <div className="navRight">
        <div className="quickAdd">
          <Select
            defaultValue="quickadd"
            style={{
              width: 150,
            }}
            onChange={handleChange}
            options={[
              {
                options: [
                  {
                    label: "Chọn nhanh",
                    value: "quickadd",
                  },
                ],
              },
              {
                label: "Chăn nuôi",
                options: [
                  {
                    label: "Cho ăn",
                    value: "jack",
                  },
                  {
                    label: "Tắm",
                    value: "lucy",
                  },
                ],
              },
              {
                label: "Trồng trọt",
                options: [
                  {
                    label: "Tưới cây",
                    value: "Yiminghe",
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="profile">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Trình Nguyễn Khánh
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className="language">
          <Select
            defaultValue="lightmode"
            style={{
              width: 150,
            }}
            onChange={handleChange}
            options={[
              {
                options: [
                  {
                    label: "Giao diện sáng",
                    value: "lightmode",
                  },
                  {
                    label: "Giao diện tối",
                    value: "darkmode",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
