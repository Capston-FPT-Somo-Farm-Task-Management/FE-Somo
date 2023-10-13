import Column from "../Column"
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  return (
    <DragDropContext>
      <h2 style={{ textAlign: "center" }}>Bảng quá trình</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Column title={"Đang thực hiện"} tasks={incomplete} id={"1"}/>
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
