import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Adminlogin from "./Admin Components/Account/Adminlogin";
import Adminhomepage from "./Admin Components/Adminhomepage";
import Overviewstatus from "./Admin Components/Overview/Overviewstatus";
import Enquires from "./Admin Components/Enquiry/Enquires";
import Servicerequest from "./Admin Components/Overview/Servicerequest";
import Servicetaken from "./Admin Components/Overview/Servicetaken";
import Delivered from "./Admin Components/Overview/Delivered";
import Generalenquires from "./Admin Components/Overview/Generalenquires";
import Newenquiry from "./Admin Components/Enquiry/Newenquiry";
import Contacted from "./Admin Components/Enquiry/Contacted";
import Converted from "./Admin Components/Enquiry/Converted";
import Cancelled from "./Admin Components/Enquiry/Cancelled";
import Totalenquires from "./Admin Components/Enquiry/Totalenquires";
import Addservice from "./Admin Components/List Of Service/Addservice";
import Signedupclients from "./Admin Components/Customer Data/Signedupclients";
import Feedback from "./Admin Components/Feedback/Feedback";
import { useEffect, useState } from "react";
import WorkflowStatus from "./Admin Components/Overview/Work Flow/WorkflowStatus";
import Mainpage from "./Mainpage";
import Technilogin from "./Technician Components/Loginpage/Technilogin";
import Technihomepage from "./Technician Components/Technihomepage";
import Newservice from "./Technician Components/Estimation/Newservice";
import Newservicerequest from "./Technician Components/Estimation/Newservicerequest";
import Costvalidation from "./Technician Components/Estimation/Costvalidation";
import Customerapproval from "./Technician Components/Estimation/Customerapproval";
import Pendingforapproval from "./Technician Components/Estimation/Pendingforapproval";
import ShopfloorStatus from "./Technician Components/Work Flow/ShopfloorStatus";
import Servicequeue from "./Technician Components/Work Flow/Servicequeue";
import Serviceprocess from "./Technician Components/Work Flow/Serviceprocess";
import Quality from "./Technician Components/Work Flow/Quality";
import Waterwash from "./Technician Components/Work Flow/Waterwash";
import BillingStatus from "./Technician Components/Billing and Delivery/BillingStatus";
import Vehicledelivered from "./Technician Components/Billing and Delivery/Vehicledelivered";
import Billingqueue from "./Technician Components/Billing and Delivery/Billingqueue";

