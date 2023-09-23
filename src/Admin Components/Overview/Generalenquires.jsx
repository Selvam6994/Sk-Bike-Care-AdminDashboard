import React, { useEffect, useState } from "react";

function Generalenquires() {
  const [enquiryData, setEnquiryData] = useState([]);
  async function getEnquiryData() {
    const getServiceData = await fetch(
      `http://localhost:4000/totalEnquries`,
      {
        headers: {
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
      }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setEnquiryData([]);
    } else setEnquiryData(jsonData);
  }

  useEffect(() => {
    getEnquiryData();
  }, []);

  function statusColor(data) {
    if (data.status == "new") {
      return "blue";
    } else if (data.status == "contacted") return "purple";
    else if (data.status == "converted") return "green";
    else if (data.status == "cancelled") return "red";
  }
  return (
    <div className="enquiryTableSection">
      {enquiryData.length != 0 ? (
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
            {enquiryData.map((data) => (
              <tr>
                <td>{enquiryData.indexOf(data) + 1}</td>
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

export default Generalenquires;
