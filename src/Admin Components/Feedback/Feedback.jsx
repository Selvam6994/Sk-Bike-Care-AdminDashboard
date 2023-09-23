import React, { useEffect, useState } from "react";

function Feedback() {
  const [feedBackData, setFeedBackData] = useState([]);
  async function getSignedupclientsData() {
    const getfeedBackData = await fetch("http://localhost:4000/getFeedback",  {
      headers: {
        "x-auth-token": sessionStorage.getItem("authrisationToken"),
      },
    });
    const jsonData = await getfeedBackData.json();
    if (jsonData.length == 0) {
      setFeedBackData([]);
    } else {
      setFeedBackData(jsonData);
    }
  }

  useEffect(() => {
    getSignedupclientsData();
  }, []);

  return (
    <div className="feedbackTableSection">
      {feedBackData.length != 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Feedback</th>
            </tr>
          </thead>

          <tbody>
            {feedBackData.map((data) => (
              <tr>
                <td>{feedBackData.indexOf(data) + 1}</td>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="messageSection">No Data Found</div>
      )}
    </div>
  );
}

export default Feedback;
