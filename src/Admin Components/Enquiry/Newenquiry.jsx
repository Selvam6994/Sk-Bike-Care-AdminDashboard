import { Button } from "@mui/material";
import React from "react";

function Newenquiry({ newEnquiries, getNewEnquiriesData, getContactedData }) {
  function statusColor(data) {
    if (data.status == "new") {
      return "blue";
    }
  }

  async function getDetails(data) {
    const updateStatus = await fetch("https://sk-bike-app-backend.onrender.com/enquiryContacted",    {
      method: "PUT",
      headers: { "Content-type": "application/json" , "x-auth-token": sessionStorage.getItem("authrisationToken")},
      body: JSON.stringify(data),
    });
    getNewEnquiriesData();
    getContactedData();
  }

  return (
    <div className="enquiryTableSection">
      {newEnquiries.length != 0 ? (
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
            {newEnquiries.map((data) => (
              <tr>
                <td>{newEnquiries.indexOf(data) + 1}</td>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.about}</td>
                <td>{data.message}</td>
                <td style={{ color: statusColor(data) }}>{data.status}</td>
                <td>
                  <Button
                    style={{ color: "purple" }}
                    onClick={() => getDetails(data)}
                  >
                    Contact
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

export default Newenquiry;
