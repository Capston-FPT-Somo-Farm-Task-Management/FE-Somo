import React from 'react'
import NoImage from '../../../../../assets/no-image.png'
import { Collapse, Empty, Image, Space, Timeline } from 'antd'
import { GrDocumentImage } from 'react-icons/gr'
import dayjs from 'dayjs'
const { Panel } = Collapse

const TaskEvidence = ({ evidenceData }) => {
  const renderImages = () => {
    if (evidenceData && evidenceData.data && evidenceData.data.length > 0) {
      const timelineItems = evidenceData.data.map((evidence, index) => {
        const formattedUpdateDate = dayjs(evidence.submitDate).format(
          'Ngày DD-MM-YYYY HH:mm'
        )
        return {
          date: formattedUpdateDate,
          content: (
            <div key={evidence.id} className="evidence-content">
              {evidence.evidenceType === 1 ? (
                <p className="evidence-desc">
                  <span style={{ color: '#f77f00' }}>Lý do không đồng ý:</span>{' '}
                  {evidence.description}
                </p>
              ) : evidence.evidenceType === 2 ? (
                <p className="evidence-desc">
                  <span style={{ color: 'red' }}>Lý do hủy bỏ:</span>{' '}
                  {evidence.description}
                </p>
              ) : evidence.evidenceType === 3 ? (
                <p className="evidence-desc">
                  <span style={{ color: '#ffb703' }}>Lý do tạm hoãn:</span>{' '}
                  {evidence.description}
                </p>
              ) : evidence.evidenceType === 4 ? (
                <p className="evidence-desc">
                  <span style={{ color: '#849b5c' }}>Mô tả:</span>{' '}
                  {evidence.description}
                </p>
              ) : evidence.evidenceType === 5 ? (
                <p className="evidence-desc">
                  <span style={{ color: 'red' }}>Lý do từ chối:</span>{' '}
                  {evidence.description}
                </p>
              ) : (
                <p className="evidence-desc">
                  <span style={{ color: '#849b5c' }}>Mô tả:</span>{' '}
                  {evidence.description}
                </p>
              )}
              {evidence.evidenceType === 0 ? (
                <p className="evidence-time" style={{ color: '#849b5c' }}>
                  Bình thường
                </p>
              ) : evidence.evidenceType === 1 ? (
                <p className="evidence-time" style={{ color: '#f77f00' }}>
                  Không đồng ý
                </p>
              ) : evidence.evidenceType === 2 ? (
                <p className="evidence-time" style={{ color: 'red' }}>
                  Hủy bỏ
                </p>
              ) : evidence.evidenceType === 3 ? (
                <p className="evidence-time" style={{ color: '#ffb703' }}>
                  Tạm hoãn
                </p>
              ) : evidence.evidenceType === 4 ? (
                <p className="evidence-time" style={{ color: '#849b5c' }}>
                  Đang thực hiện
                </p>
              ) : evidence.evidenceType === 5 ? (
                <p className="evidence-time" style={{ color: 'red' }}>
                  Từ chối người giám sát
                </p>
              ) : null}

              {evidence.urlImage && evidence.urlImage.length > 0 ? (
                <Collapse accordion className="collapse-evidence">
                  <Panel
                    header={
                      <div className="evidence-panel">
                        <div className="evidence-panel-title">
                          <GrDocumentImage
                            style={{
                              marginRight: '8px',
                              transform: 'translateY(10%)',
                            }}
                          />
                          Xem hình ảnh báo cáo
                        </div>
                        <div className="evidence-panel-img">
                          {evidence.urlImage ? (
                            <span>{evidence.urlImage.length} hình ảnh</span>
                          ) : (
                            <span>Không có ảnh nào</span>
                          )}
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
                                  <Image
                                    src={url}
                                    alt={`evidence-${imageIndex}`}
                                  />
                                </div>
                              ) : evidence.urlImage.length === 2 ? (
                                <div
                                  className="img-evidence-2"
                                  key={imageIndex}
                                >
                                  <Image
                                    src={url}
                                    alt={`evidence-${imageIndex}`}
                                  />
                                </div>
                              ) : evidence.urlImage.length === 3 ? (
                                <div
                                  className="img-evidence-3"
                                  key={imageIndex}
                                >
                                  <Image
                                    src={url}
                                    alt={`evidence-${imageIndex}`}
                                  />
                                </div>
                              ) : evidence.urlImage.length === 4 ? (
                                <div
                                  className="img-evidence-4"
                                  key={imageIndex}
                                >
                                  <Image
                                    src={url}
                                    alt={`evidence-${imageIndex}`}
                                  />
                                </div>
                              ) : evidence.urlImage.length > 4 ? (
                                <div
                                  style={{
                                    display:
                                      imageIndex >= 4 &&
                                      evidence.urlImage.length > 4
                                        ? 'none'
                                        : 'block',
                                  }}
                                  className={`img-evidence-more-4 ${
                                    imageIndex === 3 &&
                                    evidence.urlImage.length > 4
                                      ? 'overlay'
                                      : ''
                                  }`}
                                  key={imageIndex}
                                >
                                  <Image
                                    src={url}
                                    alt={`evidence-${imageIndex}`}
                                  />
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
              ) : null}
            </div>
          ),
        }
      })

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
      )
    } else {
      return <Empty description="Chưa có báo cáo nào" />
    }
  }
  return (
    <div className="evidence">
      <h6 style={{ fontSize: '24px', fontWeight: '500' }}>Báo cáo công việc</h6>
      {renderImages()}
      {/* {taskData && taskData.status === 'Từ chối' ? (
        <div>
          <Button
            form="refuseTask"
            type="primary"
            danger
            onClick={() => openEditTaskModal(taskData)}
          >
            Chỉnh sửa
            <UpdateTask />
          </Button>
          ,
          <Button
            form="refuseTask"
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleRefuseTask(taskData.id)
            }}
          >
            Không chấp nhận
          </Button>
        </div>
      ) : null} */}
    </div>
  )
}

export default TaskEvidence