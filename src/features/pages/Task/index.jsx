import React from "react";
import List from "./components/List";


function Task() {
  return (
    <div className="content">
      <div>
        <h3>Nhiệm vụ</h3>
      </div>
          <List style={{ width: "100%" }} />
    </div>
  );
}

export default Task;
