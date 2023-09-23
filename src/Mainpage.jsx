import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Mainpage() {
  const userButtons = [
    {
      buttonName: "Admin",
      linkTo: "/adminLogin",
    },
    {
      buttonName: "Technician",
      linkTo:"/technicianLogin"
    },
  ];
  return (
    <div className="mainPage">
      <div className="title">SK Bike Care</div>
      <div className="helperText">Select User</div>
      {userButtons.map((options) => (
        <Link to={options.linkTo}>
          <Button style={{ fontSize: "30px" }}>{options.buttonName}</Button>
        </Link>
      ))}
    </div>
  );
}

export default Mainpage;
