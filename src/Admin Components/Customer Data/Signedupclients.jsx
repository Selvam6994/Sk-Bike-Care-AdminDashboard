import React, { useEffect, useState } from "react";

function Signedupclients() {
  const [userData, setUserData] = useState([]);
  async function getSignedupclientsData() {
    const getUserData = await fetch("http://localhost:4000/getUserData",  {
      headers: {
        "x-auth-token": sessionStorage.getItem("authrisationToken"),
      },
    });
    const jsonData = await getUserData.json();
    if (jsonData.length == 0) {
      setUserData([]);
    } else {
      setUserData(jsonData);
    }
  }

  useEffect(() => {
    getSignedupclientsData();
  }, []);

  return (
    <div className="userDataTableSection">
      {userData.length != 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {userData.map((data) => (
              <tr>
                <td>{userData.indexOf(data) + 1}</td>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="messageSection">No User Found</div>
      )}
    </div>
  );
}

export default Signedupclients;
