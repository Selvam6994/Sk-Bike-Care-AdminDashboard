import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function Cancelled({
  cancelledEnquiries,
  getCancelledEnquiries,
  gettotalEnquiryData,
}) {
  function statusColor(data) {
    if (data.status == "cancelled") {
      return "red";
    }
  }

  async function deleteCancelledEnquiry(data) {
    const deleteEnquiryData = await fetch(
      "https://sk-bike-app-backend.onrender.com/deleteCancelledEnquiry", 
      {
        method: "DELETE",
        headers: { "Content-type": "application/json","x-auth-token": sessionStorage.getItem("authrisationToken") },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          about: data.about,
          message: data.message,
          status: data.status,
        }),
      }
    );
    getCancelledEnquiries();
    gettotalEnquiryData();
  }
  return (
    <div className="enquiryTableSection">
      {cancelledEnquiries.length != 0 ? (
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
            {cancelledEnquiries.map((data) => (
              <tr>
                <td>{cancelledEnquiries.indexOf(data) + 1}</td>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.about}</td>
                <td>{data.message}</td>
                <td style={{ color: statusColor(data) }}>{data.status}</td>
                <td>
                  <Button
                    color="error"
                    onClick={() => deleteCancelledEnquiry(data)}
                  >
                    Delete
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

export default Cancelled;
