import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask } from "features/slice/task/taskSlice";
import { getEmployeeByTask } from "features/slice/employee/employeeByTask";
import {
  getSubTasksByTaskId,
  createSubTask,
  deleteSubTask,
} from "features/slice/subTask/subTaskSlice";
import { getEffort, updateEffort } from "features/slice/subTask/effortSlice";
import { taskTitle } from "./listTaskData";
import { getStatus } from "features/slice/status/statusSlice";
import TaskDetail from "../TaskDetail";
import ModalTask from "../ModalTask";
import StatusTabs from "./components/StatusTabs";
import SearchComp from "./components/SearchComp";
import DateSelectionComp from "./components/DateSelection";
import SubTask from "./components/SubTask/subTask";
import Effort from "./components/Effort";
import TableTask from "./components/TableTask";

const List = () => {
  const [subTasks, setSubTasks] = useState([]);
  const [effort, setEffort] = useState([]);
  const [editingSubTask, setEditingSubTask] = useState(null);
  const [editSubTaskModalVisible, setEditSubTaskModalVisible] = useState(false);
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [effortVisible, setEffortVisible] = useState(false);
  const [addSubtaskVisible, setAddSubtaskVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskNameSearch, setTaskNameSearch] = useState("");
  const [editingEffort, setEditingEffort] = useState(null);
  const [editEffortVisible, setEditEffortVisible] = useState(false);

  const [form] = Form.useForm();
  const task = useSelector((state) => state.task.data);

  const dataTotalPages = useSelector((state) => state.task.totalPages);

  const dispatch = useDispatch();

  const loadDataTask = () => {
    dispatch(
      getTasks({
        pageIndex,
        status,
        date: selectedDate,
        taskName: taskNameSearch,
      })
    );
  };

  useEffect(() => {
    loadDataTask();
    dispatch(getStatus());
  }, [pageIndex, status, selectedDate, taskNameSearch]);

  useEffect(() => {
    dispatch(getEmployeeByTask(currentTaskId)).then((data) => {
      setAvailableEmployees(data.payload);
    });
  }, [currentTaskId]);

  const onChange = (pagination) => {
    setPageIndex(pagination.current);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
    } else if (e.key === "delete") {
      handleDelete(record.id);
    }
  };

  const handleMenuSubTaskClick = (e, subTaskItem) => {
    if (e.key === "edit") {
      openEditSubTaskModal(subTaskItem);
    } else if (e.key === "delete") {
      handleDeleteSubTask(subTaskItem.employeeId);
    }
  };

  const handleMenuEffortClick = (e, effortItem) => {
    if (e.key === "edit") {
      openEditEffort(effortItem);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      loadDataTask();
      setPageIndex(1);
    });
  };

  const openModal = (record) => {
    setSelectedTask(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const openAddSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setAddSubtaskVisible(true);
    const taskId = currentTaskId;
    dispatch(getEmployeeByTask(taskId)).then((data) => {
      setAvailableEmployees(data.payload);
    });
    form.resetFields();
  };

  const openEditSubTaskModal = (subTask) => {
    setEditingSubTask(subTask);
    setEditSubTaskModalVisible(true);
    setDescription(subTask.description);
  };

  const openEditEffort = (effort) => {
    setEditingEffort(effort);
    setEditEffortVisible(true);
    setDescription(effort.description);
  };

  const closeEditEffortModal = () => {
    setEditingEffort(null);
    setEditEffortVisible(false);
  };

  const handleEffortVisible = () => {
    setEffortVisible(false);
  };

  const openSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setSubTaskModalVisible(true);
    dispatch(getSubTasksByTaskId(record.id)).then((data) => {
      setSubTasks(data.payload);
    });
  };

  const openEffortModal = (record) => {
    setCurrentTaskId(record.id);
    setEffortVisible(true);
    dispatch(getEffort(record.id)).then((data) => {
      setEffort(data.payload);
    });
  };
  const closeAddSubtaskModal = () => {
    setAddSubtaskVisible(false);
  };

  const handleSubTaskModalVisible = () => {
    setSubTaskModalVisible(false);
  };

  const handleTabChange = (key) => {
    setPageIndex(1);
    setStatus(Number(key));
  };

  const handleTaskAdded = () => {
    setPageIndex(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    setPageIndex(1);
  };

  const handleSearchChange = (taskName) => {
    setTaskNameSearch(taskName);
    setPageIndex(1);
  };

  const handleDeleteSubTask = (employeeId) => {
    const taskId = currentTaskId;
    dispatch(deleteSubTask({ taskId, employeeId })).then(() => {
      dispatch(getSubTasksByTaskId(taskId)).then((data) => {
        setSubTasks(data.payload);
      });
    });
  };

  const closeEditSubTaskModal = () => {
    setEditingSubTask(null);
    setEditSubTaskModalVisible(false);
  };

  const handleAddSubTask = (values) => {
    const finalValues = {
      ...values,
      taskId: currentTaskId,
    };
    dispatch(createSubTask(finalValues)).then(() => {
      dispatch(getSubTasksByTaskId(currentTaskId)).then((data) => {
        setSubTasks(data.payload);
        loadDataTask();
        setAddSubtaskVisible(false);
      });
    });
  };

  const handleUpdateSubTask = (values) => {
    const finalValues = {
      ...values,
      taskId: currentTaskId,
      employeeId: editingSubTask.employeeId,
    };

    dispatch(createSubTask(finalValues)).then(() => {
      dispatch(getSubTasksByTaskId(currentTaskId)).then((data) => {
        setSubTasks(data.payload);
        loadDataTask();
        setEditSubTaskModalVisible(false);
      });
    });
  };

  const handleUpdateEffort = (taskId, employeeId, effortTime) => {
    const updatedEffort = [
      {
        employeeId: employeeId,
        effortTime: parseFloat(effortTime),
      },
    ];

    dispatch(updateEffort({ id: taskId, body: updatedEffort })).then(() => {
      dispatch(getEffort(currentTaskId)).then((data) => {
        setEffort(data.payload);
        setEditEffortVisible(false);
      });
    });
  };

  return (
    <div className="list">
      <div className="list-header">
        <ModalTask
          onTaskAdded={handleTaskAdded}
          onDateChange={handleDateChange}
          loadDataTask={loadDataTask}
        />
        <div className="list-header-item-right">
          <DateSelectionComp
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          <SearchComp handleSearchChange={handleSearchChange} />
        </div>
      </div>
      <StatusTabs onTabChange={handleTabChange} />
      <TableTask
        taskTitle={taskTitle}
        task={task}
        openModal={openModal}
        onChange={onChange}
        pageIndex={pageIndex}
        dataTotalPages={dataTotalPages}
        handleMenuClick={handleMenuClick}
        openSubtaskModal={openSubtaskModal}
        openAddSubtaskModal={openAddSubtaskModal}
        openEffortModal={openEffortModal}
      />
      <TaskDetail
        visible={modalVisible}
        onCancel={closeModal}
        taskData={selectedTask}
      />
      <SubTask
        addSubtaskVisible={addSubtaskVisible}
        closeAddSubtaskModal={closeAddSubtaskModal}
        form={form}
        availableEmployees={availableEmployees}
        description={description}
        handleDescription={handleDescription}
        subTaskModalVisible={subTaskModalVisible}
        handleSubTaskModalVisible={handleSubTaskModalVisible}
        subTasks={subTasks}
        handleAddSubTask={handleAddSubTask}
        handleMenuSubTaskClick={handleMenuSubTaskClick}
        editSubTaskModalVisible={editSubTaskModalVisible}
        closeEditSubTaskModal={closeEditSubTaskModal}
        handleUpdateSubTask={handleUpdateSubTask}
        editingSubTask={editingSubTask}
      />
      <Effort
        effortVisible={effortVisible}
        handleEffortVisible={handleEffortVisible}
        effort={effort}
        handleMenuEffortClick={handleMenuEffortClick}
        editEffortVisible={editEffortVisible}
        closeEditEffortModal={closeEditEffortModal}
        handleUpdateEffort={handleUpdateEffort}
        currentTaskId={currentTaskId}
        editingEffort={editingEffort}
      />
    </div>
  );
};

export default List;
