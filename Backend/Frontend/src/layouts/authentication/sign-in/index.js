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

import { signin, authenticate, isAuthenticated } from "auth/index";

function signIn() {
  // const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [values, setValues] = useState({
    personalnumber: "",
    password: "",
    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
    passportauth_worked: false,
  });

  const { personalnumber, password, passportauth_worked } = values;

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
    if (values.NavigateToReferrer) {
      // return <Navigate to="/userRequestsTable" />;
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

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, successmsg: false, error: false });
    axios
      .post(`http://localhost:5000/api/signin`, { personalnumber, password })
      .then((res) => {
        authenticate(res.data);
        setValues({ ...values, loading: false, error: false, NavigateToReferrer: true });
      })
      .catch((error) => {
        setValues({ ...values, errortype: error.error, loading: false, error: true });
      });
  };

  // const passport = (event) => {
  //   axios
  //     .get(`http://localhost:5000/auth/passportauth`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setValues({
  //         ...values,
  //         personalnumber: response.data.stam._json.cn,
  //         passportauth_worked: true,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // <Navigate to="/authentication/sign-up" />;
  //     });
  // };
  // useEffect(() => {
  //   passport();
  // }, []);

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
            {'התחברות למערכת הוצל"א'}
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
          <MDBox component="form" role="form" onSubmit={onSubmit}>
            {passportauth_worked ? (
              <MDBox mb={2}>
                <MDInput
                  type="input"
                  onChange={handleChange("personalnumber")}
                  label="מספר אישי"
                  value={personalnumber}
                  fullWidth
                  disabled
                />
              </MDBox>
            ) : (
              <>
                <MDBox mb={2}>
                  <MDInput
                    type="input"
                    onChange={handleChange("personalnumber")}
                    label="מספר אישי"
                    value={personalnumber}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    onChange={handleChange("password")}
                    label="סיסמא"
                    value={password}
                    fullWidth
                  />
                </MDBox>
              </>
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
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="mekatnar" fullWidth>
                התחברות
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
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
            </MDBox>
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
