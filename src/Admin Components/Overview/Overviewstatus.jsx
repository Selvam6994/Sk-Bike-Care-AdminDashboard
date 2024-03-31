import { Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

export default function Overviewstatus() {

    // total enquries count
    const [totalEnquires, setTotalEnquires] = useState([]);
    async function getTotalEnquires() {
      const getServiceData = await fetch(
        `https://sk-bike-app-backend.onrender.com/totalEnquries`,
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("authrisationToken"),
          },
        }
      );
      const jsonData = await getServiceData.json();
      setTotalEnquires(jsonData.length);
    }

    useEffect(() => {
      getTotalEnquires();
      // getNewEnquires();
      // getcontactedEnquires();
      // getConvertedEnquires();
      // getCancelledEnquries();
    }, []);
  const statusCards = [
    {
      name: "Total Requests",
      counts: 28,
      color: "blue",
      linkTo: "",
    },
    {
      name: "Service Requests",
      counts: 28,
      color: "orange",
      linkTo: "",
    },
    {
      name: "Service Taken",
      counts: 15,
      color: "yellow",
      linkTo: "serviceTaken",
    },
    {
      name: "Deleivered",
      counts: 12,
      color: "green",
      linkTo: "delivered",
    },
    {
      name: "Enquires",
      counts: totalEnquires,
      color: "purple",
      linkTo: "overviewEnquires",
    },
  ];

  return (
    <>
      <div className="statusCardSection">
        {statusCards.map((data) => (
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => onClickCards(data)}
          >
            <Link to={data.linkTo} style={{ textDecoration: "none" }}>
              <Paper
                elevation={8}
                className="statusCards"
                style={{ borderLeft: `5px solid ${data.color}` }}
              >
                <span>{data.name}</span>
                <span>{data.counts}</span>
              </Paper>
            </Link>
          </motion.div>
        ))}
      </div>{" "}
      <Outlet />
    </>
  );
}
