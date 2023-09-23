import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Paper } from "@mui/material";
import { Link, Outlet, json } from "react-router-dom";

function ShopfloorStatus({
  serviceQueueData,
  serviceProcessData,
  qcProcessData,
  getServiceQueueData,
  washingProcessData,
}) {
  const shopFloorStatusCards = [
    {
      name: "Service Queue",
      counts: serviceQueueData.length,
      color: "blue",
      linkTo: "",
    },
    {
      name: "Service Procees",
      counts: serviceProcessData.length,
      color: "yellow",
      linkTo: "serviceProcess",
    },
    {
      name: "Q/C",
      counts: qcProcessData.length,
      color: "purple",
      linkTo: "quality",
    },
    {
      name: "Water Wash",
      counts: washingProcessData.length,
      color: "red",
      linkTo: "waterWash",
    },
  ];

  useEffect(() => {
    getServiceQueueData();
  }, []);
  return (
    <>
      <div className="shopFloorPageSection">
        {shopFloorStatusCards.map((data) => (
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => onClickCards(data)}
          >
            <Link to={data.linkTo} style={{ textDecoration: "none" }}>
              <Paper
                elevation={8}
                className="shopFloorStatusCards"
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

export default ShopfloorStatus;
