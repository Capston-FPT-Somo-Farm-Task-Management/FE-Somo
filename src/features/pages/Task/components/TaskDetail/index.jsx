// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { getTaskById } from 'features/slice/task/taskSlice';

// function TaskDetail() {
//     const { taskId } = useParams();

//     const task = useSelector((state) => state.task.data);

//     const dispatch = useDispatch(); 

//     useEffect(() => {
//         dispatch(getTaskById(taskId));
//       }, [taskId])
//       console.log(task);
//   return (
//     <div>
//     <h1>{task.farmTask.data.name}</h1>
    
//     <p>Thời gian bắt đầu: {task.farmTask.startDate}</p>

//     <p>Thời gian kết thúc: {task.farmTask.endDate}</p>

//     <p>Mô tả: {task.farmTask.description}</p>

//     <p>Độ ưu tiên: {task.farmTask.priority}</p>

//     <p>Lặp lại: {task.farmTask.repeat}</p>

//     <p>Số lần lặp: {task.farmTask.iterations}</p>

//     <p>Người nhận: {task.farmTask.receiverId}</p>

//     <p>Vị trí: {task.farmTask.fieldId}</p>

//     <p>Loại task: {task.farmTask.taskTypeId}</p>

//     <p>Người thực hiện: {task.farmTask.memberId}</p>
    
//   </div> 
//   )
// }

// export default TaskDetail