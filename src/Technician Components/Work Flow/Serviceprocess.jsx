import { Button } from "@mui/material";
import React from "react";

function Serviceprocess({
  serviceProcessData,
  getServiceProcessData,
  getQcProcessData,
}) {
  async function moveToQc(data) {
    const updateStatus = await fetch("https://sk-bike-app-backend.onrender.com/moveToQc", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getServiceProcessData();
    getQcProcessData();
  }


  
  return (
    <div className="serviceProcessSection">
       {serviceProcessData.length != 0 ? (
  
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
          {serviceProcessData.map((data) => (
            <tr>
              <td>{serviceProcessData.indexOf(data) + 1}</td>
              <td>{data.date}</td>
              <td>{data.bikeBrand}</td>
              <td>{data.model}</td>
              <td>{data.bikeNumber}</td>
              <td>{data.service}</td>
              <td>{data.kms}</td>
              <td>{data.status}</td>
              <td>
                <Button onClick={() => moveToQc(data)}>Move to Q/C</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> ) : (
        <div className="messageSection">No New Requests</div>
      )}
    </div>
  );
}

export default Serviceprocess;
