import { Button, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function Adminhomepage() {
  const navigate = useNavigate();

  var token = sessionStorage.getItem("authrisationToken");
  var decoded = jwt_decode(token);
  const [adminData, setAdminData] = useState();
  async function getAdminData() {
    const getAdminData = await fetch(
      `http://localhost:4000/userAdminData/${decoded.email}`,
      {
        headers: {
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
      }
    );
    const jsonData = await getAdminData.json();
    setAdminData(jsonData.name);
    console.log(adminData);
  }

  useEffect(() => {
    getAdminData();
  }, []);

  const sideNavButtons = [
 
    {
      name: "Enquiries",
      isMenuButton: true,
      linKTo: "enquires",
    },
    {
      name: "List of Services",
      isMenuButton: false,
      linKTo: "addService",
    },
    {
      name: "Custumers Info",
      isMenuButton: false,
      linKTo: "customerList",
    },
    {
      name: "Feedbacks",
      isMenuButton: false,
      linKTo: "feedBack",
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
      {/* admin navigation bar */}
      <div className="sideNavBar">
        <div className="pageDetails">
          <span>Admin Dashboard</span>
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
          className="adminPageTopBar"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
          elevation={8}
        >
          <span>Date:{getDate()} </span>

          <span>{adminData}</span>
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

export default Adminhomepage;
