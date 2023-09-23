import React, { useEffect, useState } from "react";

function Totalenquires({ totalEnquires }) {
  function statusColor(data) {
    if (data.status == "new") {
      return "blue";
    } else if (data.status == "contacted") return "purple";
    else if (data.status == "converted") return "green";
    else if (data.status == "cancelled") return "red";
  }
  return (
    <div className="enquiryTableSection">
      {totalEnquires.length != 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {totalEnquires.map((data) => (
              <tr>
                <td>{totalEnquires.indexOf(data) + 1}</td>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.about}</td>
                <td>{data.message}</td>
                <td style={{ color: statusColor(data) }}>{data.status}</td>
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

export default Totalenquires;
