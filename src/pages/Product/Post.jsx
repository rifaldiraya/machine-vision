import { useEffect, useState, useContext, useRef } from "react";
import { BASE_URL, APP_ID } from "../../helper/helper";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col, List, notification, FloatButton } from "antd";
import { DataContext } from "../../App";
import DrawerPost from "./DrawerPost";
import DrawerEditPost from "./DrawerEditPost";
import PostCard from "../../components/PostCard";
import axios from "axios";

export default function Post() {
  const { filter, handlePathname, globalUser } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([{}]);
  const drawerNewPost = useRef();
  const drawerEditPost = useRef();

  console.log(globalUser);

  const openDrawerNewPost = (users) => {
    drawerNewPost.current.showDrawer(users);
  };

  const openDrawerEditPost = (users) => {
    drawerEditPost.current.showDrawer(users);
  };

  async function getPost(identifier = "") {
    const urlHelper = filter === "" ? `${BASE_URL}post?${filter}limit=10&page=${page}` : `${BASE_URL}tag/${filter}/post?limit=10&page=${page}`;
    const urlFilterByUser =
      globalUser === undefined || globalUser === ""
        ? `${BASE_URL}post?${filter}limit=10&page=${page}`
        : `${BASE_URL}user/${globalUser}/post?limit=10&page=${page}`;

    await axios
      .get(identifier === "user" ? urlFilterByUser : urlHelper, {
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

  async function getUser(identifier, editData) {
    const urlHelper = `${BASE_URL}user`;
    await axios
      .get(urlHelper, {
        headers: {
          "app-id": APP_ID,
        },
      })
      .then((res) => {
        identifier === "ADD" ? openDrawerNewPost(res?.data?.data) : openDrawerEditPost(editData);
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

  useEffect(() => {
    getPost("user");
  }, [globalUser]);

  return (
    <div style={{ padding: "0px 120px 20px 120px" }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <List
            pagination={{
              onChange: (e) => setPage(e),
              defaultCurrent: 1,
              page: page,
              showSizeChanger: false,
              total: posts?.total,
              pageSize: 10,
              align: "center",
            }}
            grid={{ column: 4 }}
            dataSource={posts?.data}
            renderItem={(item) => (
              <Col span={6} style={{ paddingTop: 20 }}>
                <PostCard postData={item} handleDelete={handleDelete} getUser={getUser} />
              </Col>
            )}
          />
        </Col>
      </Row>
      <FloatButton onClick={() => getUser("ADD")} icon={<PlusOutlined />} type="primary" style={{ right: 94 }} />
      <DrawerPost ref={drawerNewPost} getPost={getPost} />
      <DrawerEditPost ref={drawerEditPost} getPost={getPost} />
    </div>
  );
}
