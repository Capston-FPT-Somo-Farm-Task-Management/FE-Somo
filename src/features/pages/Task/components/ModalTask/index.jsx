import React, { useState } from "react";
import { Button, Modal, Steps } from "antd";

import FirstModal from "./components/FirstModal";
import SecondModal from "./components/SecondModal";
import ThirdModal from "./components/ThirdModal";
import { steps } from "./modalTaskData";

const { Step } = Steps;

function ModalTask() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleNext = (type) => {
    setSelectedType(type);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    // Handle finishing steps
    setCurrentStep(-1);
    setSelectedType(null);
    Modal.success({
      title: "Bạn đã thêm thành công",
      content: "Your task has been processed successfully.",
      onOk: () => {
        window.location.reload(); // Tải lại trang khi người dùng ấn nút "OK" trên modal
      },
    });
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
        return <ThirdModal option={selectedOption} />;
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
          style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
        >
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={handleBack}>
              Trở lại
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleFinish}
              form="createTask"
              htmlType="submit"
            >
              Thêm
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ModalTask;
