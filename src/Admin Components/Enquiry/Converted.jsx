import React, { useEffect, useState } from "react";
function Converted({ convertedEnquiries }) {


  function statusColor(data) {
    if (data.status == "converted") {
      return "green";
    }
  }
  return (
    <div className="enquiryTableSection">
      {convertedEnquiries.length != 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Catagory</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {convertedEnquiries.map((data) => (
              <tr>
                <td>{convertedEnquiries.indexOf(data) + 1}</td>
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

export default Converted;
