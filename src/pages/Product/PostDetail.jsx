import { useContext, useEffect } from "react";
import { LinkOutlined, LeftOutlined } from "@ant-design/icons";
import { Row, Col, Image, Badge } from "antd";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../App";
import { Link } from "react-router-dom";
import moment from "moment";
import * as color from "../../assets/color";

export default function PostDetail() {
  const { handlePathname } = useContext(DataContext);
  const location = useLocation();
  const data = location.state.itemDetail;

  useEffect(() => {
    handlePathname("post");
  }, []);

  return (
    <div style={{ padding: "40px 240px 100px 240px" }}>
      <Row gutter={[48, 0]}>
        <Col span={24} style={{ color: "#4B5563", fontSize: 12 }}>
          <LeftOutlined style={{ fontSize: 10 }} />
          <span>
            <Link to="/dashboard" style={{ paddingLeft: 6, color: "#4B5563" }}>
              See All Posts
            </Link>
          </span>
        </Col>
        <Col span={24}>
          <h1>Machine Vision - Post</h1>
          <Badge.Ribbon text={`${data.likes} Likes`}>
            <Image width="100%" height={300} style={{ border: "2px solid #e1e1e1" }} src={data.image} />
          </Badge.Ribbon>
          <div style={{ paddingTop: 8, fontSize: 16, fontWeight: "bold" }}>
            <a style={{ display: "flex", color: "black" }} href={data?.image} target="_blank" rel="noreferrer">
              <LinkOutlined />
              <span style={{ paddingLeft: 8 }}>Image Link</span>
            </a>
          </div>
          <br />
          <br />
        </Col>
        <Col span={24} style={{ color: "#6B7280", fontWeight: "bold", fontSize: 16, lineHeight: "24px" }}>
          <div style={{ textTransform: "capitalize" }}>Writer: {`${data.owner.title} ${data.owner.firstName} ${data.owner.lastName}`}</div>
          <div>Writer Id: {data.owner.id}</div> <div>Publish Date: {moment(data.publishDate).format("ll")}</div>{" "}
          <div>Last Update: {moment(data.updatedDate).format("ll") || "-"}</div>
        </Col>
        <Col span={24} style={{ paddingTop: 48 }}>
          <div style={{ color: color.greyText, fontSize: 16 }}>{data.text}</div>
        </Col>
        <Col span={24} style={{ paddingTop: 48, fontWeight: "bold", lineHeight: "24px" }}>
          <div style={{ color: color.greyText, fontSize: 16, paddingBottom: 8 }}>Writer Profile</div>
          <Image height={60} width={60} style={{ border: "2px solid #e1e1e1", borderRadius: "100%" }} src={data.owner.picture} />
        </Col>
      </Row>
    </div>
  );
}
