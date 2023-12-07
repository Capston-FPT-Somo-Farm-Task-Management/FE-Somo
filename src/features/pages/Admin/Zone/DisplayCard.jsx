import { Card, Col, Divider, Progress, Row, Space, Statistic } from "antd";
import CountUp from "react-countup";

const DisplayCard = ({
  activeZoneCount,
  inActiveZoneCount,
  animalZoneCount,
  plantZoneCount,
  otherZoneCount,
}) => {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      <div
        style={{
          width: "58%",
          padding: "20px",
          boxShadow:
            "1px 1px 3px #0000001a, 1px 2px 3px #0000000f,1px 2px 3px #0000001a, 1px 2px 3px #0000000f",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Row gutter={12} style={{ justifyContent: "center" }}>
          <Col span={10} className="dashboard-card">
            <Card
              style={{
                boxShadow:
                  "1px 1px 1px #0000001a, 1px 1px 1px #0000000f,1px 1px 1px #0000001a, 1px 1px 1px #0000000f",
              }}
            >
              <Statistic
                title="Số vùng đang mở"
                value={activeZoneCount}
                precision={2}
                formatter={formatter}
              />
              <Progress showInfo={false} percent={100} strokeColor="#2291f4" />
            </Card>
          </Col>
          <Col span={10} className="dashboard-card">
            <Card
              style={{
                boxShadow:
                  "1px 1px 1px #0000001a, 1px 1px 1px #0000000f,1px 1px 1px #0000001a, 1px 1px 1px #0000000f",
              }}
            >
              <Statistic
                title="Số vùng đang đóng"
                value={inActiveZoneCount}
                precision={2}
                formatter={formatter}
              />
              <Progress showInfo={false} percent={100} strokeColor="#02c39a" />
            </Card>
          </Col>
          <Divider>Loại vùng</Divider>
          <Col span={8} className="dashboard-card">
            <Card
              style={{
                boxShadow:
                  "1px 1px 1px #0000001a, 1px 1px 1px #0000000f,1px 1px 1px #0000001a, 1px 1px 1px #0000000f",
              }}
            >
              <Statistic
                title="Vùng chăn nuôi"
                value={animalZoneCount}
                precision={2}
                formatter={formatter}
              />
              <Progress showInfo={false} percent={100} strokeColor="#1a659e" />
            </Card>
          </Col>

          <Col span={8} className="dashboard-card">
            <Card
              style={{
                boxShadow:
                  "1px 1px 1px #0000001a, 1px 1px 1px #0000000f,1px 1px 1px #0000001a, 1px 1px 1px #0000000f",
              }}
            >
              <Statistic
                title="Vùng trồng trọt"
                value={plantZoneCount}
                precision={2}
                formatter={formatter}
              />
              <Progress showInfo={false} percent={100} strokeColor="#02c39a" />
            </Card>
          </Col>
          <Col span={8} className="dashboard-card">
            <Card
              style={{
                boxShadow:
                  "1px 1px 1px #0000001a, 1px 1px 1px #0000000f,1px 1px 1px #0000001a, 1px 1px 1px #0000000f",
              }}
            >
              <Statistic
                title="Vùng khác"
                value={otherZoneCount}
                precision={2}
                formatter={formatter}
              />
              <Progress showInfo={false} percent={100} strokeColor="#FFBB28" />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default DisplayCard;
