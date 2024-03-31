import { Button } from "@mui/material";
import React from "react";

function Newservicerequest({ serviceData, getBookingStatus,getCostValidationList}) {
  async function getDetails(data) {
    const updateStatus = await fetch("https://sk-bike-app-backend.onrender.com/costEstimation", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getBookingStatus();
    getCostValidationList()
  }

  function statusColor(data) {
    if (data.status == "new") {
      return "blue";
    } else if (data.status == "taken for work") {
      return "yellow";
    } else if (data.status == "ready for delivery") {
      return "green";
    }
  }
  return (
    <div className="NewServiceRequestSection">
      {serviceData.length != 0 ? (
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
            {serviceData.map((data) => (
              <tr>
                <td>{serviceData.indexOf(data) + 1}</td>
                <td>{data.date}</td>
                <td>{data.bikeBrand}</td>
                <td>{data.model}</td>
                <td>{data.bikeNumber}</td>
                <td>{data.service}</td>
                <td>{data.kms}</td>
                <td style={{ color: statusColor(data) }}>{data.status}</td>
                <td>
                  <Button onClick={() => getDetails(data)}>
                    Cost Estimation
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="messageSection">No New Requests</div>
      )}
    </div>
  );
}

export default Newservicerequest;
