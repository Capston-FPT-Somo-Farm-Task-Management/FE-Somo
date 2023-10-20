import React from 'react'
import ModalTask from '../ModalTask'
import KanbanBoard from './components/KanbanBoard'

function Board() {
  return (
    <div>
      <ModalTask/>
      <div>
        <KanbanBoard/>
      </div>
    </div>
  )
}

export default Board