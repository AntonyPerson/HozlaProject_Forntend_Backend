/* eslint-disable spaced-comment */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import Icon from "@mui/material/Icon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  FormText,
  InputGroupAddon,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React Components
import MDAlert from "components/MDAlert";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material";
import { CompressOutlined } from "@mui/icons-material";

export default function PrintInfoRequestFormDB() {
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [text, setText] = useState();
  const [twoSides, setTwoSides] = useState("true");

  const [data, setData] = useState({
    hozlaRequestID: params.formID,

    // numColourfulBeats: params.numColourfulBeats,
    // numNoColourfulBeats: params.numNoColourfulBeats,
    // sumColourfulPages: params.sumColourfulPages,
    // sumNoColourfulPages: params.sumNoColourfulPages,
    // numPages: params.numPages,
    // twoSides: params.twoSides,

    // printColor: params.printColor,
    // selected: params.selected,
    // selectedBW: params.selectedBW,

    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  });
  // const [value, setValue] = React.useState('');

  const textPlaceHolderInputs = [
    "סה''כ דפים צבעוני",
    "סה''כ דפים שחור לבן",
    "מס' דפים",
    "מס' פעימות צבעוני",
    "מס' פעימות שחור לבן",
    "צילום בצבע",
    "צילום בשחור לבן",
    "סוג הדפסה",
    "דו צדדי",
  ];

  //takes the data drom the DB and gives inital values to the useState data, each time the page gets rendred/refreshed
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hozlaAdminRequests/${params.formID}`)
      .then((response) => {
        // console.log(`the object data`);

        if (response.data !== null) {
          console.log(response.data);
          console.log(params.formID);
          setFormData(response.data);
          if (response.data.twoSides === "true") {
            setTwoSides("true");
          } else if (response.data.twoSides === "false") {
            setTwoSides("false");
          }
          console.log(twoSides);
        } else {
          setText("הטופס לא עודכן");
        }

        // setData(response.data);
        setData({
          ...data,
          errortype: "",
          error: false,
          successmsg: false,
          loading: false,
          redirectToReferrer: false,
        });
        // setdates({
        //   workGivenDate: response.data.workGivenDate.split("T")[0],
        //   workRecivedDate: response.data.workRecivedDate.split("T")[0],
        // });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
        // if (error.code === "ERR_BAD_REQUEST") {
        //   setError404(true);
        // } else {
        //   setErrorDB(true);
        // }
      });
  }, []);

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }
  function handleChangeCheckbox(evt) {
    // setData({ ...data, [evt.target.name]: evt.target.twoSides });
    setData({ twoSides: !data.twoSides });
    if (data.twoSides === true) {
      setData({ ...data, sumColourfulPages: Math.round(data.sumColourfulPages * 2) });
      console.log(data.sumColourfulPages);
    }
    if (data.twoSides === false) {
      setData({ ...data, sumColourfulPages: Math.round(data.sumColourfulPages / 2) });
      console.log(data.sumColourfulPages);
    }
    console.log(data.twoSides);
  }

  function handleChangeColourfulBeat(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value, sumColourfulPages: Math.round(value / 2) });
    // setData({ numPages: data.sumColourfulPages + data.sumNoColourfulPages });
  }
  function handleNoChangeColourfulBeat(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value, sumNoColourfulPages: Math.round(value / 2) });
  }

  function handleChangeColourfulPage(evt) {
    const { value } = evt.target;
    setData({ ...data, numColourfulBeats: Math.round(value * 2), [evt.target.name]: value });
  }
  function handleNoChangeColourfulPage(evt) {
    const { value } = evt.target;
    setData({ ...data, numNoColourfulBeats: Math.round(value * 2), [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    // event.preventDefault();
    // if (CheckSignUpForm(event)) {
    //     SendFormData(event);
    // }
  };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    // if (data.unit === "") {
    //   flag = false;
    //   ErrorReason.push("יחידה לא צויין");
    //   // toast.error(ErrorReason);
    // }
    if (data.sumColourfulPages === 0 && data.sumNoColourfulPages === 0) {
      if (data.sumColourfulPages === 0) {
        flag = false;
        ErrorReason.push("כמות הדפים צבעוניים לא צויינה");
        //toast.error(ErrorReason);
      }
      if (data.sumNoColourfulPages === 0) {
        flag = false;
        ErrorReason.push("כמות דפיי שחור לבן לא צויינה ");
        //toast.error(ErrorReason);
      }
    }
    if (data.numPages === 0) {
      flag = false;
      ErrorReason.push("כמות הדפים לא צויינה ");
      //toast.error(ErrorReason);
    }
    if (data.numColourfulBeats === 0 && data.numNoColourfulBeats === 0) {
      if (data.numColourfulBeats === 0) {
        flag = false;
        ErrorReason.push("כמות הפעימות צבעוני לא צויינה ");
        //toast.error(ErrorReason);
      }
      if (data.numNoColourfulBeats === 0) {
        flag = false;
        ErrorReason.push("כמות הפעימות שחור לבן לא צויינה ");
        //toast.error(ErrorReason);
      }
      console.log("undefined");
    }

    if (data.selected === "none" && data.selectedBW === "none") {
      flag = false;
      ErrorReason.push("סוג צילום לא צויין");
      //toast.error(ErrorReason);
    }

    // if (flag != true) {
    //     toast.error(ErrorReason);
    // }

    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        return false;
        // setData({ ...data, loading: false, successmsg: false, error: true });
      });
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  // const SendFormData = (event) => {
  //     event.preventDefault();
  //     setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
  //     const requestData = {
  //         sumColourfulPages: data.sumColourfulPages,
  //         sumNoColourfulPages: data.sumNoColourfulPages,
  //         numPages: data.numPages,
  //         numColourfulBeats: data.numColourfulBeats,
  //         numNoColourfulBeats: data.numNoColourfulBeats,
  //         selected: data.selected,
  //         selectedBW: data.selectedBW,
  //         twoSides: data.twoSides,

  //         // errortype: data.errortype,
  //         // error: data.error,
  //         // successmsg: data.successmsg,
  //         // loading: data.loading,
  //         // redirectToReferrer: data.redirectToReferrer,
  //         // value: value,
  //     };
  //     console.log(requestData);

  //     axios
  //         .post(`http://localhost:5000/hozlaAdminRequests/add`, requestData)
  //         .then((res) => {
  //             setData({
  //                 ...data,
  //                 work_id: res.data,
  //                 loading: false,
  //                 error: false,
  //                 successmsg: true,
  //                 NavigateToReferrer: false,
  //             });
  //             // toast.success(`הטופס נשלח בהצלחה`);
  //             // history.push(`/signin`);
  //             console.log(res.data);
  //         })
  //         .catch((error) => {
  //             // console.log(error);
  //             setData({
  //                 ...data,
  //                 errortype: error.response,
  //                 loading: false,
  //                 error: true,
  //                 NavigateToReferrer: false,
  //             });
  //         });
  // };
  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
  };
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };
  const handleCloseErrorModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      return <Navigate to="/managementHoztla" />;
    }
  };

  const showSuccess = () => (
    <Dialog
      open={data.successmsg}
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
          הטופס עודכן
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר אסמכתא: {data.work_id}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            <Link style={{ color: "white" }} to="/managementHoztla">
              לניהול הבקשות
            </Link>
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={data.error}
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
          שגיאה בשליחת העדכון
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={data.loading}
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

  const AdminPrintInfoRequestFormDB = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="6" md="7">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  טופס הוצל"א{" "}
                </MDTypography>
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  {params.formID}
                </MDTypography>
              </MDBox>
              <MDBox textAlign="center">
                <FormGroup>
                  <MDTypography variant="h4" fontWeight="medium" color="error" mt={1}>
                    {text}
                  </MDTypography>
                </FormGroup>
              </MDBox>

              <Form style={{ textAlign: "right" }} role="form">
                <FormGroup row className="">
                  <FormGroup>
                    {twoSides === "true" ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            // defaultChecked
                            // checked={data.twoSides}
                            // value={twoSides}
                            // onChange={handleChangeCheckbox}
                            inputProps={{ "aria-label": "controlled" }}
                            disabled
                            checked
                          />
                        }
                        label={
                          <MDTypography for="twoSides">{textPlaceHolderInputs[8]}</MDTypography>
                        }
                        labelPlacement="start"
                      />
                    ) : (
                      <FormControlLabel
                        control={
                          <Checkbox
                            // defaultChecked
                            // checked={data.twoSides}
                            // value={twoSides}
                            // onChange={handleChangeCheckbox}
                            inputProps={{ "aria-label": "controlled" }}
                            disabled
                          />
                        }
                        label={
                          <MDTypography for="twoSides">{textPlaceHolderInputs[8]}</MDTypography>
                        }
                        labelPlacement="start"
                      />
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="numColourfulBeats">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      name="numColourfulBeats"
                      type="number"
                      min="0"
                      value={formData.numColourfulBeats}
                      // onChange={handleChangeColourfulBeat}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="numNoColourfulBeats">{textPlaceHolderInputs[4]}</Label>
                    <Input
                      name="numNoColourfulBeats"
                      type="number"
                      min="0"
                      value={formData.numNoColourfulBeats}
                      // onChange={handleNoChangeColourfulBeat}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="sumColourfulPages">{textPlaceHolderInputs[0]}</Label>
                    <Input
                      name="sumColourfulPages"
                      type="number"
                      min="0"
                      value={formData.sumColourfulPages}
                      // onChange={handleChangeColourfulPage}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="sumNoColourfulPages">{textPlaceHolderInputs[1]}</Label>
                    <Input
                      name="sumNoColourfulPages"
                      type="number"
                      min="0"
                      value={formData.sumNoColourfulPages}
                      // onChange={handleNoChangeColourfulPage}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="numPages">{textPlaceHolderInputs[2]}</Label>
                    <Input
                      name="numPages"
                      type="number"
                      min="1"
                      value={formData.numPages}
                      // onChange={handleChange}
                      // required
                      disabled
                    />
                  </FormGroup>

                  {/* <FormGroup>
                    <Label for="printColor">{textPlaceHolderInputs[7]}</Label>
                    <Input
                      name="printColor"
                      type="text"
                      value={formData.printColor}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup> */}

                  {/* {data.printColor === "bw" ? ( */}
                  <FormGroup>
                    <Label for="selectedBW">{textPlaceHolderInputs[6]}</Label>
                    <Input
                      name="selectedBW"
                      type="text"
                      value={formData.selectedBW}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                  {/* ) : ( */}
                  <FormGroup>
                    <Label for="selected">{textPlaceHolderInputs[5]}</Label>
                    <Input
                      name="selected"
                      type="text"
                      value={formData.selected}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                  {/* )} */}
                </FormGroup>
                {/* <FormGroup>
                  <Label for="הערות">הערות</Label>
                  <Input multiline rows={5} onChange={v => setValue(v)} />
                </FormGroup> */}
                {/* <div className="text-center">
                                    <MDButton
                                        color="mekatnar"
                                        size="large"
                                        // onClick={clickSubmit}
                                        className="btn-new-blue"
                                        type="submit"
                                    >
                                        אישור
                                    </MDButton>
                                </div> */}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* //! fot the pop up warning windoes */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {/* {showError()} */}
        {/* {showSuccess()} */}
        {/* {showLoading()} */}
        {/* {NavigateUser()} */}

        {AdminPrintInfoRequestFormDB()}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
