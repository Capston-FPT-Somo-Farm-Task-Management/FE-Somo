import React from "react";
import { useSelector } from "react-redux";
import NoImage from "../../../../../../assets/no-image.png";
import { Collapse, Empty, Image, Space } from "antd";
import { GrDocumentImage } from "react-icons/gr";

function Evidence() {
  const evidenceData = useSelector((state) => state.evidence.data);

  const { Panel } = Collapse;

  const renderImages = () => {
    let totalEvidenceCount = 0;
    if (evidenceData && evidenceData.data && evidenceData.data.length > 0) {
      return evidenceData.data.map((evidence, index) => {
        console.log(evidence);
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
                  <div className="evidence-panel">
                  <div className="evidence-panel-title">
                  <GrDocumentImage style={{ marginRight: "8px", transform: "translateY(10%)" }} />
                    Xem hình ảnh báo cáo
                  </div>
                    <div className="evidence-panel-img">
                      {evidence.urlImage ? <span>{evidence.urlImage.length} hình ảnh</span> : <span>Không có ảnh nào</span>}
                    </div>
                  </div>
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
                              className="img-evidence-2"
                              key={imageIndex}
                            >
                              <Image src={url} alt={`evidence-${imageIndex}`} />
                            </div>
                          ) : evidence.urlImage.length === 3 ? (
                            <div
                              className="img-evidence-3"
                              key={imageIndex}
                            >
                              <Image src={url} alt={`evidence-${imageIndex}`} />
                            </div>
                          ) : evidence.urlImage.length === 4 ? (
                            <div
                              className="img-evidence-4"
                              key={imageIndex}
                            >
                              <Image src={url} alt={`evidence-${imageIndex}`} />
                            </div>
                          ) : evidence.urlImage.length > 4 ? (
                            <div
                              style={{
                                display:
                                  imageIndex >= 4 &&
                                  evidence.urlImage.length > 4
                                    ? "none"
                                    : "block",
                              }}
                              className={`img-evidence-more-4 ${
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
      return <Empty description="Chưa có báo cáo nào"/>;
    }
  };
  return (
    <div className="evidence">
      <h6 style={{ fontSize: "24px", fontWeight: "500" }}>
        Báo cáo công việc 
      </h6>
      {renderImages()}
    </div>
  );
}

export default Evidence;
