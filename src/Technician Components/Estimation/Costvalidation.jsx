import { Button, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";

function Costvalidation({
  costValidationList,
  getCostValidationList,
  getCustomerValidationList,
}) {
  const [addCostForm, setCostForm] = useState(false);
  const [getData, setData] = useState();
  function statusColor(data) {
    if (data.status == "estimating cost") {
      return "orange";
    }
  }

  const costForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      bikeBrand: "",
      model: "",
      bikeNumber: "",
      kms: "",
      date: "",
      status: "",
      cost: "",
    },

    onSubmit: async (values) => {
      const addCost = await fetch("https://sk-bike-app-backend.onrender.com/addCost", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      getCostValidationList();
      setCostForm(false);
      getCustomerValidationList();
    },
  });

  function setServiceData(data) {
    costForm.setValues({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      bikeBrand: data.bikeBrand,
      model: data.model,
      bikeNumber: data.bikeNumber,
      kms: data.kms,
      date: data.date,
      status: data.status,
      cost: data.cost,
    });
  }

  return (
    <div className="costValidationSection">
      {costValidationList.length != 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Bike Brand</th>
              <th>Model</th>
              <th>Registration No.</th>
              <th>Service</th>
              <th>Kms</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {costValidationList.map((data) => (
              <tr>
                <td>{costValidationList.indexOf(data) + 1}</td>
                <td>{data.date}</td>
                <td>{data.bikeBrand}</td>
                <td>{data.model}</td>
                <td>{data.bikeNumber}</td>
                <td>{data.service}</td>
                <td>{data.kms}</td>
                <td style={{ color: statusColor(data) }}>{data.status}</td>
                <td>
                  <Button
                    onClick={() =>
                      setCostForm(true) || setData(data) || setServiceData(data)
                    }
                  >
                    Add Cost
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="messageSection">No Data</div>
      )}
      {/* ) : (
      <div className="messageSection">No New Enquries</div>
    )} */}
      {addCostForm ? (
        <Paper className="addFormSection">
          <div className="closeButton">
            <IconButton color="error" onClick={() => setCostForm(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <form className="addCostForm" onSubmit={costForm.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              type="text"
              value={getData.name}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              value={getData.email}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              type="number"
              value={getData.phone}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="service"
              label="Service"
              type="text"
              value={getData.service}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="bikeBrand"
              label="Bike Brand"
              type="text"
              value={getData.bikeBrand}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="model"
              label="Model"
              type="text"
              value={getData.model}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="bikeNumber"
              label="Reg.Number"
              type="text"
              value={getData.bikeNumber}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="kms"
              label="Kms Driven"
              type="number"
              value={getData.kms}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="date"
              type="text"
              label="Date"
              value={getData.date}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="status"
              label="Service Status"
              type="text"
              value={getData.status}
              variant="standard"
              onChange={costForm.handleChange}
            />
            <TextField
              fullWidth
              id="cost"
              name="cost"
              label="Cost"
              type="number"
              variant="standard"
              onChange={costForm.handleChange}
              onBlur={costForm.handleBlur}
            />

            <Button
              type="submit"
              disabled={costForm.values.cost != "" ? false : true}
            >
              Update
            </Button>
          </form>
        </Paper>
      ) : (
        ""
      )}
    </div>
  );
}

export default Costvalidation;
