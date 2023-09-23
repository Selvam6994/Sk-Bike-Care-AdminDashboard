import { Button, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// import api from "./global";

function Technilogin() {
  const [signupForm, setSignUpForm] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [techniLogInForm, setTechniLogInForm] = useState(true);
  const [newTechniSignup, setNewTechniSignup] = useState(false);
  const [techniOtpVerification, setTechniOtpVerification] = useState(false);
  const [newPinSetForm, setNewPinSetForm] = useState(false);

  const techniLogin = useFormik({
    initialValues: {
      email: "",
      pin: "",
    },

    onSubmit: async (values) => {
      let logInData = await fetch("http://localhost:4000/techniLogIn", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (logInData.status == 200) {
        let token = await logInData.json();
        sessionStorage.setItem("authrisationToken", token.token);
        navigate("/techniHome");
        setTechniLogInForm(false);
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
      let signUpData = await fetch("http://localhost:4000/techniSignUp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (signUpData.status == 201) {
        setTechniOtpVerification(true);
        setTechniLogInForm(false);
        setNewTechniSignup(false);
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
        "http://localhost:4000/techniSignUp/otpVerification",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (otpData.status == 200) {
        setTechniOtpVerification(false);
        setTechniLogInForm(false);
        setNewTechniSignup(false);
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
        `http://localhost:4000/techniSignUp/${signUpForm.values.email}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (userData.status == 200) {
        setTechniOtpVerification(false);
        setTechniLogInForm(true);
        setNewTechniSignup(false);
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
      <Paper className="techniLoginForm" elevation={8}>
        <div className="closeButton">
          <IconButton color="error" onClick={() => navigate("/")}>
            <CloseIcon />
          </IconButton>
        </div>
        {techniLogInForm &&
        !newTechniSignup &&
        !techniOtpVerification &&
        !newPinSetForm ? (
          <form className="techniLoginForm" onSubmit={techniLogin.handleSubmit}>
            {" "}
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              Technicians Login
            </span>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="standard"
              onChange={techniLogin.handleChange}
              onBlur={techniLogin.handleBlur}
            />
            {techniLogin.touched.email ? (
              techniLogin.values.email == "" ? (
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
              onChange={techniLogin.handleChange}
              onBlur={techniLogin.handleBlur}
            />
            {techniLogin.touched.pin ? (
              techniLogin.values.pin == "" ? (
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
                setTechniLogInForm(false) || setNewTechniSignup(true)
              }
            >
              Sign Up
            </Button>
            <Button>Forgot Password?</Button>
          </form>
        ) : !techniLogInForm &&
          newTechniSignup &&
          !techniOtpVerification &&
          !newPinSetForm ? (
          <form className="techniLoginForm" onSubmit={signUpForm.handleSubmit}>
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
            <Button
              type="submit"
              onClick={() => (document.getElementById("email").value = "")}
            >
              Send OTP
            </Button>
          </form>
        ) : !techniLogInForm &&
          !newTechniSignup &&
          techniOtpVerification &&
          !newPinSetForm ? (
          <form
            className="techniSignupOtpForm"
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
        ) : !techniLogInForm &&
          !newTechniSignup &&
          !techniOtpVerification &&
          newPinSetForm ? (
          <form
            className="techniNewPinForm"
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

export default Technilogin;
