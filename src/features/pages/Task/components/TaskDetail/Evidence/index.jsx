import React from "react";
import { useSelector } from "react-redux";
import NoImage from "../../../../../../assets/no-image.png";
import { Image, Modal } from "antd";

function Evidence({ visible, onCancel, taskData }) {
  const evidenceData = useSelector((state) => state.evidence.data);

  const renderImages = () => {
    let totalEvidenceCount = 0;
    if (evidenceData && evidenceData.data && evidenceData.data.length > 0) {
      return evidenceData.data.map((evidence, index) => {
        totalEvidenceCount++;
        const evidenceCount = totalEvidenceCount;
        return (
          <div key={evidence.id} className="evidence-content">
            <div className="evidence-count">
              <span style={{ textDecoration: "none", color: "red" }}>* </span>
              <span>Báo cáo số {evidenceCount}</span>{" "}
            </div>
            <p className="evidence-desc">Mô tả: {evidence.description}</p>
            <p className="evidence-time">Được gửi {evidence.time}</p>
            <div className="img-contain">
              <Image.PreviewGroup>
                {evidence.urlImage && evidence.urlImage ? (
                  evidence.urlImage.map((url, imageIndex) => (
                    <>
                      {evidence.urlImage.length === 1 ? (
                        <div className="img-evidence" key={imageIndex}>
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length === 2 ? (
                        <div
                          style={{ width: "45%" }}
                          className="img-evidence"
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length === 3 ? (
                        <div
                          style={{ width: "30%" }}
                          className="img-evidence"
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length === 4 ? (
                        <div
                          style={{ width: "45%", margin: "10px" }}
                          className="img-evidence"
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                        </div>
                      ) : evidence.urlImage.length > 4 ? (
                        <div
                          style={{
                            width: "45%",
                            margin: "10px",
                            display:
                              imageIndex >= 4 && evidence.urlImage.length > 4
                                ? "none"
                                : "block",
                          }}
                          className={`img-evidence ${
                            imageIndex === 3 && evidence.urlImage.length > 4
                              ? "overlay"
                              : ""
                          }`}
                          key={imageIndex}
                        >
                          <Image src={url} alt={`evidence-${imageIndex}`} />
                          {imageIndex === 3 && evidence.urlImage.length > 4 && (
                            <div className="overlay-text">
                              +{evidence.urlImage.length - 4}
                            </div>
                          )}
                        </div>
                      ) : null}
                    </>
                  ))
                ) : (
                  <img src={NoImage} alt="Không có ảnh" />
                )}
              </Image.PreviewGroup>
            </div>
          </div>
        );
      });
    } else {
      return <p>Chưa có báo cáo nào</p>;
    }
  };
  return (
    <Modal
      title="Báo cáo công việc"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={550}
      className="modal-detail"
      style={{ maxWidth: "90%", margin: "0 auto" }}
    >
      <div className="evidence">
        {renderImages()}
      </div>
    </Modal>
  );
}

export default Evidence;
