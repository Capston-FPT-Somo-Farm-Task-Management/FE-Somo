import React from "react";
import { useSelector } from "react-redux";
import NoImage from "../../../../../../assets/no-image.png";
import { Collapse, Empty, Image, Space, Timeline } from "antd";
import { GrDocumentImage } from "react-icons/gr";
import dayjs from "dayjs";

function Evidence() {
  const evidenceData = useSelector((state) => state.evidence.data);

  const { Panel } = Collapse;
  console.log(evidenceData);

  const renderImages = () => {
    if (evidenceData && evidenceData.data && evidenceData.data.length > 0) {
      const timelineItems = evidenceData.data.map((evidence, index) => {
        const formattedUpdateDate = dayjs(evidence.submitDate).format(
          "Ngày DD-MM-YYYY HH:mm"
        );
        return {
          date: formattedUpdateDate,
          content: (
            <div key={evidence.id} className="evidence-content">
            <p className="evidence-desc">Mô tả: {evidence.description}</p>
            <p className="evidence-time">Đã gửi {evidence.time}</p>
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
          ),
        };
      });

      return (
        <Space direction="horizontal">
          <Timeline mode="left">
            {timelineItems.map((item, index) => (
              <Timeline.Item color="green" key={index} label={item.date}>
                {item.content}
              </Timeline.Item>
            ))}
          </Timeline>
        </Space>
      );
    } else {
      return <Empty description="Chưa có báo cáo nào" />;
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
