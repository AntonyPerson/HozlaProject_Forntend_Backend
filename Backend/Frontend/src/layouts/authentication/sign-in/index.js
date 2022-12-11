/* eslint-disable spaced-comment */
/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
//! In the demo mode there is a problem with the buttons, you need to prees twice. once for a user creaton and then to login.
//! i bellive the window.location.reload(false) has some thing to do with that or somthing is not being updated when it should.
//! mayb with the card login that bug will not excict, can be only check when the server code will be given.

import React, { useState, useEffect } from "react";

// react-router-dom components
import { Link, withRouter, Redirect, Navigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/book-bg-image.jpg";

import { signin, signout, authenticate, isAuthenticated } from "auth/index";
import { CompressOutlined } from "@mui/icons-material";

function signIn() {
  // const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const { user } = isAuthenticated();

  const [values, setValues] = useState({
    personalnumber: "",
    password: "",
    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  //for signing up a new client
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastLame: "",
    personalnumber: "",
    admin: "",
    unit: "",
    anaf: "",
    mador: "",
    phoneNumber: "",
    email: "",
    holzlaRequest: [],
  });
  const [Demo, setDemo] = useState(true);
  // const { personalnumber, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCloseSuccsecModal = () => {
    setValues({
      ...values,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };
  const handleCloseLoadingModal = () => {
    setValues({ ...values, loading: false });
  };
  const handleCloseErrorModal = () => {
    setValues({
      ...values,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const NavigateUser = () => {
    const { user } = isAuthenticated();
    // console.log(user);
    if (values.NavigateToReferrer && user) {
      // console.log(user);
      if (user.admin === "0") {
        //regular user
        return <Navigate to="/userRequestsTable" />;
      }
      if (user.admin === "1" || user.admin === "2") {
        //mangment
        return <Navigate to="/AdminHome" />;
      }
    }
  };
  const showSuccess = () => (
    <Dialog
      open={values.successmsg}
      onClose={handleCloseSuccsecModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          התחבר בהצלחה
        </MDTypography>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={values.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בשליחת הטופס
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            {values.errortype}
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={values.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            שליחת הטופס תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  useEffect(() => {
    setDemo(true);
    // passport();
  }, []);

  const SignUp = () => {
    console.log("In sign up");
    setValues({ ...values, loading: true, successmsg: false, error: false });
    const newUser = {
      firstName: signUpData.firstName,
      lastLame: signUpData.lastLame,
      personalnumber: signUpData.personalnumber,
      admin: signUpData.admin,
      unit: signUpData.unit,
      anaf: signUpData.anaf,
      mador: signUpData.mador,
      phoneNumber: signUpData.phoneNumber,
      email: signUpData.email,
      holzlaRequest: signUpData.holzlaRequest,
    };
    axios
      .post(`http://localhost:5000/api/signup`, newUser)
      .then((res) => {
        console.log(`gotten new user from sign up`);
        console.log(`${res.data}`);
        console.log({ personalnumber: res.data.user.personalnumber });
        console.log(res.data.user.personalnumber);
        axios
          .post(`http://localhost:5000/api/signin`, {
            personalnumber: res.data.user.personalnumber,
          })
          .then((r) => {
            authenticate(r.data);
            setValues({ ...values, loading: false, error: false, NavigateToReferrer: true });
          })
          .catch((error) => {
            console.log(error);
          });

        // authenticate(res.data);
        // setValues({ ...values, loading: false, error: false, NavigateToReferrer: true });
      })
      .catch((error) => {
        console.log(error);
      });
    // window.location.reload();
  };

  useEffect(() => {
    console.log("signUpData:");
    console.log(signUpData);
    if (
      signUpData.firstName !== "" &&
      signUpData.lastLame !== "" &&
      signUpData.personalnumber !== "" &&
      signUpData.admin !== "" &&
      signUpData.unit !== "" &&
      signUpData.anaf !== "" &&
      signUpData.mador !== "" &&
      signUpData.phoneNumber !== "" &&
      signUpData.email !== ""
    ) {
      SignUp();
    }
  }, [signUpData]);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, successmsg: false, error: false });
    console.groupCollapsed("in the onSubmit function");
    console.log(event.target.id);
    console.log(event.target.id === "MangerDemo");
    console.log(event.target.id === "MangerDemo" ? "1234567" : "7654321");
    // eslint-disable-next-line prefer-const
    let personalnumber = event.target.id === "MangerDemo" ? "1234567" : "7654321";
    // setValues({
    //   ...values,
    //   personalnumber: t,
    // });
    // console.log(values);

    // console.log(values.personalnumber);
    console.log(personalnumber);

    axios
      .post(`http://localhost:5000/api/signin`, { personalnumber })
      .then((res) => {
        console.groupCollapsed("in the axios of the onSubmit");
        console.log("http://localhost:5000/api/signin");
        console.group();
        console.log(res.data);
        console.log(res.data.user);
        console.groupEnd();

        if (res.data.user === "DoNotExist" || res.data.user === undefined) {
          console.groupCollapsed("inside the user creation if");
          if (Demo) {
            // signout();
            console.log(`personalnumber === "1234567" ${personalnumber === "1234567"}`);
            if (personalnumber === "1234567") {
              console.log(`${personalnumber} in the MangerDemo`);
              setSignUpData({
                ...signUpData,
                firstName: "אנטוני",
                lastLame: "פרסון",
                personalnumber: "1234567",
                admin: "2",
                unit: "מקטנאר",
                anaf: "תון",
                mador: "NG",
                phoneNumber: "123456789",
                email: "sS@gmail.com",
              });
            } else if (personalnumber === "7654321") {
              console.log(`${personalnumber} in the ClientDemo`);
              setSignUpData({
                ...signUpData,
                firstName: "דביר",
                lastLame: "וסקר",
                personalnumber: "7654321",
                admin: "0",
                unit: "מקטנאר",
                anaf: "תון",
                mador: "NG",
                phoneNumber: "987654321",
                email: "qQ@gmail.com",
              });
            }
            console.groupEnd();
            console.log(signUpData);
            // SignUp();
            /* //? set of useStae do not return a promise so you cant use async/await & the error is that the function strats before the value is being updated.
              ?There for we are going to use a useEffect for when the SignUpData is updated and not its init defualt value.
             */
            console.groupEnd();
          }
        } else {
          authenticate(res.data);
          setValues({ ...values, loading: false, error: false, NavigateToReferrer: true });
        }
        //! the realod
        window.location.reload(false);
      })
      .catch((error) => {
        // setValues({ ...values, errortype: error.error, loading: false, error: true });
        setValues({ ...values, errortype: error.error, loading: false });
        console.log(error);
      });
    console.groupEnd();
  };

  // hoger - need server code to make it work or fix bugs
  const passport = (event) => {
    axios
      .get(`http://localhost:5000/auth/passportauth`)
      .then((response) => {
        console.log(response.data);
        setValues({
          ...values,
          personalnumber: response.data.stam._json.cn,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.error === "NotInTheSystem") {
          axios
            .get(`http://localhost:5000/auth/passportauth`)
            .then((response) => {
              console.log(response.data);
              setSignUpData({ ...signUpData, personalnumber: response.data.stam._json.cn });
              // SignUp();
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
  };

  const signInForm = () => (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="mekatnar"
          borderRadius="lg"
          coloredShadow="mekatnar"
          mx={2}
          mt={-3}
          p={2}
          pb={5}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {Demo ? 'התחברות למערכת הוצל"א דמו' : 'התחברות למערכת הוצל"א'}
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            {Demo ? (
              <>
                <MDBox pb={3}>
                  <MDButton
                    id="MangerDemo"
                    type="submit"
                    variant="gradient"
                    color="mekatnar"
                    fullWidth
                    onClick={onSubmit}
                  >
                    התחברות כמנהל
                  </MDButton>
                </MDBox>
                <MDBox>
                  <MDButton
                    id="ClientDemo"
                    type="submit"
                    variant="gradient"
                    color="mekatnar"
                    onClick={onSubmit}
                    fullWidth
                  >
                    התחברות לקוח
                  </MDButton>
                </MDBox>
              </>
            ) : (
              <MDTypography variant="h3" color="mekatnar" textGradient>
                {'על מנת להתחבר למערכת הוצל"א. אנא הכנס חוגר'}
              </MDTypography>
            )}

            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            {/* <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="mekatnar" fullWidth>
                התחברות
              </MDButton>
            </MDBox> */}
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                עוד לא נרשמתה?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="mekatnar"
                  fontWeight="medium"
                  textGradient
                >
                  לחץ כאן
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );

  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      {/* <MDBox pt={6} pb={3}> */}
      {/* //! fot the pop up warning windoes */}
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {signInForm()}
      {/* </MDBox> */}
      {/* <Footer /> */}
      {/* </DashboardLayout> */}
    </>
  );
}

export default signIn;
