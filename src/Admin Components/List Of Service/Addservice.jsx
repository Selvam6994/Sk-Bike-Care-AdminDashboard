import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";

function Addservice() {
  const [cardDetails, setCardDetails] = useState("");
  const [serviceOptions, setServiceOptions] = useState([]);

  //   post service list data function
  const addServiceForm = useFormik({
    initialValues: {
      nameOfService: "",
      price: "",
      image: "",
      isForm: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const postData = await fetch("https://sk-bike-app-backend.onrender.com/postServiceList", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
        body: JSON.stringify(values),
      });
      showServiceData();


    },
  });

  //   get service list data function
  async function showServiceData() {
    const serviceList = await fetch("https://sk-bike-app-backend.onrender.com/getServiceList");
    const jsonData = await serviceList.json();
    if (jsonData.message == "No data available") {
      setServiceOptions([]);
      
    } else setServiceOptions(jsonData);
  }

  useEffect(() => {
    showServiceData();
  }, []);

  //   delete service list data function
  async function deleteServiceData(data) {
    const deleteData = await fetch("https://sk-bike-app-backend.onrender.com/deleteServiceList", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": sessionStorage.getItem("authrisationToken"),
      },
      body: JSON.stringify({ nameOfService: data.nameOfService }),
    });
    showServiceData()
  }

  const isForm = [
    {
      value: true,
      label: "Yes",
    },
    {
      value: false,
      label: "No",
    },
  ];

  const serviceCardImages = [
    {
      value: "Service Icon.png",
      label: "Service Image",
    },
    {
      value: "Maintenance Icon.png",
      label: "Periodic Maintenance",
    },
    {
      value: "Car Engine Icon.png",
      label: "Engine Icon",
    },
    {
      value: "Spares Icon.png",
      label: "Spares Icon",
    },
    {
      value: "Accidental Icon.png",
      label: "Accidental Icon",
    },
    {
      value: "Car Wash Icon.png",
      label: "Wash Icon",
    },
    {
      value: "Discount Icon.png",
      label: "Discount Icon",
    },
  ];

  return (
    <div className="listOfServices">
      <div className="servicesOffered">
        {serviceOptions.map((data) => (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onMouseEnter={() => setCardDetails(data.nameOfService)}
            onMouseLeave={() => setCardDetails()}
          >
            <Paper
              elevation={8}
              className="serviceCards"
              style={{ borderRadius: "20px", backgroundColor: "#EDCD00" }}
            >
              <img src={data.imageLink} alt="" />
              {cardDetails == data.nameOfService ? (
                <div className="seviceCardDetails">
                  <span>{data.nameOfService}</span>

                  <span>
                    Starts @{" "}
                    <span style={{ fontSize: "25px", color: "#EDCD00" }}>
                      Rs.{data.price}/-
                    </span>
                  </span>
                  <Button
                    onClick={() => deleteServiceData(data) && showServiceData()}
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                ""
              )}
            </Paper>
          </motion.div>
        ))}
      </div>
      <div className="addService">
        <span>Add Service Form</span>
        <form className="addServiceForm" onSubmit={addServiceForm.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            label="Name of service"
            type="text"
            name="nameOfService"
            variant="standard"
            onChange={addServiceForm.handleChange}
            onBlur={addServiceForm.handleBlur}
          />
          <TextField
            fullWidth
            id="price"
            label="Price"
            type="number"
            name="price"
            variant="standard"
            onChange={addServiceForm.handleChange}
            onBlur={addServiceForm.handleBlur}
          />

          <TextField
            fullWidth
            select
            id="image"
            label="Select"
            helperText="Select Image"
            name="image"
            defaultValue=""
            variant="standard"
            onChange={addServiceForm.handleChange}
          >
            {serviceCardImages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            id="isForm"
            label="Select"
            helperText="Display form?"
            name="isForm"
            defaultValue=""
            variant="standard"
            onChange={addServiceForm.handleChange}
          >
            {isForm.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit">Add</Button>
        </form>
      </div>
    </div>
  );
}

export default Addservice;

// "../src/assets/App Images/Service Page Icon/Service Icon.png";
// "../src/assets/App Images/Service Page Icon/Maintenance Icon.png";
// "../src/assets/App Images/Service Page Icon/Car Engine Icon.png";
// "../src/assets/App Images/Service Page Icon/Spares Icon.png";
// "../src/assets/App Images/Service Page Icon/Accidental Icon.png";
//  "../src/assets/App Images/Service Page Icon/Car Wash Icon.png";
// "../src/assets/App Images/Service Page Icon/Discount Icon.png";
//       type: "offers",
