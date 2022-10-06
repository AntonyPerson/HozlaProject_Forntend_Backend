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

export default function HozlaPrintRequestForm() {
    const currentDate = new Date();
    console.log(currentDate);
    let dateString = "";
    if (currentDate.getMonth() + 1 >= 10) {
        if (currentDate.getDate() >= 10) {
            dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1
                }-${currentDate.getDate()}`;
        } else {
            dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1
                }-0${currentDate.getDate()}`;
        }
    } else {
        if (currentDate.getDate() >= 10) {
            dateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1
                }-${currentDate.getDate()}`;
        } else {
            dateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1
                }-0${currentDate.getDate()}`;
        }
    }
    const [data, setData] = useState({
        sumColourfulPages: 0,
        sumNoColourfulPages: 0,
        numPages: 0,
        numColourfulBeats: 0,
        sumNoColourfulBeats: 0,
        selected: "A4",
        selectedBW: "---",

        errortype: "",
        error: false,
        successmsg: false,
        loading: false,
        redirectToReferrer: false,
    });

    const textPlaceHolderInputs = [
        "סה''כ דפים צבעוני",
        "סה''כ דפים שחור לבן",
        "מס' דפים",
        "מס' פעימות צבעוני",
        "מס' פעימות שחור לבן",
        "צילום בצבע:",
        "צילום בשחור לבן:"
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
        if (data.sumColourfulPages === "") {
            flag = false;
            ErrorReason.push("כמות הדפים צבעוניים לא צויינה");
            //toast.error(ErrorReason);
        }
        if (data.sumNoColourfulPages === "") {
            flag = false;
            ErrorReason.push("כמות דפיי שחור לבן לא צויינה ");
            //toast.error(ErrorReason);
        }
        if (data.numPages === "") {
            flag = false;
            ErrorReason.push("כמות הדפים לא צויינה ");
            //toast.error(ErrorReason);
        }
        if (data.numColourfulBeats === "") {
            flag = false;
            ErrorReason.push("כמות הפעימות צבעוני לא צויינה ");
            //toast.error(ErrorReason);
        }
        if (data.sumNoColourfulBeats === "") {
            flag = false;
            ErrorReason.push("כמות הפעימות שחור לבן לא צויינה ");
            //toast.error(ErrorReason);
        }
        if (data.selected === "---" && data.selectedBW === "---") {
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

    const SendFormData = (event) => {
        event.preventDefault();
        setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
        const requestData = {
            sumColourfulPages: data.sumColourfulPages,
            sumNoColourfulPages: data.sumNoColourfulPages,
            numPages: data.numPages,
            numColourfulBeats: data.numColourfulBeats,
            sumNoColourfulBeats: data.sumNoColourfulBeats,
            selected: data.selected,
            selectedBW: data.selectedBW,

            errortype: data.errortype,
            error: data.error,
            successmsg: data.successmsg,
            loading: data.loading,
            redirectToReferrer: data.redirectToReferrer,
        };
        console.log(requestData);

        // axios
        //     .post(`http://localhost:5000/adminForm/update`, requestData)
        //     .then((res) => {
        //         setData({
        //             ...data,
        //             work_id: res.data,
        //             loading: false,
        //             error: false,
        //             successmsg: true,
        //             NavigateToReferrer: false,
        //         });
        //         // toast.success(`הטופס נשלח בהצלחה`);
        //         // history.push(`/signin`);
        //         console.log(res.data);
        //     })
        //     .catch((error) => {
        //         // console.log(error);
        //         setData({
        //             ...data,
        //             errortype: error.response,
        //             loading: false,
        //             error: true,
        //             NavigateToReferrer: false,
        //         });
        //     });
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

    const hozlaAdminPrintInfoForm = () => (
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
                            </MDBox>
                            <MDTypography variant="h4" fontWeight="medium" color="black" mt={1}>
                                שם העבודה{" "}
                            </MDTypography>
                            <Label>פרטים נוספים על ההדפסה</Label>
                            {/* <Link to={`/adminForm/${}`} key={hozla._id}>
                                <MDButton
                                    variant="gradient"
                                    color="mekatnar"
                                    // onClick={() => {
                                    //   // setIsInfoPressed(true);
                                    //   // setpressedID(hozla._id);

                                    // }}
                                    circular="true"
                                    iconOnly="true"
                                    size="medium"
                                >
                                    <Icon>info</Icon>
                                </MDButton>
                            </Link> */}
                            <div className="text-center">
                                <MDButton
                                    color="mekatnar"
                                    size="large"
                                    // onClick={clickSubmit}
                                    className="btn-new-blue"
                                    type="submit"
                                >
                                    פתח קובץ
                                </MDButton>
                            </div>
                            <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                                <FormGroup row className="">
                                    <FormGroup>
                                        <Label for="sumColourfulPages">{textPlaceHolderInputs[0]}</Label>
                                        <Input
                                            name="sumColourfulPages"
                                            type="number"
                                            min="0"
                                            value={data.sumColourfulPages}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="sumNoColourfulPages">{textPlaceHolderInputs[1]}</Label>
                                        <Input
                                            name="sumNoColourfulPages"
                                            type="number"
                                            min="0"
                                            value={data.sumNoColourfulPages}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="numPages">{textPlaceHolderInputs[2]}</Label>
                                        <Input
                                            name="numPages"
                                            type="number"
                                            min="0"
                                            value={data.numPages}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="numColourfulBeats">{textPlaceHolderInputs[3]}</Label>
                                        <Input
                                            name="numColourfulBeats"
                                            type="number"
                                            min="0"
                                            value={data.numColourfulBeats}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="sumNoColourfulBeats">{textPlaceHolderInputs[4]}</Label>
                                        <Input
                                            name="sumNoColourfulBeats"
                                            type="number"
                                            min="0"
                                            value={data.sumNoColourfulBeats}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="selected">{textPlaceHolderInputs[5]}</Label>
                                        <Input
                                            name="selected"
                                            type="select"
                                            value={data.selected}
                                            onChange={handleChange}
                                        >
                                            <option value="---">
                                                ---
                                            </option>
                                            <option value="A4">A4</option>
                                            <option value="A3">A3</option>
                                            <option value="A4בריסטול">A4 בריסטול</option>
                                            <option value="A3בריסטול">A3 בריסטול</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="selectedBW">{textPlaceHolderInputs[6]}</Label>
                                        <Input
                                            name="selectedBW"
                                            type="select"
                                            value={data.selectedBW}
                                            onChange={handleChange}
                                        >
                                            <option value="---BW">
                                                ---
                                            </option>
                                            <option value="A4BW">A4</option>
                                            <option value="A3BW">A3</option>
                                            <option value="BWA4בריסטול">A4 בריסטול</option>
                                            <option value="BWA3בריסטול">A3 בריסטול</option>
                                        </Input>
                                    </FormGroup>
                                </FormGroup>
                                {/* <FormGroup row className="">
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
                  </FormGroup> */}

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

                {hozlaAdminPrintInfoForm()}
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}
