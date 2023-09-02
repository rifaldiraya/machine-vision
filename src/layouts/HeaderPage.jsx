import { useContext, useEffect, useState } from "react";
import { Input, Select } from "antd";
import { DataContext } from "../App";
import { BASE_URL, APP_ID } from "../helper/helper";
import axios from "axios";
import * as color from "../assets/color";

const { Search } = Input;

export default function HeaderPage() {
  const { handleFilter, pathname, handleUser } = useContext(DataContext);
  const [user, setUser] = useState();

  async function getUser() {
    const urlHelper = `${BASE_URL}user`;
    await axios
      .get(urlHelper, {
        headers: {
          "app-id": APP_ID,
        },
      })
      .then((res) => {
        let temp = res?.data?.data;
        let helper = temp.reduce((acc, item) => {
          acc.push({ value: item.id, label: item.firstName });
          return acc;
        }, []);
        setUser(helper);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div style={{ padding: "0px 0px 0px 120px", backgroundColor: "#F5F5F5" }}>
        <div style={{ display: "-webkit-inline-box", backgroundColor: color.blueSoft, color: "white", width: "150px" }}>
          <p style={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>Machine Vision</p>
        </div>
      </div>
      {pathname === "/dashboard" || pathname === "/" ? (
        <div style={{ padding: "40px 120px 0px 120px", display: "flex", justifyContent: "space-between" }}>
          <Search style={{ width: 300 }} placeholder="search by tag" allowClear enterButton="Search" size="large" onSearch={(e) => handleFilter(e)} />
          <Select
            placeholder="filter by user"
            style={{
              width: 300,
            }}
            allowClear
            onChange={(value) => handleUser(value)}
            options={user ? user : []}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
