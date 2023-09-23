import { Button } from "@mui/material";
import React from "react";

function Billingqueue({
  billingProcessData,
  getBillingProcessData,
  getDeliveredData,
}) {
  async function moveToDelivery(data) {
    const updateStatus = await fetch("http://localhost:4000/delivery", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getBillingProcessData();
    getDeliveredData();
  }

  return (
    <div className="billingProcessSection">
      {billingProcessData.length != 0 ? (
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
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {billingProcessData.map((data) => (
              <tr>
                <td>{billingProcessData.indexOf(data) + 1}</td>
                <td>{data.date}</td>
                <td>{data.bikeBrand}</td>
                <td>{data.model}</td>
                <td>{data.bikeNumber}</td>
                <td>{data.service}</td>
                <td>{data.kms}</td>
                <td>{data.cost}</td>
                <td>{data.status}</td>
                <td>
                  <Button onClick={() => moveToDelivery(data)}>Delivery</Button>
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

export default Billingqueue;
