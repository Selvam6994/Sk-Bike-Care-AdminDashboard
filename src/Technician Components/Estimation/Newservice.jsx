import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Paper } from "@mui/material";
import { Link, Outlet, json } from "react-router-dom";

function Newservice({serviceData,costValidationList,customervalidationData,pendingApprovalData}) {

  const estimationStatusCards = [
    {
      name: "Service Request",
      counts: serviceData.length,
      color: "blue",
      linkTo: "",
    },
    {
      name: "Cost Estimation",
      counts: costValidationList.length,
      color: "yellow",
      linkTo: "costEstimation",
    },
    {
      name: "Customer Approval",
      counts: customervalidationData.length,
      color: "purple",
      linkTo: "customerApproval",
    },
    {
      name: "Pending",
      counts: pendingApprovalData.length,
      color: "red",
      linkTo: "pendingApproval",
    },
  ];
  return (
    <>
      <div className="estimationPageSection">
        {estimationStatusCards.map((data) => (
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => onClickCards(data)}
          >
            <Link to={data.linkTo} style={{ textDecoration: "none" }}>
              <Paper
                elevation={8}
                className="estimationStatusCards"
                style={{ borderLeft: `5px solid ${data.color}` }}
              >
                <span>{data.name}</span>
                <span>{data.counts}</span>
              </Paper>
            </Link>
          </motion.div>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default Newservice;
