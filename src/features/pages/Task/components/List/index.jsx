import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Menu, Popover, Skeleton } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  deleteTask,
  refuseTask,
  changeStatusDoneToClose,
  changeStatusFromDoneToDoing,
  changeStatusToPendingAndCancel,
  changeStatusToDoing,
} from "features/slice/task/taskSlice";
import { getSubTasksByTaskId } from "features/slice/subTask/subTaskSlice";
import { getEffort } from "features/slice/subTask/effortSlice";
import { taskTitle } from "./listTaskData";
import TaskDetail from "../TaskDetail";
import ModalTask from "../ModalTask";
import StatusTabs from "./components/StatusTabs";
import SearchComp from "./components/SearchComp";
import DateSelectionComp from "./components/DateSelection";
import Effort from "./components/Effort";
import TableTask from "./components/TableTask";
import CheckParent from "./components/CheckParent";
import UpdateTask from "./components/UpdateTask";
import ChangeDoneToDoing from "./components/ChangeDoneToDoing";
import ChangeDoingToPending from "./components/ChangeDoingToPendingAndCancel/ChangeDoingToPending";
import SubTask from "./components/SubTask";
import ViewReject from "../TaskDetail/ViewReject";
import ModalDelete from "./components/ModalDelete";
import ModalClose from "./components/ModalClose";
import ChangeStatusToCancel from "./components/ChangeStatusToCancel";

