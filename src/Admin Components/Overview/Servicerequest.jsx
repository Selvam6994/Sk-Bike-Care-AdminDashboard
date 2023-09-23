import React, { useEffect, useState } from "react";

function Servicerequest() {
  const [serviceData, setServiceData] = useState([]);
  async function getBookingStatus() {
    const getServiceData = await fetch(
      `http://localhost:4000/serviceRequests`,
      {
        headers: {
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
      }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setServiceData([]);
    } else {
      setServiceData(jsonData);
    }
  }

  useEffect(() => {
    getBookingStatus();
  }, []);

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
    <div className="overViewTableSection">
      {serviceData.length!=0?<table>
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
            </tr>
          ))}
        </tbody>
      </table>:<div className="messageSection">No New Enquries</div>}
      
    </div>
  );
}

export default Servicerequest;
