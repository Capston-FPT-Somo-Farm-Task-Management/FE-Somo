import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorseHead, faSeedling } from "@fortawesome/free-solid-svg-icons";
import {
  faMap,
  faCalendarDays,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

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
  getItem(
    <Link to="/schedule">Lịch trình</Link>,
    "sub1",
    <FontAwesomeIcon icon={faCalendarDays} />,
    null,
    null,
    "/schedule"
  ),
  getItem(<Link to="/task">Nhiệm vụ</Link>, "sub2", <FontAwesomeIcon icon={faCircleCheck} />),
  getItem("Chăn nuôi", "sub3", <FontAwesomeIcon icon={faHorseHead} />, [
    getItem(<Link to="/livestock">Động vật</Link>, "1"),
    getItem("Chăn nuôi bầy đàn", "2"),
    getItem("Chăn thả", "3"),
  ]),
  getItem("Trồng trọt", "sub4", <FontAwesomeIcon icon={faSeedling} />, [
    getItem(<Link to="/plants">Cây trồng của tôi</Link>, "4"),
    getItem("Vị trí phát triển", "5"),
    getItem("Kế hoạch trồng trọt", "6"),
    getItem("Vị trí trồng trọt", "7"),
    getItem("So sánh năng suất", "8"),
  ]),
  getItem("Bản đồ trang trại", "sub5", <FontAwesomeIcon icon={faMap} />),
];

export const rootSubmenuKeys = ["sub3", "sub4"];
