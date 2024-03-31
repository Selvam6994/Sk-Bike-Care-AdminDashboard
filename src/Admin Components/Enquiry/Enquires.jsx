import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Paper } from "@mui/material";
import { Link, Outlet, json } from "react-router-dom";

function Enquires({
  totalEnquires,
  newEnquiries,
  contactedEnquiries,
  convertedEnquiries,
  cancelledEnquiries,
}) {
  const [newEnquires, setNewEnquires] = useState([]);
  async function getNewEnquires() {
    const getServiceData = await fetch(`https://sk-bike-app-backend.onrender.com/newEnquiry`, {});
    const jsonData = await getServiceData.json();
    setNewEnquires(jsonData.length);
  }
  // contactedEnquires enquries count
  const [contactedEnquires, setContactedEnquires] = useState([]);
  async function getcontactedEnquires() {
    const getServiceData = await fetch(
      `https://sk-bike-app-backend.onrender.com/contactedEnquiry`,
      {}
    );
    const jsonData = await getServiceData.json();
    setContactedEnquires(jsonData.length);
  }

  // converted enquries count
  const [convertedEnquires, setConvertedEnquires] = useState([]);
  async function getConvertedEnquires() {
    const getServiceData = await fetch(
      `https://sk-bike-app-backend.onrender.com/convertedEnquiry`,
      {}
    );
    const jsonData = await getServiceData.json();
    setConvertedEnquires(jsonData.length);
  }

  // cancelled enquries count
  const [cancelledEnquries, setCancelledEnquries] = useState([]);
  async function getCancelledEnquries() {
    const getServiceData = await fetch(
      `https://sk-bike-app-backend.onrender.com/cancelledEnquiry`,
      {}
    );
    const jsonData = await getServiceData.json();
    setCancelledEnquries(jsonData.length);
  }
  useEffect(() => {
    getNewEnquires();
    getcontactedEnquires();
    getConvertedEnquires();
    getCancelledEnquries();
  }, []);
  const enquiryStatusCards = [
    {
      name: "Total Enquires",
      counts: totalEnquires.length,
      color: "purple",
      linkTo: "",
    },
    {
      name: "New",
      counts: newEnquiries.length,
      color: "blue",
      linkTo: "new",
    },
    {
      name: "Contacted",
      counts: contactedEnquiries.length,
      color: "purple",
      linkTo: "contacted",
    },
    {
      name: "Converted",
      counts: convertedEnquiries.length,
      color: "green",
      linkTo: "converted",
    },
    {
      name: "Canclled",
      counts: cancelledEnquiries.length,
      color: "red",
      linkTo: "cancelled",
    },
  ];

  return (
    <>
      <div className="enquiryStatusSection">
        {enquiryStatusCards.map((data) => (
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => onClickCards(data)}
          >
            <Link to={data.linkTo} style={{ textDecoration: "none" }}>
              <Paper
                elevation={8}
                className="enquiryStatusCards"
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

export default Enquires;
