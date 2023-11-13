import React from "react";
import { useSelector } from "react-redux";
import NoImage from "../../../../../../assets/no-image.png";
import { Collapse, Image } from "antd";
import { GrDocumentImage } from "react-icons/gr";

function Evidence() {
  const evidenceData = useSelector((state) => state.evidence.data);

  const { Panel } = Collapse;

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
            <Collapse accordion className="collapse-evidence">
              <Panel
                header={
                  <span>
                    <GrDocumentImage style={{ marginRight: "8px", transform: "translateY(10%)" }} />
                    Xem hình ảnh báo cáo
                  </span>
                }
              >
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
                                  imageIndex >= 4 &&
                                  evidence.urlImage.length > 4
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
                              {imageIndex === 3 &&
                                evidence.urlImage.length > 4 && (
                                  <div className="overlay-background">
                                    <div className="overlay-text">
                                      +{evidence.urlImage.length - 4}
                                    </div>
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
              </Panel>
            </Collapse>
          </div>
        );
      });
    } else {
      return <p>Chưa có báo cáo nào</p>;
    }
  };
  return (
    <div className="evidence">
      <h6 style={{ fontSize: "24px", fontWeight: "500" }}>
        Báo cáo công việc:
      </h6>
      {renderImages()}
    </div>
  );
}

export default Evidence;
