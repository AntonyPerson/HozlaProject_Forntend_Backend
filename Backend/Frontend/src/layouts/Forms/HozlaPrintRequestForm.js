/* eslint-disable import/no-unresolved */
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
// TODO check mult-files
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
import { Link, Navigate } from "react-router-dom";
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
import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";

// for file upload from Data
import { singleFileUpload } from "Data/api";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
const { user } = isAuthenticated();
console.log("Hozla Print Request Form");
console.log(user);

export default function HozlaPrintRequestForm() {
  const currentDate = new Date();
  console.log(currentDate);
  let dateString = "";
  if (currentDate.getMonth() + 1 >= 10) {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  } else {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  }
  const [data, setData] = useState({
    work_id: "",
    unit: "",
    anaf: "",
    mador: "",
    phoneNumber: "",

    workName: "",
    workClearance: "1",
    bindingType: "0",
    bindingTypeOther: "",
    copyType: "b&w2",
    numOfCopyies: 1,

    fullNameAsker: "",
    workGivenDate: dateString,

    fullNameReciver: "",
    workRecivedDate: "",

    personalnumber: user.personalnumber,
    // role: "",

    files: [],

    pageType: "A4",

    ordernum: "",

    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  const textPlaceHolderInputs = [
    "יחידה",
    "ענף",
    "מדור",
    "נייד",
    "שם העבודה",
    "סיווג העבודה",
    "שיטת כריכה",
    "שיטת  צילום",
    "כמות עותקים",
    "שם מוסר העבודה",
    "תאריך מסירת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך קבלת העבודה",
  ];

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (data.unit === "") {
      flag = false;
      ErrorReason.push("יחידה לא צויין");
      // toast.error(ErrorReason);
    }
    if (data.anaf === "") {
      flag = false;
      ErrorReason.push("ענף לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.mador === "") {
      flag = false;
      ErrorReason.push("מדור לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.phoneNumber === "") {
      flag = false;
      ErrorReason.push("נייד לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.workName === "") {
      flag = false;
      ErrorReason.push("שם העבודה לא צויין ");
      // toast.error(ErrorReason);
    }
    if (data.bindingType === "3") {
      if (data.bindingTypeOther === "") {
        flag = false;
        ErrorReason.push("השיטת הכריכה לא צויינה ");
        // toast.error(ErrorReason);
      }
    }

    // if (data.numOfCopyies === "") {
    //   flag = false;
    //   ErrorReason.push("כמות העותקים לא צויינה ");
    //   // toast.error(ErrorReason);
    // }
    if (data.fullNameAsker === "") {
      flag = false;
      ErrorReason.push("לא צויין שם מוסר העבודה");
      // toast.error(ErrorReason);
    }
    // if (data.workGivenDate === "") {
    //   flag = false;
    //   ErrorReason.push("לא צויין תאריך מסירת העבודה");
    //   // toast.error(ErrorReason);
    // }
    if (data.fullNameReciver === "") {
      flag = false;
      ErrorReason.push("לא צויין שם מקבל העבודה");
      // toast.error(ErrorReason);
    }
    // if (Date.parse(data.workGivenDate) < currentDate) {
    //   flag = false;
    //   ErrorReason.push("תאריך מסירת העבודה לא תיקני");
    //   // toast.error(ErrorReason);
    // }

    if (Date.parse(data.workRecivedDate) <= currentDate) {
      flag = false;
      ErrorReason.push("תאריך קבלת העבודה לא תיקני");
      // toast.error(ErrorReason);
    }
    if (data.workRecivedDate === "") {
      flag = false;
      ErrorReason.push("לא צויין תאריך קבלת העבודה ");
      // toast.error(ErrorReason);
    }
    if (data.files.length === 0) {
      flag = false;
      ErrorReason.push("קובץ לא הועלה");
      // toast.error(ErrorReason);
    }

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

  const SendFormData = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
    const requestData = {
      unit: data.unit,
      anaf: data.anaf,
      mador: data.mador,

      workName: data.workName,
      workClearance: data.workClearance,
      bindingType: data.bindingType,
      bindingTypeOther: data.bindingTypeOther,
      copyType: data.copyType,
      numOfCopyies: data.numOfCopyies,

      phoneNumber: data.phoneNumber,
      fullNameAsker: data.fullNameAsker,
      workGivenDate: data.workGivenDate,

      fullNameReciver: data.fullNameReciver,
      workRecivedDate: data.workRecivedDate,

      personalnumber: data.personalnumber,
      // role: data.role,

      files: data.files,
      pageType: data.pageType,
      ordernum: data.ordernum,
    };

    axios
      .post(`http://localhost:5000/hozlaRequests/add`, requestData)
      .then((res) => {
        setData({
          ...data,
          work_id: res.data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        // toast.success(`הטופס נשלח בהצלחה`);
        // history.push(`/signin`);
        console.log(res.data);
      })
      .catch((error) => {
        // console.log(error);
        setData({
          ...data,
          errortype: error.response,
          loading: false,
          error: true,
          NavigateToReferrer: false,
        });
      });
  };
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
      return <Navigate to="/userRequestsTable" />;
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
          הבקשה נשלחה להוצל"א
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר אסמכתא: {data.work_id}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            <Link style={{ color: "white" }} to="/userRequestsTable">
              למעקב אחר סטטוס העבודה לחץ כאן
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
          שגיאה בשליחת הבקשה
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

  const hozlaPrintRequestForm = () => (
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
                  טופס הזמנת צילום הוצל"א{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="unit">{textPlaceHolderInputs[0]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="unit"
                      name="unit"
                      type="text"
                      value={data.unit}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="anaf">{textPlaceHolderInputs[1]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="anaf"
                      type="text"
                      value={data.anaf}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="mador">{textPlaceHolderInputs[2]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[2]}
                      name="mador"
                      type="text"
                      value={data.mador}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phoneNumber">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[3]}
                      name="phoneNumber"
                      type="text"
                      value={data.phoneNumber}
                      onChange={handleChange}
                      maxLength={10}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workName">{textPlaceHolderInputs[4]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[4]}
                      name="workName"
                      type="text"
                      value={data.workName}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="workClearance">{textPlaceHolderInputs[5]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[5]}
                      name="workClearance"
                      type="select"
                      value={data.workClearance}
                      onChange={handleChange}
                    >
                      <option defult value="1">
                        שמור
                      </option>
                      <option value="0">בלמ"ס</option>
                      <option value="2">סודי</option>
                      {/* <option value="3">סודי ביותר</option> */}
                    </Input>
                  </FormGroup>
                </FormGroup>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="bindingType">{textPlaceHolderInputs[6]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[6]}
                      name="bindingType"
                      type="select"
                      value={data.bindingType}
                      onChange={handleChange}
                    >
                      <option defult value="0">
                        הידוק
                      </option>
                      <option value="1">ספירלה</option>
                      <option value="2">חירור</option>
                      <option value="3">אחר</option>
                    </Input>
                    {data.bindingType === "3" && (
                      <Input
                        name="bindingTypeOther"
                        type="text"
                        value={data.bindingTypeOther}
                        onChange={handleChange}
                      />
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="copyType">{textPlaceHolderInputs[7]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[7]}
                      name="copyType"
                      type="select"
                      value={data.copyType}
                      onChange={handleChange}
                    >
                      <option defult value="b&w2">
                        שחור לבן דו צדדי
                      </option>
                      <option value="color1">צבעוני יחיד</option>
                      <option value="color2">צבעוני דו צדדי</option>
                      <option value="b&w1">שחור לבן יחיד</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="pageType">{textPlaceHolderInputs[13]}</Label>
                    <Input
                      name="pageType"
                      type="select"
                      value={data.pageType}
                      onChange={handleChange}
                    >
                      <option defult value="A4">
                        A4
                      </option>
                      <option value="A3">A3</option>
                      <option value="A4b">A4 בריסטול</option>
                      <option value="A3b">A3 בריסטול</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="numOfCopyies">{textPlaceHolderInputs[8]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[8]}
                      name="numOfCopyies"
                      type="number"
                      min="1"
                      value={data.numOfCopyies}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormGroup>

                <FormGroup row className="">
                  <FormGroup>
                    <Label for="fullNameAsker">{textPlaceHolderInputs[9]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[9]}
                      name="fullNameAsker"
                      type="text"
                      value={data.fullNameAsker}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workGivenDate">{textPlaceHolderInputs[10]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="workGivenDate"
                      type="date"
                      value={data.workGivenDate}
                      // onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="fullNameReciver">{textPlaceHolderInputs[11]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[11]}
                      name="fullNameReciver"
                      type="text"
                      value={data.fullNameReciver}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workRecivedDate">{textPlaceHolderInputs[14]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="workRecivedDate"
                      type="date"
                      value={data.workRecivedDate}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormGroup>

                <FormGroup row>
                  {/* <Label for="files">
                    <Button className="btn-new-blue">העלאה קובץ</Button>
                  </Label> */}
                  <Input
                    onChange={handleChange}
                    type="file"
                    accept=".pdf"
                    name="files"
                    id="Files"
                    multiple
                  />
                  {data.files.length === 0 ? (
                    <FormText color="muted">ניתן להעלאות רק קבצי PDF</FormText>
                  ) : (
                    <FormText hidden dir="ltr" color="muted">
                      {data.files}
                    </FormText>
                  )}
                </FormGroup>

                <div className="text-center">
                  <MDButton
                    color="mekatnar"
                    size="large"
                    // onClick={clickSubmit}
                    className="btn-new-blue"
                    type="submit"
                  >
                    שלח בקשה
                  </MDButton>
                </div>
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
        {showError()}
        {showSuccess()}
        {showLoading()}
        {NavigateUser()}

        {hozlaPrintRequestForm()}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