const List = () => {
  const [subTasks, setSubTasks] = useState([]);
  const [effort, setEffort] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [viewRejectModalVisible, setViewRejectModalVisible] = useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [effortVisible, setEffortVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const [taskDoneToDoingVisible, setTaskDoneToDoingVisible] = useState(false);
  const [taskDoingToPendingModalVisible, setTaskDoingToPendingModalVisible] =
    useState(false);
  const [taskToCancelModalVisible, setTaskToCancelModalVisible] =
    useState(false);
  const [description, setDescription] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskNameSearch, setTaskNameSearch] = useState("");
  const [statusForEdit, setStatusForEdit] = useState(null);
  const [checkTaskParent, setCheckTaskParent] = useState(1);
  const [checkChangeToToDo, setCheckChangeToToDo] = useState(1);
  const [currentStep, setCurrentStep] = useState(-1);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  const task = useSelector((state) => state.task.data);

  const dataTotalPages = useSelector((state) => state.task.totalPages);

  const isHaveSubTask = useSelector((state) => state.effort.isHaveSubTask);

  const loading = useSelector((state) => state.task.loading);

  console.log(viewRejectModalVisible);

  const dispatch = useDispatch();

  const loadDataTask = () => {
    dispatch(
      getTasks({
        pageIndex,
        status,
        date: selectedDate,
        taskName: taskNameSearch,
        checkTaskParent: checkTaskParent,
      })
    );
  };

  useEffect(() => {
    loadDataTask();
  }, [
    dispatch,
    pageIndex,
    status,
    selectedDate,
    taskNameSearch,
    checkTaskParent,
  ]);

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleBackOtherTask = () => {
    setCurrentStep(currentStep - 2);
  };

  const handleCheckChange = (value) => {
    setCheckTaskParent(value);
  };

  const onChange = (pagination) => {
    setPageIndex(pagination.current);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
      openEditTaskModal(record);
      setCheckChangeToToDo(false);
    } else if (e.key === "pending") {
      openChangeDoingToPendingModal(record);
    } else if (e.key === "changeToToDo") {
      openEditTaskModal(record);
      setCheckChangeToToDo(true);
    } else if (e.key === "cancel") {
      openChangeStatusToCancelModal(record);
    } else if (e.key === "changeToDoing") {
      handleChangePendingAndCancelToDoing(record.id);
    } else if (e.key === "viewReject") {
      openViewRejectModal(record);
    } else if (e.key === "reAssign") {
      openEditTaskModal(record);
    } else if (e.key === "reject") {
      handleRefuseTask(record.id);
    } else if (e.key === "close") {
      openCloseModal(record.id);
    } else if (e.key === "delete") {
      openDeleteModal(record.id);
    }
  };

  const openCloseModal = (record) => {
    setSelectedTask(record);
    setCloseModalVisible(true);
  };

  const closeCloseModal = () => {
    setSelectedTask(null);
    setCloseModalVisible(false);
  };

  const openDeleteModal = (record) => {
    setSelectedTask(record);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setSelectedTask(null);
    setDeleteModalVisible(false);
  };

  const openModal = (record) => {
    setSelectedTask(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const openChangeDoingToPendingModal = (record) => {
    setTaskDoingToPendingModalVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeChangeDoingToPendingModal = () => {
    setTaskDoingToPendingModalVisible(false);
  };

  const openChangeStatusToCancelModal = (record) => {
    setTaskToCancelModalVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeChangeStatusToCancelModal = () => {
    setTaskToCancelModalVisible(false);
  };

  const handleRefuseTask = (id) => {
    dispatch(refuseTask(id)).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
    });
    setModalVisible(false);
    setViewRejectModalVisible(false);
  };

  const handleChangeDoneToDoing = (id) => {
    dispatch(
      changeStatusFromDoneToDoing({ taskId: id, body: description })
    ).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
    });
    setTaskDoneToDoingVisible(false);
    setModalVisible(false);
  };

  const handleChangeDoingToPendingTask = (id) => {
    const descriptionValue = {
      description: description,
      imageFile: fileList[0],
    };
    dispatch(
      changeStatusToPendingAndCancel({
        taskId: id,
        status: 5,
        body: descriptionValue,
      })
    ).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
    });
    setTaskDoingToPendingModalVisible(false);
  };

  const handleChangeStatusToCancelTask = (id) => {
    const descriptionValue = {
      description: description,
      imageFile: fileList[0],
    };
    dispatch(
      changeStatusToPendingAndCancel({
        taskId: id,
        status: 7,
        body: descriptionValue,
      })
    ).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
    });
    setTaskToCancelModalVisible(false);
  };

  const handleChangePendingAndCancelToDoing = (id) => {
    dispatch(changeStatusToDoing(id)).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      loadDataTask();
      setPageIndex(1);
      setDeleteModalVisible(false);
    });
  };

  const handleChangeDoneToCloseTask = (id) => {
    dispatch(changeStatusDoneToClose(id)).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
      setCloseModalVisible(false);
    });
  };

  const openChangeDoneToDoingModal = (record) => {
    setTaskDoneToDoingVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeChangeDoneToDoingModal = () => {
    setTaskDoneToDoingVisible(false);
  };

  const openViewRejectModal = (record) => {
    setSelectedTask(record);
    setViewRejectModalVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeViewRejectModal = () => {
    setSelectedTask(null);
    setViewRejectModalVisible(false);
  };

  const openEditTaskModal = (record) => {
    setEditingTask(record);
    setEditTaskModalVisible(true);
    setCurrentTaskId(record.id);
    setViewRejectModalVisible(false);
  };

  const closeEditTaskModal = () => {
    setEditingTask(null);
    setEditTaskModalVisible(false);
    if (editingTask.status === "Từ chối" && selectedTask ) {
      setViewRejectModalVisible(true);
    } else {
      return;
    }
  };

  const handleSubTaskModalVisible = () => {
    setSubTaskModalVisible(false);
  };

  const openSubtaskModal = (record) => {
    setCurrentTaskId(record.id);
    setSubTaskModalVisible(true);
    setEditingTask(record);
    dispatch(getSubTasksByTaskId(record.id)).then((data) => {
      setSubTasks(data.payload);
    });
    const isStatusEffort =
      record &&
      (record.status === "Hoàn thành" || record.status === "Không hoàn thành");
    setStatusForEdit(isStatusEffort);
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

  const menu = (
    <div style={{ margin: "10px" }}>
      <DateSelectionComp
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <CheckParent onCheckChange={handleCheckChange} />
    </div>
  );

  return (
    <div className="list">
      <div className="list-header">
        <ModalTask
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onTaskAdded={handleTaskAdded}
          onDateChange={handleDateChange}
          loadDataTask={loadDataTask}
          handleBackOtherTask={handleBackOtherTask}
        />
        <div className="list-header-item-right">
          <Popover content={menu} trigger="click" arrow placement="bottom">
            <Button type="primary" className="button-filter">
              <FilterOutlined /> Lọc{" "}
            </Button>
          </Popover>
          <SearchComp handleSearchChange={handleSearchChange} />
        </div>
      </div>
      <div className="list-checkTask">
        <StatusTabs onTabChange={handleTabChange} />
      </div>
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
          openViewRejectModal={openViewRejectModal}
          openEditTaskModal={openEditTaskModal}
          closeEditTaskModal={closeEditTaskModal}
          openSubtaskModal={openSubtaskModal}
          openEffortModal={openEffortModal}
          openDeleteModal={openDeleteModal}
          openCloseModal={openCloseModal}
          openChangeDoingToPendingModal={openChangeDoingToPendingModal}
          openChangeStatusToCancelModal={openChangeStatusToCancelModal}
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
        handleRefuseTask={handleRefuseTask}
        closeEditTaskModal={closeEditTaskModal}
        openChangeDoneToDoingModal={openChangeDoneToDoingModal}
      />
      <ModalDelete
        selectedTaskId={selectedTask}
        deleteModalVisible={deleteModalVisible}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
      <ModalClose
        selectedTaskId={selectedTask}
        closeModalVisible={closeModalVisible}
        closeCloseModal={closeCloseModal}
        handleChangeDoneToCloseTask={handleChangeDoneToCloseTask}
      />
      <ViewReject
        viewRejectModalVisible={viewRejectModalVisible}
        closeViewRejectModal={closeViewRejectModal}
        taskData={selectedTask}
        handleRefuseTask={handleRefuseTask}
        openEditTaskModal={openEditTaskModal}
        selectedTask={selectedTask}
      />
      <UpdateTask
        editTaskModalVisible={editTaskModalVisible}
        closeEditTaskModal={closeEditTaskModal}
        key={editingTask ? editingTask.id : null}
        editingTask={editingTask}
        handleTaskAdded={handleTaskAdded}
        handleDateChange={handleDateChange}
        loadDataTask={loadDataTask}
        currentTaskId={currentTaskId}
        closeModal={closeModal}
        closeViewRejectModal={closeViewRejectModal}
        checkChangeToToDo={checkChangeToToDo}
      />
      <SubTask
        subTaskModalVisible={subTaskModalVisible}
        handleSubTaskModalVisible={handleSubTaskModalVisible}
        subTasks={subTasks}
        editingTask={editingTask}
        statusForEdit={statusForEdit}
      />
      <Effort
        effortVisible={effortVisible}
        handleEffortVisible={handleEffortVisible}
        effort={effort}
        isHaveSubTask={isHaveSubTask}
        openSubtaskModal={openSubtaskModal}
      />
      <ChangeDoneToDoing
        selectedTask={selectedTask}
        taskDoneToDoingVisible={taskDoneToDoingVisible}
        closeChangeDoneToDoingModal={closeChangeDoneToDoingModal}
        handleChangeDoneToDoing={handleChangeDoneToDoing}
        description={description}
        handleDescription={handleDescription}
      />
      <ChangeDoingToPending
        currentTaskId={currentTaskId}
        handleChangeDoingToPendingTask={handleChangeDoingToPendingTask}
        closeChangeDoingToPendingModal={closeChangeDoingToPendingModal}
        taskDoingToPendingModalVisible={taskDoingToPendingModalVisible}
        description={description}
        handleDescription={handleDescription}
        fileList={fileList}
        onFileChange={onFileChange}
      />
      <ChangeStatusToCancel
        currentTaskId={currentTaskId}
        handleChangeStatusToCancelTask={handleChangeStatusToCancelTask}
        closeChangeStatusToCancelModal={closeChangeStatusToCancelModal}
        taskToCancelModalVisible={taskToCancelModalVisible}
        description={description}
        handleDescription={handleDescription}
        fileList={fileList}
        onFileChange={onFileChange}
      />
    </div>
  );
};

export default List;
