import { forwardRef, useImperativeHandle, useState } from "react";
import { Row, Col, List, notification, Drawer, FloatButton } from "antd";

const DrawerPost = forwardRef((props, ref) => {
  const [wisataDetail, setWisataDetail] = useState({});
  useImperativeHandle(ref, () => ({
    showDrawer(data) {
      setWisataDetail(data);
      setVisible(true);
    },
  }));

  const [visible, setVisible] = useState();

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <Drawer title="Add Post" placement="right" visible={visible} onClose={closeDrawer} width="25%" forceRender={true}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
});

export default DrawerPost;
