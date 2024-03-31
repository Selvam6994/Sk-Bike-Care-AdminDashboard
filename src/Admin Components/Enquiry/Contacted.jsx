import { Button, IconButton, MenuItem, Paper, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

function Contacted({
  contactedEnquiries,
  getContactedData,
  getConvertedEnquiries,
  getCancelledEnquiries,
}) {
  async function getDetails(data) {
    const updateStatus = await fetch("https://sk-bike-app-backend.onrender.com/enquiryConverted", {
      method: "PUT",
      headers: { "Content-type": "application/json","x-auth-token": sessionStorage.getItem("authrisationToken")},
      body: JSON.stringify(data),
    });
    getContactedData();
    getConvertedEnquiries();
  }

  async function cancelEnquiry(data) {
    const updateStatus = await fetch("https://sk-bike-app-backend.onrender.com/enquiryCancelled", {
      method: "PUT",
      headers: { "Content-type": "application/json","x-auth-token": sessionStorage.getItem("authrisationToken") },
      body: JSON.stringify(data),
    });
    getContactedData();
    getCancelledEnquiries();
  }

  function statusColor(data) {
    if (data.status == "contacted") {
      return "purple";
    }
  }

  return (
    <div className="enquiryTableSection">
      {contactedEnquiries.length != 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Catagory</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactedEnquiries.map((data) => (
              <tr>
                <td>{contactedEnquiries.indexOf(data) + 1}</td>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.about}</td>
                <td>{data.message}</td>
                <td style={{ color: statusColor(data) }}>{data.status}</td>
                <td>
                  <Button
                    style={{ color: "green" }}
                    onClick={() => getDetails(data)}
                  >
                    Convert
                  </Button>
                  /
                  <Button
                    style={{ color: "red" }}
                    onClick={() => cancelEnquiry(data)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="messageSection">No New Enquries</div>
      )}
    </div>
  );
}

export default Contacted;
