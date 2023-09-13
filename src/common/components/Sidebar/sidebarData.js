import React from "react";
import { ScheduleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { faMap  } from '@fortawesome/free-regular-svg-icons';

export function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
export const menuItem = [
    getItem('Lịch trình', 'sub1', <ScheduleOutlined />),
    getItem('Nhiệm vụ', 'sub2', <CheckCircleOutlined />),
    getItem('Chăn nuôi', 'sub3', <FontAwesomeIcon icon={faHorseHead} />, [
      getItem('Động vật', '1'),
      getItem('Chăn nuôi bầy đàn', '2'),
      getItem('Chăn thả', '3'),
    ]),
    getItem('Trồng trọt', 'sub4', <FontAwesomeIcon icon={faSeedling} />, [
      getItem('Cây trồng của tôi', '4'),
      getItem('Vị trí phát triển', '5'),
      getItem('Kế hoạch trồng trọt', '6'),
      getItem('Vị trí trồng trọt', '7'),
      getItem('So sánh năng xuất', '8'),
    ]),
    getItem('Bản đồ trang trại', 'sub5', <FontAwesomeIcon icon={faMap} />),
  ];

export const rootSubmenuKeys = ['sub3', 'sub4'];