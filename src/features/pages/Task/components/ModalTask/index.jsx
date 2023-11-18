import React, { useState } from "react";
import { Button, Modal, Steps } from "antd";
import FirstModal from "./components/FirstModal";
import SecondModal from "./components/SecondModal";
import ThirdModal from "./components/ThirdModal";
import { steps } from "./modalTaskData";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

function ModalTask({
  currentStep,
  setCurrentStep,
  onTaskAdded,
  onDateChange,
  loadDataTask,
  handleBackOtherTask,
  task,
}) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  console.log(isDraft);

  const handleIsDraft = () => {
    setIsDraft(true);
  };

  const handleIsTaskToDo = () => {
    setIsDraft(false);
  };

  const handleIsDraftOther = () => {
    setIsDraft(true);
  };

  const handleIsTaskOtherToDo = () => {
    setIsDraft(false);
  };

  const handleCloseModal = () => {
    setCurrentStep(-1);
  };

  const handleNext = (type) => {
    setSelectedType(type);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    console.log(currentStep);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setCurrentStep(currentStep + 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <FirstModal onNext={handleNext} />;
      case 1:
        return (
          <SecondModal
            type={selectedType}
            onOptionSelect={handleOptionSelect}
          />
        );
      case 2:
        return (
          <ThirdModal
            loadDataTask={loadDataTask}
            option={selectedOption}
            onTaskAdded={onTaskAdded}
            onDateChange={onDateChange}
            handleCloseModal={handleCloseModal}
            handleIsDraft={handleIsDraft}
            handleIsTaskToDo={handleIsTaskToDo}
            handleIsDraftOther={handleIsDraftOther}
            handleIsTaskOtherToDo={handleIsTaskOtherToDo}
            isDraft={isDraft}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setCurrentStep(0)}>
        Thêm công việc
      </Button>
      <Modal
        title="Thêm công việc"
        visible={currentStep > -1}
        onCancel={() => setCurrentStep(-1)}
        footer={null}
        width={900}
      >
        <Steps current={currentStep} size="small">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: 24 }}>{renderStepContent(currentStep)}</div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {currentStep > 0 &&
            (selectedOption === "other" ? (
              <Button
                style={{
                  margin: "0 8px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={handleBackOtherTask}
              >
                <ArrowLeftOutlined />
                Trở lại
              </Button>
            ) : (
              <Button
                style={{
                  margin: "0 8px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={handleBack}
              >
                <ArrowLeftOutlined />
                Trở lại
              </Button>
            ))}
          {currentStep === steps.length - 1 &&
            (selectedOption === "other" ? (
              <div className="button-create">
                <Button
                  type="dashed"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsDraftOther}
                >
                  Lưu bảng nháp
                  <ProfileOutlined />
                </Button>
                <Button
                  type="primary"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsTaskOtherToDo}
                >
                  Tạo công việc
                  <CheckCircleOutlined />
                </Button>
              </div>
            ) : (
              <div className="button-create">
                <Button
                  type="dashed"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsDraft}
                >
                  Lưu bảng nháp
                  <ProfileOutlined />
                </Button>
                <Button
                  type="primary"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsTaskToDo}
                >
                  Tạo công việc
                  <CheckCircleOutlined />
                </Button>
              </div>
            ))}
        </div>
      </Modal>
    </>
  );
}

export default ModalTask;
