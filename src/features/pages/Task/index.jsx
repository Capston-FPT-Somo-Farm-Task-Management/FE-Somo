import React from 'react'
import ModalTask from './components/ModalTask'
import { Link } from 'react-router-dom'

function Task() {
  return (
    <div className='content'>
    <h3>Nhiệm vụ</h3>
      <ModalTask/>
    </div>
  )
}

export default Task