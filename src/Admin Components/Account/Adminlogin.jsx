import { Button, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";



function Adminlogin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [adminLogInForm, setAdminLogInForm] = useState(true);
  const [newAdminSignup, setNewAdminSignup] = useState(false);
  const [adminOtpVerification, setAdminOtpVerification] = useState(false);
  const [newPinSetForm, setNewPinSetForm] = useState(false);

  const adminLogin = useFormik({
    initialValues: {
      email: "",
      pin: "",
    },

    onSubmit: async (values) => {
      let logInData = await fetch("https://sk-bike-app-backend.onrender.com/adminLogIn", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (logInData.status == 200) {
        let token = await logInData.json();
        sessionStorage.setItem("authrisationToken", token.token);
        navigate("/adminHome");
        setAdminLogInForm(false);
      } else {
        setErrorMessage("Invalid Credentials");
      }
    },
  });

  const signUpForm = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      let signUpData = await fetch("https://sk-bike-app-backend.onrender.com/adminSignUp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (signUpData.status == 201) {
        setAdminOtpVerification(true);
        setAdminLogInForm(false);
        setNewAdminSignup(false);
        setNewPinSetForm(false);
      
      } else if (signUpData.status == 400 || signUpData.status == 401) {
        setErrorMessage("Invalid credentials try any other email");
      }
    },
  });

  const signUpOtpForm = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (values) => {
      let otpData = await fetch(
        "https://sk-bike-app-backend.onrender.com/adminSignUp/otpVerification",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (otpData.status == 200) {
        setAdminOtpVerification(false);
        setAdminLogInForm(false);
        setNewAdminSignup(false);
        setNewPinSetForm(true);
        setErrorMessage("");
      } else if (otpData.status == 400) {
        setErrorMessage("OTP does not match");
      }
    },
  });

  const setNewPasscode = useFormik({
    initialValues: {
      name: "",
      phone: "",
      pin: "",
      confirmPin: "",
    },
    onSubmit: async (values) => {
      let userData = await fetch(
        `https://sk-bike-app-backend.onrender.com/adminSignUp/${signUpForm.values.email}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (userData.status == 200) {
        setAdminOtpVerification(false);
        setAdminLogInForm(true);
        setNewAdminSignup(false);
        setNewPinSetForm(false);
        setErrorMessage("");
      } else if (userData.status == 400) {
        setErrorMessage("Check the pin number");
      }
    },
  });

  const resetOtpForm = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const resetPasscodeForm = useFormik({
    initialValues: {
      pin: "",
      confirmPin: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  

  return (
    <div className="loginPage">
      <Paper className="AdminLoginForm" elevation={8}>
        <div className="closeButton">
          <IconButton color="error" onClick={() => navigate("/")}>
            <CloseIcon />
          </IconButton>
        </div>

        {adminLogInForm &&
        !newAdminSignup &&
        !adminOtpVerification &&
        !newPinSetForm ? (
          <form className="AdminLoginForm" onSubmit={adminLogin.handleSubmit}>
            {" "}
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              Admin Login
            </span>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="standard"
              onChange={adminLogin.handleChange}
              onBlur={adminLogin.handleBlur}
            />
            {adminLogin.touched.email ? (
              adminLogin.values.email == "" ? (
                <span style={{ color: "red" }}>Email is required</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <TextField
              id="pin"
              label="Pin Number"
              name="pin"
              type="password"
              variant="standard"
              onChange={adminLogin.handleChange}
              onBlur={adminLogin.handleBlur}
            />
            {adminLogin.touched.pin ? (
              adminLogin.values.pin == "" ? (
                <span style={{ color: "red" }}>Pin code is required</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <Button type="submit">Log In</Button>
            <Button
              onClick={() =>
                setAdminLogInForm(false) || setNewAdminSignup(true)
              }
            >
              Sign Up
            </Button>
            <Button>Forgot Password?</Button>
          </form>
        ) : !adminLogInForm &&
          newAdminSignup &&
          !adminOtpVerification &&
          !newPinSetForm ? (
          <form className="AdminLoginForm" onSubmit={signUpForm.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="standard"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
            />
            {signUpForm.touched.email ? (
              signUpForm.values.email == "" ? (
                <span style={{ color: "red" }}>Email is required</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <Button type="submit" onClick={()=>(document.getElementById("email").value="")}>Send OTP</Button>
          </form>
        ) : !adminLogInForm &&
          !newAdminSignup &&
          adminOtpVerification &&
          !newPinSetForm ? (
          <form
            className="AdminSignupOtpForm"
            onSubmit={signUpOtpForm.handleSubmit}
          >
            <TextField
              id="otpPin"
              label="OTP"
              name="otp"
              type="password"
              variant="standard"
              onChange={signUpOtpForm.handleChange}
              onBlur={signUpOtpForm.handleBlur}
            />
            {signUpOtpForm.touched.otp ? (
              signUpOtpForm.values.otp == "" ? (
                <span style={{ color: "red" }}>Enter otp for verification</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <span>{errorMessage}</span>
            <Button type="submit">Verify OTP</Button>
          </form>
        ) : !adminLogInForm &&
          !newAdminSignup &&
          !adminOtpVerification &&
          newPinSetForm ? (
          <form
            className="AdminNewPinForm"
            onSubmit={setNewPasscode.handleSubmit}
          >
            {" "}
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              Set New Pin
            </span>
            <TextField
              id="standard-basic"
              label="Name"
              name="name"
              type="text"
              variant="standard"
              onChange={setNewPasscode.handleChange}
              onBlur={setNewPasscode.handleBlur}
            />
            {setNewPasscode.touched.name ? (
              setNewPasscode.values.name == "" ? (
                <span style={{ color: "red" }}>Enter your name</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <TextField
              id="standard-basic"
              label="Phone Number"
              name="phone"
              type="number"
              variant="standard"
              onChange={setNewPasscode.handleChange}
              onBlur={setNewPasscode.handleBlur}
            />
            {setNewPasscode.touched.phone ? (
              setNewPasscode.values.phone == "" ? (
                <span style={{ color: "red" }}>Enter your phone number</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <TextField
              id="standard-basic"
              label="New Pin"
              name="pin"
              type="number"
              variant="standard"
              onChange={setNewPasscode.handleChange}
              onBlur={setNewPasscode.handleBlur}
            />
            {setNewPasscode.touched.pin ? (
              setNewPasscode.values.pin == "" ? (
                <span style={{ color: "red" }}>Enter your new pass code</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <TextField
              id="standard-basic"
              label="Confirm Pin"
              name="confirmPin"
              type="number"
              variant="standard"
              onChange={setNewPasscode.handleChange}
              onBlur={setNewPasscode.handleBlur}
            />
            {setNewPasscode.touched.confirmPin ? (
              setNewPasscode.values.confirmPin == "" ? (
                <span style={{ color: "red" }}>
                  Re-enter your new pass code
                </span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <Button type="submit">Sign Up</Button>
          </form>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
}


export default Adminlogin;
