import { Button } from "@mui/material";
import React from "react";

function Pendingforapproval({ pendingApprovalData,getPendingApprovalList}) {

    
  async function deletePendingData(data) {
    const updateStatus = await fetch("http://localhost:4000/deletePendingData", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getPendingApprovalList();
  }


  function statusColor(data) {
    if (data.status == "new") {
      return "blue";
    } else if (data.status == "pending") {
      return "red";
    } else if (data.status == "ready for delivery") {
      return "green";
    }
  }

  return (
    <div className="pendingApprovalSection">
         {pendingApprovalData.length != 0 ? (
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
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingApprovalData.map((data) => (
            <tr>
              <td>{pendingApprovalData.indexOf(data) + 1}</td>
              <td>{data.date}</td>
              <td>{data.bikeBrand}</td>
              <td>{data.model}</td>
              <td>{data.bikeNumber}</td>
              <td>{data.service}</td>
              <td>{data.kms}</td>
              <td style={{ color: statusColor(data) }}>{data.status}</td>
              <td>{data.cost}</td>
              <td>
                <Button color="error" onClick={() => deletePendingData(data)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       ) : (
        <div className="messageSection">No Data</div>
      )}
    </div>
  );
}

export default Pendingforapproval;
