import React from "react";
import { Droppable } from "react-beautiful-dnd";

function Column({ title, tasks, id }) {
  return (
    <div className="column-container">
      <div className="column-title">{title}</div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          <div
            className="column-taskList"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          ></div>;
        }}
      </Droppable>
    </div>
  );
}

export default Column;
