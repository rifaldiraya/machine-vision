import { useEffect, useState, useContext, useRef } from "react";
import { BASE_URL, APP_ID } from "../../helper/helper";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col, List, notification, Drawer, FloatButton } from "antd";
import { DataContext } from "../../App";
import DrawerPost from "./DrawerPost";
import PostCard from "../../components/PostCard";
import axios from "axios";

export default function Post() {
  const { filter, handlePathname } = useContext(DataContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([{}]);
  const drawerPost = useRef();

  const openDrawerNewPost = () => {
    drawerPost.current.showDrawer();
  };

  async function getPost() {
    const urlHelper = filter === "" ? `${BASE_URL}post?${filter}limit=10&page=${page}` : `${BASE_URL}tag/${filter}/post?limit=10&page=${page}`;
    await axios
      .get(urlHelper, {
        headers: {
          "app-id": APP_ID,
        },
      })
      .then((res) => {
        setPosts(res?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleDelete = async (id) => {
    const urlHelper = `${BASE_URL}post/${id}`;
    await axios
      .delete(urlHelper, {
        headers: { "app-id": APP_ID },
      })
      .then(() => {
        notification.success({
          message: "Success!",
          description: "Successfully deleted post ",
          duration: 2,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => getPost());
  };

  useEffect(() => {
    getPost();
    handlePathname("dashboard");
  }, [filter, page]);

  return (
    <div style={{ padding: "0px 120px 20px 120px" }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <List
            pagination={{
              onChange: (e) => setPage(e),
              defaultCurrent: 1,
              page: page,
              total: posts?.total,
              pageSize: 10,
              align: "center",
            }}
            grid={{ column: 4 }}
            dataSource={posts?.data}
            renderItem={(item) => (
              <Col span={6} style={{ paddingTop: 20 }}>
                <PostCard postData={item} handleDelete={handleDelete} />
              </Col>
            )}
          />
        </Col>
      </Row>

      <FloatButton onClick={openDrawerNewPost} icon={<PlusOutlined />} type="primary" style={{ right: 94 }} />

      <Drawer title="Add Post" placement="right" onClose={() => false} open={openDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <DrawerPost ref={drawerPost} />
    </div>
  );
}
