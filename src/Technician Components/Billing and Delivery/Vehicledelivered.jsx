import React from 'react'

function Vehicledelivered({deliveredData}) {
  return (
    <div className="billingProcessSection">
    {deliveredData.length != 0 ? (
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
            <th>Cost</th>
            <th>Delivery Date</th>
            <th>Status</th>
           
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveredData.map((data) => (
            <tr>
              <td>{deliveredData.indexOf(data) + 1}</td>
              <td>{data.date}</td>
              <td>{data.bikeBrand}</td>
              <td>{data.model}</td>
              <td>{data.bikeNumber}</td>
              <td>{data.service}</td>
              <td>{data.kms}</td>
              <td>{data.cost}</td>
              <td>{data.deliveryDate}</td>
              <td>{data.status}</td>
              <td>
                <a href={data.invoice} style={{textDecorationLine:"none"}} target='blank'>Customer Invoice</a>/Insurence Invoice
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="messageSection">No Deliveries</div>
    )}
  </div>
  )
}

export default Vehicledelivered