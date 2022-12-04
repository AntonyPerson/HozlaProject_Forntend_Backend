/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import react, { useEffect } from "react";
import Popup from "reactjs-popup";
import Icon from "@mui/material/Icon";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Navigate, useParams } from "react-router-dom";
import MDProgress from "components/MDProgress";
import Error404 from "views/Error404";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import FileDownload from "js-file-download";

const clearanceOptions = ['בלמ"ס', "שמור", "סודי", "סודי ביותר"];
const bindingTypes = ["הידוק", "ספירלה", "חירור", "אחר"];
const copyTypes = {
  "b&w2": "שחור לבן דו צדדי",
  color1: "צבעוני יחיד",
  color2: "צבעוני דו צדדי",
  "b&w1": "שחור לבן יחיד",
};
const pageTypes = { A4: "A4", A3: "A3", A4b: "A4 בריסטול", A3b: "A3 בריסטול" };
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
  "שם אוסף העבודה",
];
const FieldReuestFormDB = () => {
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [errorDB, setErrorDB] = useState(false);
  const [error404, setError404] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [downloadFile, setDownloadFile] = useState(false);
  const [filesFromDB, setFilesFromDB] = useState([]);

  const [dates, setdates] = useState({});
  const [textArea, setTextArea] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hozlaRequests/${params.formID}`)
      .then((response) => {
        // console.log(`the object data`);
        console.log(response.data);
        console.log(params.formID);

        setFormData(response.data);
        setdates({
          workGivenDate: response.data.workGivenDate.split("T")[0],
          workRecivedDate: response.data.workRecivedDate.split("T")[0],
        });
        setTextArea(response.data.textArea.split("\n"));
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
        if (error.code === "ERR_BAD_REQUEST") {
          setError404(true);
        } else {
          setErrorDB(true);
        }
      });
  }, []);

  const getFiles = () => {
    axios
      .get(`http://localhost:5000/api/getMultipleFiles/${formData.files_id}`)
      .then((response) => {
        setFilesFromDB(response.data.files);
        console.log(`files: ${response.data}`);
        setShowFile(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const splitTextArea = () => {
  //   return textArea.map((text) => (
  //     <MDTypography variant="subtitle1" color="mekatnar">
  //       {text !== "" ? text : "אין הערות נוספות"}
  //     </MDTypography>
  //   ));
  // };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/getMultipleFiles/`, formData.files_id)
  //     .then((response) => {
  //       setFilesFromDB(response.data.files);
  //       console.log("files: " + response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [])
  function openFileANewWindows(filePath, fileName) {
    // const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    // const fileLink = document.createElement('a');
    // fileLink.href = fileURL;
    // const fileName = response.headers['content-disposition'].substring(22, 52);
    // fileLink.setAttribute('download', fileName);
    // fileLink.setAttribute('target', '_blank');
    // document.body.appendChild(fileLink);
    // fileLink.click();
    // fileLink.remove();

    // * no id
    // e.preventDefault();
    const urlPath = filePath;
    const newUrlPath = urlPath.slice(8);
    console.log(`Frontend ${newUrlPath}`);
    axios
      .get(`http://localhost:5000/api/downloadPDFFile/${newUrlPath}`, { responseType: "blob" })
      .then((res) => {
        FileDownload(res.data, fileName);
      });
  }

  const NavigateUser = () => {
    if (error404) {
      return <Navigate to="/Error404" />;
    }
  };
  const showError = () => (
    <Dialog
      open={errorDB}
      onClose={() => setErrorDB(false)}
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
          שגיאה בקבלת הבקשות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const getWorkStuts = (value) => {
    let stutus = "נשלח";
    let color = "error";
    if (value === 25) {
      stutus = "נשלח להוצלא";
      color = "error";
    } else if (value === 50) {
      stutus = "התקבל במערכת";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "מוכן לאיסוף";
      color = "success";
    }
    return [stutus, color];
  };
  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color={color} fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="60rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  const formTamplate = () => (
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
                <MDTypography variant="h2" fontWeight="medium" color="white" mt={1}>
                  טופס מספר {params.formID}{" "}
                </MDTypography>
              </MDBox>
              <MDTypography
                alignItems="center"
                component="h3"
                color={getWorkStuts(formData.status)[1]}
                fontWeight="medium"
              >
                {getWorkStuts(formData.status)[0]}
              </MDTypography>
              <Progress
                variant="gradient"
                color={getWorkStuts(formData.status)[1]}
                value={formData.status}
              />
              <Form style={{ textAlign: "right" }} role="form">
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="unit">{textPlaceHolderInputs[0]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="unit"
                      name="unit"
                      type="text"
                      value={formData.unit}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="anaf">{textPlaceHolderInputs[1]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="anaf"
                      type="text"
                      disabled
                      value={formData.anaf}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="mador">{textPlaceHolderInputs[2]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[2]}
                      name="mador"
                      type="text"
                      value={formData.mador}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phoneNumber">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[3]}
                      name="phoneNumber"
                      type="text"
                      value={formData.phoneNumber}
                      maxLength={10}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workName">{textPlaceHolderInputs[4]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[4]}
                      name="workName"
                      type="text"
                      value={formData.workName}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="workClearance">{textPlaceHolderInputs[5]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[5]}
                      name="workClearance"
                      type="text"
                      disabled
                      value={clearanceOptions[formData.workClearance]}
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="bindingType">{textPlaceHolderInputs[6]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[6]}
                      name="bindingType"
                      type="text"
                      value={bindingTypes[formData.bindingType]}
                      disabled
                    />
                    {formData.bindingType === "3" && (
                      <Input
                        name="bindingTypeOther"
                        type="text"
                        value={formData.bindingTypeOther}
                        disabled
                      />
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="copyType">{textPlaceHolderInputs[7]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[7]}
                      name="copyType"
                      type="text"
                      value={copyTypes[formData.copyType]}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="pageType">{textPlaceHolderInputs[13]}</Label>
                    <Input
                      name="pageType"
                      type="text"
                      value={pageTypes[formData.pageType]}
                      disabled
                    />
                    {/* <Popup
                      trigger={
                        <MDButton
                          variant="gradient"
                          color="mekatnar"
                          circular="true"
                          iconOnly="true"
                          size="small"
                        >
                          <Icon>help_outline</Icon>
                        </MDButton>
                      }
                    >
                      <MDAlert color="mekatnar">
                        <MDBox>
                          <MDTypography variant="h6" color="light">A0 (84.1 * 118.9 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A3 (29.7 * 42 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A4 (21 * 29.7 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A5 (14.85 * 21 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A6 (10.5 * 14.85 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A4 בריסטול (21 * 29.7 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A3 בריסטול (29.7 * 42 ס"מ)</MDTypography>
                        </MDBox>
                      </MDAlert>
                    </Popup> */}
                  </FormGroup>
                  <FormGroup>
                    <Label for="numOfCopyies">{textPlaceHolderInputs[8]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[8]}
                      name="numOfCopyies"
                      type="number"
                      min="1"
                      value={formData.numOfCopyies}
                      disabled
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
                      value={formData.fullNameAsker}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workGivenDate">{textPlaceHolderInputs[10]}</Label>
                    <Input name="workGivenDate" type="date" value={dates.workGivenDate} disabled />
                  </FormGroup>
                </FormGroup>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="fullNameReciver">{textPlaceHolderInputs[11]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[11]}
                      name="fullNameReciver"
                      type="text"
                      value={formData.fullNameReciver}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="fullNameTakein">{textPlaceHolderInputs[15]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[9]}
                      name="fullNameTakein"
                      type="text"
                      value={formData.fullNameTakein}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workRecivedDate">{textPlaceHolderInputs[14]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="workRecivedDate"
                      type="date"
                      value={dates.workRecivedDate}
                      disabled
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  {showFile === false ? (
                    <MDButton color="mekatnar" variant="outlined" onClick={getFiles}>
                      פתח קבצים
                    </MDButton>
                  ) : (
                    <FormText variant="body2" color="mekatnar">
                      לחץ כדי להוריד
                    </FormText>
                  )}
                  {filesFromDB &&
                    filesFromDB.map((file, index) => (
                      <FormGroup>
                        <MDAlert color="mekatnar">
                          <MDButton
                            dir="ltr"
                            iconOnly
                            variant="text"
                            onClick={() => openFileANewWindows(file.filePath, file.fileName)}
                          >
                            <Icon fontSize="small">download</Icon>&nbsp;
                          </MDButton>
                          <MDBox color="light">
                            {/* <MDTypography variant="h6" color="light">{index}</MDTypography> */}
                            <MDTypography variant="h6" color="light">
                              {file.fileName}
                            </MDTypography>
                            <MDTypography variant="body2" color="light">
                              {file.fileSize}
                            </MDTypography>
                          </MDBox>
                        </MDAlert>
                        {/* <MDButton
                          color="mekatnar"
                          size="large"
                          // onClick={clickSubmit}
                          className="btn-new-blue"
                          key={index}
                          onClick={openFileANewWindows}
                        >
                          <MDBox color="light">
                            <MDTypography variant="h6" color="light">{file.fileName}</MDTypography>
                            <MDTypography variant="body2" color="light">{file.fileSize}</MDTypography>
                          </MDBox>
                        </MDButton> */}

                        <FormGroup>
                          <MDBox bgColor="light" borderRadius="lg" shadow="lg" opacity={3} p={2}>
                            {textArea.map((text) => (
                              <MDTypography variant="subtitle1" color="mekatnar">
                                {text !== "" ? text : "אין הערות נוספות"}
                              </MDTypography>
                            ))}
                            {/* <MDTypography variant="subtitle1" color="mekatnar">
                              {formData.textArea !== "" ? formData.textArea : "אין הערות נוספות"}
                            </MDTypography> */}
                          </MDBox>
                        </FormGroup>
                      </FormGroup>
                    ))}
                </FormGroup>
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
      {showError()}
      {NavigateUser()}
      {formTamplate()}
      <Footer />
    </DashboardLayout>
  );
};

export default FieldReuestFormDB;
