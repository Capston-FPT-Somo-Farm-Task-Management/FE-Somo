import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorseHead, faSeedling } from '@fortawesome/free-solid-svg-icons'
import {
  faCalendarDays,
  faCircleCheck,
  faClone,
  faSquare,
} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

export const menuItem = [
  getItem(
    <Link to="/schedule">Lịch trình</Link>,
    'sub1',
    <FontAwesomeIcon icon={faCalendarDays} />
  ),
  getItem(
    <Link to="/task">Nhiệm vụ</Link>,
    'sub2',
    <FontAwesomeIcon icon={faCircleCheck} />
  ),
  getItem('Chăn nuôi', 'sub3', <FontAwesomeIcon icon={faHorseHead} />, [
    getItem(<Link to="/animals">Động vật</Link>, '1'),
    getItem(<Link to="/animal-group">Chuồng</Link>, '2'),
  ]),
  getItem('Trồng trọt', 'sub4', <FontAwesomeIcon icon={faSeedling} />, [
    getItem(<Link to="/crops">Cây trồng</Link>, '3'),
    getItem(<Link to="/crop-group">Vườn</Link>, '4'),
  ]),
  getItem(
    <Link to="/area">Khu vực</Link>,
    'sub5',
    <FontAwesomeIcon icon={faClone} />
  ),
  getItem(
    <Link to="/zone">Vùng</Link>,
    'sub6',
    <FontAwesomeIcon icon={faSquare} />
  ),
]

export const rootSubmenuKeys = ['sub3', 'sub4']
