import { Button } from "@mui/material";
import React from "react";

function Customerapproval({
  customervalidationData,
  getCustomerValidationList,
  getPendingApprovalList,
  getServiceQueueData
}) {
  async function approvedRequest(data) {
    const updateStatus = await fetch("http://localhost:4000/approvedRequest", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getCustomerValidationList();
    getServiceQueueData()
  }

  async function approvalPending(data) {
    const updateStatus = await fetch("http://localhost:4000/pendingStatus", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    getCustomerValidationList();
    getPendingApprovalList();
  }

  function statusColor(data) {
   if (data.status == "customer approval") {
      return "purple";
    }
  }
  return (
    <div className="customerApprovalSection">
      {customervalidationData.length != 0 ? (
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
            {customervalidationData.map((data) => (
              <tr>
                <td>{customervalidationData.indexOf(data) + 1}</td>
                <td>{data.date}</td>
                <td>{data.bikeBrand}</td>
                <td>{data.model}</td>
                <td>{data.bikeNumber}</td>
                <td>{data.service}</td>
                <td>{data.kms}</td>
                <td style={{ color: statusColor(data) }}>{data.status}</td>
                <td>{data.cost}</td>
                <td>
                  <Button onClick={() => approvedRequest(data)}>
                    Approved
                  </Button>
                  /
                  <Button color="error" onClick={() => approvalPending(data)}>
                    Pending
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

export default Customerapproval;
