import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Paper } from "@mui/material";
import { Link, Outlet, json } from "react-router-dom";

function BillingStatus({
  billingProcessData,
  deliveredData,
  getBillingProcessData,
}) {
  const BillingStatusCards = [
    {
      name: "Billing Queue",
      counts: billingProcessData.length,
      color: "blue",
      linkTo: "",
    },
    {
      name: "Delivered",
      counts: deliveredData.length,
      color: "yellow",
      linkTo: "delivered",
    },
  ];
  useEffect(() => {
    getBillingProcessData();
  }, []);

  return (
    <>
      <div className="billingPageSection">
        {BillingStatusCards.map((data) => (
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => onClickCards(data)}
          >
            <Link to={data.linkTo} style={{ textDecoration: "none" }}>
              <Paper
                elevation={8}
                className="billingStatusCards"
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

export default BillingStatus;
