/* eslint-disable no-self-assign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-curly-brace-presence */
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
//! The url Style that benny has request for the loggin.
import React, { useState, useEffect } from "react";

// react-router-dom components
import { Link, withRouter, Redirect, Navigate, useParams } from "react-router-dom";
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

import { signin, signout, authenticate, isAuthenticated, updateRefreshCount } from "auth/index";
import { CompressOutlined } from "@mui/icons-material";

function signInURL(props) {
  // const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const { user } = isAuthenticated();
  const params = useParams();

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
  //   const [Demo, setDemo] = useState(true);
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
      if (params.idUR === "69173dcb3ee95de869edfq10") {
        //regular user
        return <Navigate to="/userRequestsTable" />;
      }
      if (params.idUR === "6368f702a925c8f735fa6a59" || params.idUR === "17351e923ex28e869e06c83") {
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

  const signInAxios = async (personalnumber) => {
    let r_massage = "_";
    await axios
      .post(`http://localhost:5000/api/signin`, { personalnumber })
      .then((res) => {
        // console.log(res.data.user);
        if (res.data.user === "DoNotExist" || res.data.user === undefined) {
          r_massage = "DoNotExist";
        } else {
          authenticate(res.data);
          setValues({ ...values, loading: false, error: false, NavigateToReferrer: true });

          r_massage = "sucsses";
        }
      })
      .catch((error) => {
        console.log(error);
        r_massage = "error";
      });

    return r_massage;
  };
  const SignUpAxios = async () => {
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
    await axios
      .post(`http://localhost:5000/api/signup`, newUser)
      .then(
        (res) =>
          // console.log(`gotten new user from sign up`);
          // console.log(`${res.data}`);
          // console.log({ personalnumber: res.data.user.personalnumber });
          // console.log(res.data.user.personalnumber);
          res.data.user.personalnumber
        // authenticate(res.data);
        // setValues({ ...values, loading: false, error: false, NavigateToReferrer: true });
      )
      .catch((error) => {
        console.log(error);
      });
    // window.location.reload();
  };

  // hoger - need server code to make it work or fix bugs
  const passport = async (event) => {
    // console.log(response.data);
    console.log(params.idUR);
    let admin_value = "0";
    // let personalnumber_demo = "1234567";
    let personalnumber_demo = "7654321";
    const signInAxiosResult = await signInAxios(personalnumber_demo);
    console.log(signInAxiosResult);
    if (signInAxiosResult === "DoNotExist") {
      if (params.idUR === "6368f702a925c8f735fa6a59") {
        // http://localhost:3000/authentication/sign-in/6368f702a925c8f735fa6a59
        //? for the admin 2 - admin of admins
        admin_value = "2";
        personalnumber_demo = "1234567";
        setSignUpData({
          ...signUpData,
          firstName: "אנטוני",
          lastLame: "פרסון",
          personalnumber: personalnumber_demo,
          admin: admin_value,
          unit: "מקטנאר",
          anaf: "תון",
          mador: "NG",
          phoneNumber: "123456789",
          email: "sS@gmail.com",
        });
      } else if (params.idUR === "17351e923ex28e869e06c83") {
        // http://localhost:3000/authentication/sign-in/17351e923ex28e869e06c83
        //? for the admin 1 - regular admin
        admin_value = "1";
        personalnumber_demo = "1234567";
        setSignUpData({
          ...signUpData,
          firstName: "אנטוני",
          lastLame: "פרסון",
          personalnumber: personalnumber_demo,
          admin: admin_value,
          unit: "מקטנאר",
          anaf: "תון",
          mador: "NG",
          phoneNumber: "123456789",
          email: "sS@gmail.com",
        });
      } else if (params.idUR === "69173dcb3ee95de869edfq10") {
        //? for the admin 0 - regular user
        // http://localhost:3000/authentication/sign-in/69173dcb3ee95de869edfq10
        admin_value = "0";
        personalnumber_demo = "7654321";
        setSignUpData({
          ...signUpData,
          firstName: "דביר",
          lastLame: "וסקר",
          personalnumber: personalnumber_demo,
          admin: admin_value,
          unit: "מקטנאר",
          anaf: "תון",
          mador: "NG",
          phoneNumber: "987654321",
          email: "qQ@gmail.com",
        });
      }
    } else if (signInAxiosResult === "sucsses") {
      // console.log("==========RefreshCount is 0===============");
      // console.log(localStorage.getItem("RefreshCount"));
      // console.log("==========RefreshCount is 1===============");

      // console.log(localStorage.getItem("RefreshCount"));
      const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
      updateRefreshCount(count);
      // window.location.reload(false);
    }
    // setSignUpData({
    //   ...signUpData,
    //   personalnumber: response.data.stam._json.cn,
    //   admin: admin_value,
    // });
    // setSignUpData({
    //   ...signUpData,
    //   personalnumber: personalnumber_demo,
    //   admin: admin_value,
    // });
    // if (signInAxios(personalnumber_demo) === "sucsses") {
    //   // window.location.reload(false);
    // }

    // axios
    //   .get(`http://localhost:5000/auth/passportauth`)
    //   .then((response) => {
    //     console.log(response.data);
    //     console.log(params.idUR);
    //     let admin_value = "0";
    //     if (params.idUR === "6368f702a925c8f735fa6a59") {
    //       //? for the admin 2 - admin of admins
    //       admin_value = "2";
    //     } else if (params.idUR === "17351e923ex28e869e06c83") {
    //       //? for the admin 1 - regular admin
    //       admin_value = "1";
    //     } else if (params.idUR === "69173dcb3ee95de869edfq10") {
    //       //? for the admin 0 - regular user
    //       admin_value = "0";
    //     }
    //     const signInAxiosResult = signInAxios("1234567");
    //     if (signInAxiosResult === "DoNotExist") {
    //       // setSignUpData({
    //       //   ...signUpData,
    //       //   personalnumber: response.data.stam._json.cn,
    //       //   admin: admin_value,
    //       // });
    //       setSignUpData({
    //         ...signUpData,
    //         personalnumber: "1234567",
    //         admin: admin_value,
    //       });
    //       signInAxios(SignUpAxios());
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  useEffect(() => {
    // setDemo(true);

    passport();
    // console.log(params.idUR);
  }, []);

  useEffect(async () => {
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
      // signInAxios(SignUpAxios());
      await SignUpAxios();
      if ((await signInAxios(signUpData.personalnumber)) === "sucsses") {
        // console.log("==========RefreshCount is 0===============");
        // console.log(localStorage.getItem("RefreshCount"));
        // console.log("==========RefreshCount is 1===============");

        // console.log(localStorage.getItem("RefreshCount"));
        const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
        updateRefreshCount(count);
        // window.location.reload(false);
        // eslint-disable-next-line no-self-assign
        // window.location.href = window.location.href;
        // window.location.reload(false);
      }
      // window.location.href = window.location.href;
    }
  }, [signUpData]);
  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      {/* <MDBox pt={6} pb={3}> */}
      {/* //! fot the pop up warning windoes */}
      {/* {showError()} */}
      {/* {showSuccess()} */}
      {/* {showLoading()} */}
      {NavigateUser()}

      {/* {signInForm()} */}
      {/* </MDBox> */}
      {/* <Footer /> */}
      {/* </DashboardLayout> */}
    </>
  );
}

export default signInURL;
