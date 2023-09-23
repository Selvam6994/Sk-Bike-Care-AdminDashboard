import React, { useEffect, useState } from "react";

function Delivered() {
    const [serviceData, setServiceData] = useState([]);
    async function getBookingStatus() {
      const getServiceData = await fetch(
        `https://6301ec84c6dda4f287af4f45.mockapi.io/Students`,
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("authrisationToken"),
          },
        }
      );
      const jsonData = await getServiceData.json();
      setServiceData(jsonData);
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
    <table>
    <thead>
      <tr>
        <th>S.No</th>

        <th>Bike Brand</th>
        <th>Model</th>
        <th>Registration No.</th>
        <th>Service</th>
        <th>Kms</th>
      </tr>
    </thead>
    <tbody>
      {serviceData.map((data) => (
        <tr>
          <td>{serviceData.indexOf(data) + 1}</td>

          <td>{data.bikeBrand}</td>
          <td>{data.model}</td>
          <td>{data.bikeNumber}</td>
          <td>{data.service}</td>
          <td>{data.kms}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  )
}

export default Delivered