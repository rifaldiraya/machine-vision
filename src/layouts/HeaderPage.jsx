import { useContext } from "react";
import { Col, Input } from "antd";
import { DataContext } from "../App";
import * as color from "../assets/color";

const { Search } = Input;

export default function HeaderPage() {
  const { handleFilter, pathname } = useContext(DataContext);

  return (
    <>
      <div style={{ padding: "0px 0px 0px 120px", backgroundColor: "#F5F5F5" }}>
        <div style={{ display: "-webkit-inline-box", backgroundColor: color.blueSoft, color: "white", width: "150px" }}>
          <p style={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>Machine Vision</p>
        </div>
      </div>
      {pathname === "/dashboard" || pathname === "/" ? (
        <div style={{ padding: "40px 0px 0px 120px" }}>
          <Col span={5}>
            <Search placeholder="search by tag" allowClear enterButton="Search" size="large" onSearch={(e) => handleFilter(e)} />
          </Col>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
