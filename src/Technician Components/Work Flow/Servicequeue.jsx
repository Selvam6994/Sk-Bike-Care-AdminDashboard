import { Button } from "@mui/material";
import React from "react";

function Servicequeue({
  serviceQueueData,
  getServiceQueueData,
  getServiceProcessData,
}) {
  async function moveToService(data) {
    const updateStatus = await fetch("http://localhost:4000/moveToService", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getServiceQueueData();
    getServiceProcessData();
  }
  return (
    <div className="serviceQueueSection">
      {serviceQueueData.length != 0 ? (
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
            {serviceQueueData.map((data) => (
              <tr>
                <td>{serviceQueueData.indexOf(data) + 1}</td>
                <td>{data.date}</td>
                <td>{data.bikeBrand}</td>
                <td>{data.model}</td>
                <td>{data.bikeNumber}</td>
                <td>{data.service}</td>
                <td>{data.kms}</td>
                <td>{data.status}</td>
                <td>
                  <Button onClick={() => moveToService(data)}>
                    Move to Service
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

export default Servicequeue;
