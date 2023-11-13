import React, { useEffect, useState } from "react";
import { Form, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask } from "features/slice/task/taskSlice";
import { getEmployeeByTask } from "features/slice/employee/employeeByTask";
import {
  getSubTasksByTaskId,
  createSubTask,
  deleteSubTask,
  updateSubTask,
  updateEffortBySubTask,
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
import Evidence from "../TaskDetail/Evidence";
import dayjs from "dayjs";

const List = () => {
  const [subTasks, setSubTasks] = useState([]);
  const [effort, setEffort] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [editingSubTask, setEditingSubTask] = useState(null);
  const [editSubTaskModalVisible, setEditSubTaskModalVisible] = useState(false);
  const [editSubTaskEffortModalVisible, setEditSubTaskEffortModalVisible] =
    useState(false);
  const [editingEffort, setEditingEffort] = useState(null);
  const [editEffortVisible, setEditEffortVisible] = useState(false);
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [addSubtaskVisible, setAddSubtaskVisible] = useState(false);
  const [effortVisible, setEffortVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskNameSearch, setTaskNameSearch] = useState("");
  const [statusForEdit, setStatusForEdit] = useState(null);
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);

  const [form] = Form.useForm();
  const task = useSelector((state) => state.task.data);

  const dataTotalPages = useSelector((state) => state.task.totalPages);

  const isHaveSubTask = useSelector((state) => state.effort.isHaveSubTask)

  const loading = useSelector((state) => state.task.loading);

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
  }, [dispatch, pageIndex, status, selectedDate, taskNameSearch]);

  useEffect(() => {
    dispatch(getEmployeeByTask(currentTaskId)).then((data) => {
      setAvailableEmployees(data.payload);
      console.log(data.payload);
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
      openEditTaskModal(record);
    } else if (e.key === "delete") {
      handleDelete(record.id);
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

  const openEditTaskModal = (record) => {
    setEditingTask(record);
    setEditTaskModalVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeEditTaskModal = () => {
    setEditingTask(null);
    setEditTaskModalVisible(false);
  };

  const handleMenuSubTaskClick = (e, subTaskItem) => {
    if (e.key === "edit") {
      openEditSubTaskModal(subTaskItem);
    } else if (e.key === "editEffort") {
      openEditSubTaskEffortModal(subTaskItem);
    } else if (e.key === "delete") {
      handleDeleteSubTask(subTaskItem.subtaskId);
    }
  };

  const handleSubTaskModalVisible = () => {
    setSubTaskModalVisible(false);
  };

  const openSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setSubTaskModalVisible(true);
    setEditingTask(record)
    dispatch(getSubTasksByTaskId(record.id)).then((data) => {
      setSubTasks(data.payload);
    });
    const isStatusEffort =
      record &&
      (record.status === "Hoàn thành" || record.status === "Không hoàn thành");
    setStatusForEdit(isStatusEffort);
  };

  const openAddSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setAddSubtaskVisible(true);
    setEditingTask(record);
    const taskId = currentTaskId;
    dispatch(getEmployeeByTask(taskId)).then((data) => {
      setAvailableEmployees(data.payload);
    });
    form.resetFields();
  };

  const closeAddSubtaskModal = () => {
    setAddSubtaskVisible(false);
  };

  const openEditSubTaskModal = (subTask) => {
    setEditingSubTask(subTask);
    setEditSubTaskModalVisible(true);
    setDescription(subTask.description);
  };

  const openEditSubTaskEffortModal = (subTask) => {
    setEditingSubTask(subTask);
    setEditSubTaskEffortModalVisible(true);
  };

  const closeEditSubTaskModal = () => {
    setEditingSubTask(null);
    setEditSubTaskModalVisible(false);
  };
  const closeEditSubTaskEffortModal = () => {
    setEditingSubTask(null);
    setEditSubTaskEffortModalVisible(false);
    console.log("closed modal");
  };

  const handleDeleteSubTask = (subTaskId) => {
    const taskId = currentTaskId;
    dispatch(deleteSubTask({ subTaskId })).then(() => {
      dispatch(getSubTasksByTaskId(taskId)).then((data) => {
        setSubTasks(data.payload);
      });
    });
  };

  const handleAddSubTask = (values) => {
    const startDayFormatted = dayjs(startDay)
      .second(0)
      .format("YYYY-MM-DD[T]HH:mm:ss.SSS");
    const endDayFormatted = dayjs(endDay)
      .second(0)
      .format("YYYY-MM-DD[T]HH:mm:ss.SSS");
    const finalValues = {
      ...values,
      taskId: currentTaskId,
      startDay: startDayFormatted,
      endDay: endDayFormatted,
    };
    dispatch(createSubTask(finalValues)).then(() => {
      dispatch(getSubTasksByTaskId(currentTaskId)).then((data) => {
        setSubTasks(data.payload);
        loadDataTask();
        setAddSubtaskVisible(false);
      });
    });
  };

  const handleUpdateSubTask = (
    subTaskId,
    employeeId,
    name,
    startDay,
    endDay,
    description
  ) => {
    const updatedSubTask = {
      employeeId: employeeId,
      name: name,
      startDay: startDay,
      endDay: endDay,
      description: description,
    };

    dispatch(
      updateSubTask({ subTaskId: subTaskId, body: updatedSubTask })
    ).then(() => {
      dispatch(getSubTasksByTaskId(currentTaskId)).then((data) => {
        setSubTasks(data.payload);
        loadDataTask();
        setEditSubTaskModalVisible(false);
      });
    });
  };

  const handleMenuEffortClick = (e, effortItem) => {
    if (e.key === "edit") {
      openEditEffort(effortItem);
    }
  };

  const handleEffortVisible = () => {
    setEffortVisible(false);
  };

  const openEffortModal = (record) => {
    setCurrentTaskId(record.id);
    setEffortVisible(true);
    dispatch(getEffort(record.id)).then((data) => {
      setEffort(data.payload.data.subtasks);
    });
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

  const handleUpdateEffort = (
    taskId,
    employeeId,
    actualEffortHour,
    actualEfforMinutes
  ) => {
    const updatedEffort = [
      {
        employeeId: employeeId,
        actualEffortHour: parseFloat(actualEffortHour),
        actualEfforMinutes: parseFloat(actualEfforMinutes),
      },
    ];

    console.log(taskId);

    dispatch(updateEffort({ taskId: taskId, body: updatedEffort })).then(() => {
      dispatch(getEffort(currentTaskId)).then((data) => {
        setEffort(data.payload.data.subtasks);
        setEditEffortVisible(false);
      });
    });
  };

  const handleUpdateSubTaskEffort = (
    subTaskId,
    employeeId,
    actualEffortHour,
    actualEfforMinutes
  ) => {
    const updatedEffort = {
      employeeId: employeeId,
      actualEffortHour: parseFloat(actualEffortHour),
      actualEfforMinutes: parseFloat(actualEfforMinutes),
    };
    console.log(subTaskId);

    dispatch(
      updateEffortBySubTask({ subTaskId: subTaskId, body: updatedEffort })
    ).then(() => {
      dispatch(getSubTasksByTaskId(currentTaskId)).then((data) => {
        setSubTasks(data.payload);
        loadDataTask();
        setEditSubTaskModalVisible(false);
      });
    });
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
    setPageIndex(1);
  };

  const handleSearchChange = (taskName) => {
    setTaskNameSearch(taskName);
    setPageIndex(1);
  };

  const handleSelectStartDay = (date) => {
    setStartDay(date);
  };

  const handleSelectEndDay = (date) => {
    setEndDay(date);
    console.log(date);
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
      {loading === true ? (
        <Skeleton active />
      ) : (
        <TableTask
          taskTitle={taskTitle}
          task={task}
          openModal={openModal}
          onChange={onChange}
          pageIndex={pageIndex}
          dataTotalPages={dataTotalPages}
          handleMenuClick={handleMenuClick}
          editingTask={editingTask}
          editTaskModalVisible={editTaskModalVisible}
          openEditTaskModal={openEditTaskModal}
          closeEditTaskModal={closeEditTaskModal}
          openSubtaskModal={openSubtaskModal}
          openAddSubtaskModal={openAddSubtaskModal}
          openEffortModal={openEffortModal}
          handleTaskAdded={handleTaskAdded}
          handleDateChange={handleDateChange}
          loadDataTask={loadDataTask}
          currentTaskId={currentTaskId}
        />
      )}
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
        handleUpdateSubTaskEffort={handleUpdateSubTaskEffort}
        editSubTaskModalVisible={editSubTaskModalVisible}
        editSubTaskEffortModalVisible={editSubTaskEffortModalVisible}
        closeEditSubTaskModal={closeEditSubTaskModal}
        handleUpdateSubTask={handleUpdateSubTask}
        editingSubTask={editingSubTask}
        editingTask={editingTask}
        openEditSubTaskEffortModal={openEditSubTaskEffortModal}
        closeEditSubTaskEffortModal={closeEditSubTaskEffortModal}
        statusForEdit={statusForEdit}
        currentTaskId={currentTaskId}
        handleSelectStartDay={handleSelectStartDay}
        handleSelectEndDay={handleSelectEndDay}
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
        isHaveSubTask={isHaveSubTask}
        handleMenuSubTaskClick={handleMenuSubTaskClick}
        openEditSubTaskEffortModal={openEditSubTaskEffortModal}
      />
    </div>
  );
};

export default List;
