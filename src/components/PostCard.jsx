import { memo } from "react";
import { Tag, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import * as color from "../assets/color";

function PostCard({ postData, handleDelete }) {
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img height={200} alt={postData.image} src={postData.image} />}
      >
        <div style={{ color: color.boldGreyText }}>
          <div style={{ fontWeight: "bold", paddingBottom: 12 }}>
            {`${postData?.owner?.firstName} - ${postData?.owner?.lastName}`}
            <span style={{ color: color.redBalance, float: "right" }}>
              <Row gutter={6}>
                <Col span={12} onClick={() => handleDelete(postData.id)}>
                  <DeleteOutlined />
                </Col>
                <Col span={12}>
                  <Link
                    to={{
                      pathname: `/post/${postData.id}`,
                      state: { itemDetail: postData },
                    }}
                  >
                    <EllipsisOutlined />
                  </Link>
                </Col>
              </Row>
            </span>
          </div>
          <div style={{ paddingBottom: 8 }}>{postData.text}</div>
          <Row style={{ paddingBottom: 8 }} gutter={[0, 6]}>
            {postData?.tags?.map((item) => (
              <Col key={item} span={6}>
                <Tag bordered={false} color="geekblue">
                  {item}
                </Tag>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default memo(PostCard);