function App() {
  // get total enquires
  const [totalEnquiryData, setTotalEnquiryData] = useState([]);
  async function gettotalEnquiryData() {
    const getServiceData = await fetch(`http://localhost:4000/totalEnquries`, {
      headers: {
        "x-auth-token": sessionStorage.getItem("authrisationToken"),
      },
    });
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setTotalEnquiryData([]);
    } else setTotalEnquiryData(jsonData);
  }

  // get new enquries
  const [newEnquiries, setNewEnquiriesData] = useState([]);
  async function getNewEnquiriesData() {
    const getServiceData = await fetch(`http://localhost:4000/newEnquiry`, {
      headers: {
        "x-auth-token": sessionStorage.getItem("authrisationToken"),
      },
    });
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setNewEnquiriesData([]);
    } else setNewEnquiriesData(jsonData);
  }

  // get contacted enquiries
  const [contactedEnquiries, setContactedEnquiries] = useState([]);
  async function getContactedData() {
    const getServiceData = await fetch(
      `http://localhost:4000/contactedEnquiry`,
      {
        headers: {
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
      }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setContactedEnquiries([]);
    } else setContactedEnquiries(jsonData);
  }

  // get order converted enquiries
  const [convertedEnquiries, setConvertedEnquiries] = useState([]);
  async function getConvertedEnquiries() {
    const getServiceData = await fetch(
      `http://localhost:4000/convertedEnquiry`,
      {
        headers: {
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
      }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setConvertedEnquiries([]);
    } else setConvertedEnquiries(jsonData);
  }

  // get cancelled enquiries data
  const [cancelledEnquiries, setCancelledEnquiries] = useState([]);
  async function getCancelledEnquiries() {
    const getServiceData = await fetch(
      `http://localhost:4000/cancelledEnquiry`,
      {
        headers: {
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
      }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setCancelledEnquiries([]);
    } else setCancelledEnquiries(jsonData);
  }

  useEffect(() => {
    getCancelledEnquiries(),
      getConvertedEnquiries(),
      getContactedData(),
      getNewEnquiriesData(),
      gettotalEnquiryData();
  }, []);

  // Technician requests
  // get new service request
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

  // get cost validation listt
  const [costValidationList, setCostValidationList] = useState([]);
  async function getCostValidationList() {
    const getServiceData = await fetch(
      `http://localhost:4000/costEstimationList`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setCostValidationList([]);
    } else {
      setCostValidationList(jsonData);
    }
  }

  // get customer validation data
  const [customervalidationData, setCustomerValidationData] = useState([]);
  async function getCustomerValidationList() {
    const getServiceData = await fetch(
      `http://localhost:4000/customerApproval`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setCustomerValidationData([]);
    } else {
      setCustomerValidationData(jsonData);
    }
  }

  // get pending approval data
  const [pendingApprovalData, setPendingApprovalData] = useState([]);
  async function getPendingApprovalList() {
    const getServiceData = await fetch(
      `http://localhost:4000/getPendingList`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setPendingApprovalData([]);
    } else {
      setPendingApprovalData(jsonData);
    }
  }

  // Shop floor data
  const [serviceQueueData, setServiceQueueData] = useState([]);
  async function getServiceQueueData() {
    const getServiceData = await fetch(
      `http://localhost:4000/getServiceQueue`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setServiceQueueData([]);
    } else {
      setServiceQueueData(jsonData);
    }
  }

  // Service process data
  const [serviceProcessData, setServiceProcessData] = useState([]);
  async function getServiceProcessData() {
    const getServiceData = await fetch(
      `http://localhost:4000/getServiceProcess`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setServiceProcessData([]);
    } else {
      setServiceProcessData(jsonData);
    }
  }

  // QC process data
  const [qcProcessData, setQcProcessData] = useState([]);
  async function getQcProcessData() {
    const getServiceData = await fetch(
      `http://localhost:4000/getQcProcess`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setQcProcessData([]);
    } else {
      setQcProcessData(jsonData);
    }
  }

  // Water wash process data
  const [washingProcessData, setWashingProcessData] = useState([]);
  async function getWashingProcessData() {
    const getServiceData = await fetch(
      `http://localhost:4000/getWashingProcess`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setWashingProcessData([]);
    } else {
      setWashingProcessData(jsonData);
    }
  }

  //Get Billing process data
  const [billingProcessData, setBillingProcessData] = useState([]);
  async function getBillingProcessData() {
    const getData = await fetch(
      `http://localhost:4000/getBillingData`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setBillingProcessData([]);
    } else {
      setBillingProcessData(jsonData);
    }
  }

  // Vehicle delivered data
  const [deliveredData, setDeliveredData] = useState([]);
  async function getDeliveredData() {
    const getServiceData = await fetch(
      `http://localhost:4000/getDeliveredData`
      //  {
      //    headers: {
      //      "x-auth-token": sessionStorage.getItem("authrisationToken"),
      //    },
      //  }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "no data") {
      setDeliveredData([]);
    } else {
      setDeliveredData(jsonData);
    }
  }
  useEffect(() => {
    getBookingStatus();
    getCostValidationList();
    getCustomerValidationList();
    getPendingApprovalList();
    // shop floor
    getServiceQueueData();
    getServiceProcessData();
    getQcProcessData();
    getWashingProcessData();
    getBillingProcessData();
    getDeliveredData();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/adminLogin" element={<Adminlogin />} />

        <Route
          path="/adminHome"
          element={
            <ProtectedRoute>
              <Adminhomepage />
            </ProtectedRoute>
          }
        >
       
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Servicerequest />
                </ProtectedRoute>
              }
            >
            <Route
              path="serviceTaken"
              element={
                <ProtectedRoute>
                  <Servicetaken />
                </ProtectedRoute>
              }
            />
            <Route
              path="delivered"
              element={
                <ProtectedRoute>
                  <Delivered />
                </ProtectedRoute>
              }
            />
            <Route
              path="overviewEnquires"
              element={
                <ProtectedRoute>
                  <Generalenquires />
                </ProtectedRoute>
              }
            />
            </Route>
         

          <Route
            path="enquires"
            element={
              <Enquires
                totalEnquires={totalEnquiryData}
                newEnquiries={newEnquiries}
                contactedEnquiries={contactedEnquiries}
                convertedEnquiries={convertedEnquiries}
                cancelledEnquiries={cancelledEnquiries}
              />
            }
          >
            <Route
              path=""
              element={<Totalenquires totalEnquires={totalEnquiryData} />}
            />
            <Route
              path="new"
              element={
                <Newenquiry
                  newEnquiries={newEnquiries}
                  getNewEnquiriesData={getNewEnquiriesData}
                  getContactedData={getContactedData}
                />
              }
            />
            <Route
              path="contacted"
              element={
                <Contacted
                  contactedEnquiries={contactedEnquiries}
                  getContactedData={getContactedData}
                  getConvertedEnquiries={getConvertedEnquiries}
                  getCancelledEnquiries={getCancelledEnquiries}
                />
              }
            />
            <Route
              path="converted"
              element={
                <Converted
                  convertedEnquiries={convertedEnquiries}
                  getConvertedEnquiries={getConvertedEnquiries}
                />
              }
            />
            <Route
              path="cancelled"
              element={
                <Cancelled
                  cancelledEnquiries={cancelledEnquiries}
                  getCancelledEnquiries={getCancelledEnquiries}
                  gettotalEnquiryData={gettotalEnquiryData}
                />
              }
            />
          </Route>
          <Route
            path="addService"
            element={
              <ProtectedRoute>
                <Addservice />
              </ProtectedRoute>
            }
          />
          <Route
            path="customerList"
            element={
              <ProtectedRoute>
                <Signedupclients />
              </ProtectedRoute>
            }
          />
          <Route
            path="feedBack"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="workFlow"
            element={
              <ProtectedRoute>
                <WorkflowStatus />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/technicianLogin" element={<Technilogin />} />
        <Route path="/techniHome" element={<Technihomepage />}>
          <Route
            path=""
            element={
              <Newservice
                serviceData={serviceData}
                costValidationList={costValidationList}
                customervalidationData={customervalidationData}
                pendingApprovalData={pendingApprovalData}
              />
            }
          >
            <Route
              path=""
              element={
                <Newservicerequest
                  serviceData={serviceData}
                  getBookingStatus={getBookingStatus}
                  getCostValidationList={getCostValidationList}
                />
              }
            />
            <Route
              path="costEstimation"
              element={
                <Costvalidation
                  costValidationList={costValidationList}
                  getCostValidationList={getCostValidationList}
                  getCustomerValidationList={getCustomerValidationList}
                />
              }
            />
            <Route
              path="customerApproval"
              element={
                <Customerapproval
                  customervalidationData={customervalidationData}
                  getCustomerValidationList={getCustomerValidationList}
                  getPendingApprovalList={getPendingApprovalList}
                  getServiceQueueData={getServiceQueueData}
                />
              }
            />
            <Route
              path="pendingApproval"
              element={
                <Pendingforapproval
                  pendingApprovalData={pendingApprovalData}
                  getPendingApprovalList={getPendingApprovalList}
                />
              }
            />
          </Route>
          <Route
            path="shopFloor"
            element={
              <ShopfloorStatus
                serviceQueueData={serviceQueueData}
                serviceProcessData={serviceProcessData}
                qcProcessData={qcProcessData}
                washingProcessData={washingProcessData}
                getServiceQueueData={getServiceQueueData}
              />
            }
          >
            <Route
              path=""
              element={
                <Servicequeue
                  serviceQueueData={serviceQueueData}
                  getServiceQueueData={getServiceQueueData}
                  getServiceProcessData={getServiceProcessData}
                />
              }
            />
            <Route
              path="serviceProcess"
              element={
                <Serviceprocess
                  serviceProcessData={serviceProcessData}
                  getServiceProcessData={getServiceProcessData}
                  getQcProcessData={getQcProcessData}
                />
              }
            />
            <Route
              path="quality"
              element={
                <Quality
                  qcProcessData={qcProcessData}
                  getQcProcessData={getQcProcessData}
                  getWashingProcessData={getWashingProcessData}
                />
              }
            />
            <Route
              path="waterWash"
              element={
                <Waterwash
                  washingProcessData={washingProcessData}
                  getWashingProcessData={getWashingProcessData}
                />
              }
            />
          </Route>
          <Route
            path="billing"
            element={
              <BillingStatus
                billingProcessData={billingProcessData}
                deliveredData={deliveredData}
                getBillingProcessData={getBillingProcessData}
              />
            }
          >
            <Route
              path=""
              element={
                <Billingqueue
                  billingProcessData={billingProcessData}
                  getBillingProcessData={getBillingProcessData}
                  getDeliveredData={getDeliveredData}
                />
              }
            />
            <Route
              path="delivered"
              element={<Vehicledelivered deliveredData={deliveredData} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("authrisationToken");
  return token ? (
    <section style={{ width: "100%" }}>{children}</section>
  ) : (
    <Navigate replace to="/"></Navigate>
  );
}
export default App;
