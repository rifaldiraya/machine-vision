import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";
import { Row, Col, notification, Drawer, InputNumber, Form, Input, Button, Select, Space, Tooltip, Tag, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { APP_ID, BASE_URL } from "../../helper/helper";
import axios from "axios";

const DrawerEditPost = forwardRef(({ getPost }, ref) => {
  const [usersData, setUsersData] = useState({});
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const { TextArea } = Input;
  const { token } = theme.useToken();
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };

  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  useImperativeHandle(ref, () => ({
    showDrawer(data) {
      setUsersData(data);
      setVisible(true);
    },
  }));

  const [visible, setVisible] = useState();

  const closeDrawer = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    const { text, image, likes, owner } = values;
    let data = {
      text,
      image,
      likes,
      tags,
      owner,
    };
    axios
      .put(`${BASE_URL}post/${usersData.id}`, data, { headers: { "app-id": APP_ID } })
      .then(() => {
        setVisible(false);
        notification.success({
          message: "Success!",
          description: "Successfully Edit Post",
          duration: 2,
        });
        getPost();
      })
      .catch((error) => {
        notification.error({
          message: "Failed!",
          description: "Double Check Your Fields",
          duration: 2,
        });
      });
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  useEffect(() => {
    form.setFieldsValue({
      text: usersData.text,
      image: usersData.image,
      likes: usersData.likes,
      owner: usersData?.owner?.firstName,
    });
    setTags(usersData.tags);
  }, [usersData]);

  return (
    <Drawer title="Edit Post" placement="right" open={visible} onClose={closeDrawer} width="25%" forceRender={true}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="owner" label="Owner" rules={[{ message: "Input owner's name" }]}>
          <Select
            style={{
              width: "100%",
            }}
            disabled
          />
        </Form.Item>
        <Form.Item name="text" label="Description/Text" rules={[{ message: "Input description" }]}>
          <TextArea rows={4} className="material-input" placeholder="input description" />
        </Form.Item>
        <Form.Item name="image" label="Image Url" rules={[{ message: "Input image url" }]}>
          <Input className="material-input" placeholder="input image url" />
        </Form.Item>
        <Form.Item name="likes" label="Like">
          <InputNumber min={0} style={{ width: "100%" }} defaultValue={0} placeholder="input like" />
        </Form.Item>
        <Form.Item name="tags" label="Tag" rules={[{ message: "Input tag" }]}>
          <Space size={[0, 8]} wrap>
            {tags?.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable={true}
                  style={{
                    userSelect: "none",
                  }}
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={(e) => {
                      if (index !== 0) {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag style={tagPlusStyle} onClick={showInput}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </Space>
        </Form.Item>
        <Row>
          <Col span={12}></Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button type="primary" style={{ marginRight: 0, width: 150, borderRadius: 6 }} htmlType="submit">
              Edit Post
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
});

DrawerEditPost.displayName = "DrawerEditPost";

export default DrawerEditPost;
