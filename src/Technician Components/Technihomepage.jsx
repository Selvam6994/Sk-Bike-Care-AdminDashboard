import { Button, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function Technihomepage() {
  const navigate = useNavigate();

  var token = sessionStorage.getItem("authrisationToken");
  var decoded = jwt_decode(token);
  console.log(decoded.email);
  const [techniData, setTechniData] = useState();

  async function getTechniData() {
    const getServiceData = await fetch(
      `https://sk-bike-app-backend.onrender.com/userTechniData/${decoded.email}`
    );
    const jsonData = await getServiceData.json();
    setTechniData(jsonData.name);
  }

  useEffect(() => {
    getTechniData();
  }, []);

  const sideNavButtons = [
    {
      name: "Estimation",
      linKTo: "/techniHome",
    },
    {
      name: "Shop floor",
      linKTo: "shopFloor",
    },
    {
      name: "Billing & Delivery",
      linKTo: "billing",
    },
    {
      name: "Inventory",
      linKTo: "#",
    },
  ];

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }
  return (
    <div className="homePage">
      {/* techni navigation bar */}
      <div className="sideNavBar">
        <div className="pageDetails">
          <span>Technicians Dashboard</span>
        </div>
        <div className="navButtonSection">
          {sideNavButtons.map((details) => (
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link to={details.linKTo} style={{ textDecoration: "none" }}>
                <Paper className="sideNavButtons">{details.name}</Paper>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Paper className="contentSection" elevation={8}>
        <Paper
          className="techniPageTopBar"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
          elevation={8}
        >
          <span>Date:{getDate()} </span>

          <span>{techniData}</span>
          <Button
            onClick={() =>
              sessionStorage.clear("authrisationToken") || navigate("/")
            }
          >
            Log Out
          </Button>
        </Paper>
        <Outlet />
      </Paper>
    </div>
  );
}

export default Technihomepage;
