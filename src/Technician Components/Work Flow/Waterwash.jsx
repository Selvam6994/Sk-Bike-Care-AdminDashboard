import { Button } from "@mui/material";
import React from "react";

function Waterwash({ washingProcessData, getWashingProcessData }) {
  async function moveToBilling(data) {
    const updateStatus = await fetch("http://localhost:4000/billing", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getWashingProcessData();
  }
  return (
    <div className="washingProcessSection">
      {washingProcessData.length != 0 ? (
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
            {washingProcessData.map((data) => (
              <tr>
                <td>{washingProcessData.indexOf(data) + 1}</td>
                <td>{data.date}</td>
                <td>{data.bikeBrand}</td>
                <td>{data.model}</td>
                <td>{data.bikeNumber}</td>
                <td>{data.service}</td>
                <td>{data.kms}</td>
                <td>{data.status}</td>
                <td>
                  <Button color="secondary" onClick={() => moveToBilling(data)}>
                    Move for Billing
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

export default Waterwash;
