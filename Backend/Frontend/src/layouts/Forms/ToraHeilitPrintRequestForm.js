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
import Icon from "@mui/material/Icon";
import Popup from "reactjs-popup";
import Dropzone from "react-dropzone-uploader";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Upload } from "antd-upload";
// import { multipleFilesUpload } from "../../data/api";

import {
  // Button,
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
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { ToastContainer, toast, Icons } from "react-toastify";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React Components
import MDAlert from "components/MDAlert";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
} from "@mui/material";
import { DropzoneArea } from "react-mui-dropzone";
import { DropzoneAreaBase } from "material-ui-dropzone";

// for file upload from Data
import { singleFileUpload } from "Data/api";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
import A_paper_size_a6 from "../../assets/images/A-paper-size-a6.webp";
const { user } = isAuthenticated();

// console.log("Hozla Print Request Form");
// console.log(user);

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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [file, setFile] = useState([]);
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
    fullNameTakein: "",
    workGivenDate: dateString,

    fullNameReciver: "",
    workRecivedDate: "",

    personalnumber: user.personalnumber,
    id_files: "",
    // role: "",

    files_id: "",

    pageType: "A4",

    ordernum: "",
    forTypePrint: "gdod",

    clientNote: "",

    errortype: "",
    // propPrint: {
    //   nameFile: "",
    //   props: {
    //     propPageType: "A4",
    //     propCopyType: "b&w2",
    //   },
    // },
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const [propPrint, setPropPrint] = useState({
    nameFile: "",
    props: {
      propPageType: "A4",
      propCopyType: "b&w2",
    },
  });
  // const [textArea, setTextArea] = useState("");
  const [files, setFiles] = useState([]);
  const [toraHeilitVolume, setToraHeilitVolume] = useState([
    {
      volumeType: "כרך 1",
      volumeName: "מערך הטנ''א בגדוד",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 2",
      volumeName: "מערך הטנ''א בחטיבה",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 3",
      volumeName: "מערך הטנ''א באוגדה",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 4",
      volumeName: "מערך הטנ''א בגיס",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 5",
      volumeName: "אגד טנ''א ארצי",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 6",
      volumeName: "מערך הטנ''א בפיקוד",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 7",
      volumeName: "מערך הטנ''א בזרועות ובאגפים",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 8",
      volumeName: "מערך הטנ''א במטכ''ל ובמרכזים",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 10",
      volumeName: "מערך החלפים והמכללים",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 12",
      volumeName: "אחזקת צמ''ח",
      numOfCopies: 0,
    },
    {
      volumeType: "כרך 13",
      volumeName: "הטנ''א בצורות הקרב השונות",
      numOfCopies: 0,
    },
    {
      volumeType: "טנ''ח 2",
      volumeName: "מדדי שחיקה",
      numOfCopies: 0,
    },
    {
      volumeType: "טנ''ח 4",
      volumeName: "פנקס קודים לדיווח אחזקתי",
      numOfCopies: 0,
    },
    {
      volumeType: "טנ''ח 5",
      volumeName: "פנקס קודים טנ''א לחלפים",
      numOfCopies: 0,
    },
    {
      volumeType: "טנ''ח 6",
      volumeName: "פנקס שליטה למחטפ/מפקד כיתה",
      numOfCopies: 0,
    },
    {
      volumeType: "טנ''ח 7",
      volumeName: "פנקס שליטה לטנ''א גדודי",
      numOfCopies: 0,
    },
    {
      volumeType: "טנ''ח 8",
      volumeName: "חוברת תבניות לרמות השונות",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 10",
      volumeName: "פנקס משואה",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2",
      volumeName: "חוברת ניתוח תקלות משביתות בצל''ם עיקרי",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 א",
      volumeName: "איתור תקלות אוטומבטיבי",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 ב",
      volumeName: "איתור תקלות צריח",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 ג",
      volumeName: "איתור תקלות בקרה ותצפית",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 ד",
      volumeName: "איתור תקלות מ''י",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 ה",
      volumeName: "איתור תקלות מערכת גיל",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 ו",
      volumeName: "איתור תקלות רכב מבצעי",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 ח",
      volumeName: "פנקס כיס תחמושת",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 ט",
      volumeName: "איתור תקלות נמ''ר",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 י",
      volumeName: "הנעה - מרכבה סימן 4",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 יא",
      volumeName: "איתור תקלות נק''ל",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 יב",
      volumeName: "איתור תקלות נגמ''ש",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 יג",
      volumeName: "איתור תקלות אוטומטיבי תומ''ת",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 יד",
      volumeName: "איתור תקלות אכזרית",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 טו",
      volumeName: "איתור תקלות אכזרית",
      numOfCopies: 0,
    },
    {
      volumeType: "ע' 2 טז",
      volumeName: "איתור תקלות גנרטורים",
      numOfCopies: 0,
    },
  ]);
  const [open, setOpen] = React.useState(false);
  const { getRootProps, getInputProps } = useDropzone({});
  const inputRef = React.useRef(null);
  const requestVolume = [];

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
    "עבור",
  ];
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   console.log(`You upload ${files.length} files`);
  // });

  const handleUploadFiles = (uploadFiles) => {
    const uploaded = [...files];
    let limitExceeded = false;
    uploadFiles.some((filePush) => {
      if (uploaded.findIndex((f) => f.name === filePush.name) === -1) {
        uploaded.push(filePush);
        // setData({
        //   ...data,
        //   [propPrint.nameFile]: `${file.name}`,
        //   [propPrint.props.propCopyType]: "b&w2",
        //   [propPrint.props.propPageType]: "A4",
        // });
        // console.log("file name: " + data.propPrint.nameFile);
        // setPropPrint({ ...propPrint, nameFile: filePush.name });
        // setTextArea({ ...textArea, nameFiletxt: filePush.name });

        // if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length < 0) {
          // alert(`You can only add a maximum of ${MAX_COUNT} files`);
          // setFileLimit(false);
          limitExceeded = false;
          return false;
        }
      }
      return setFiles(uploaded);
    });
    if (!limitExceeded) setFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    e.preventDefault();
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };
  const deleteFile1 = (i) => {
    const index = files.indexOf(i);

    const x = files.splice(index, 1);
    setFiles(files);
    console.log(x);
  };
  const handleRemove = (e) => {
    const array = [...files]; // make a separate copy of the array
    const index = array.indexOf(e.target.value);
    if (index !== -1) {
      array.splice(index, 1);
      setFiles(array);
      console.log(`remove file: ${files}`);
    }
    // const newFiles = files.filter((file) => file !== deleteFile);
    // setFiles(newFiles);
  };
  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }
  const handleChangeNumPrintTH = (index) => (evt) => {
    // const { value } = evt.target;
    // setToraHeilitVolume({ ...toraHeilitVolume, [evt.target.name]: value });
    const newToraHeilitVolume = [...toraHeilitVolume]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newToraHeilitVolume[index].numOfCopies = evt.target.value; // replace e.target.value with whatever you want to change it to

    setToraHeilitVolume(newToraHeilitVolume);
    // const numPrintList = [...toraHeilitVolume];
    // numPrintList[index][name] = value;
    // setToraHeilitVolume({ ...toraHeilitVolume, numOfCopies: numPrintList });
    console.log(toraHeilitVolume);
  };
  function addNumPrintTH() {
    // const { value } = evt.target;
    setData([{ [data.PrintTH.numPrint]: 0 }]);
    console.log(data.PrintTH);
  }
  function handleChangePropPrintFile(evt) {
    const { value } = evt.target;
    setData({ ...propPrint, [evt.target.name]: value });
  }
  function handleChangeTxtAera(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    arrayRequestVolume();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };
  const arrayRequestVolume = () => {
    let num = 0;
    toraHeilitVolume.forEach((volume, index) => {
      if (volume.numOfCopies > 0) {
        requestVolume.push(volume);
      } else {
        num += 1;
      }
      // return setToraHeilitVolume(requestVolume);
    });
    console.log(`num ${num} , requestVolume ${requestVolume}`);
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
    if (data.workGivenDate === "") {
      flag = false;
      ErrorReason.push("לא צויין תאריך מסירת העבודה");
      // toast.error(ErrorReason);
    }
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
    if (requestVolume.length === 0) {
      flag = false;
      ErrorReason.push("לא הוזן כמות עותקים ");
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
    // CreateAssessmentData();
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
    // console.log(`files: ${files}`);
    //* Sending only the files to the DB
    //! the separating code lines from singlefile to multifiles
    // const formFilesData = new FormData();
    // Object.keys(files).forEach((key) => {
    //   formFilesData.append("files", files[key]);
    // });

    const requestData = {
      typeRequest: "ToraHeilit",
      forTypePrint: data.forTypePrint,
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
      fullNameTakein: data.fullNameTakein,
      workRecivedDate: data.workRecivedDate,

      personalnumber: data.personalnumber,
      // role: data.role,

      // files: data.files,
      // files_id: res.data,
      pageType: data.pageType,
      ordernum: data.ordernum,
      clientNote: data.clientNote,
      toraHeilitVolumes: JSON.stringify(requestVolume),
    };
    console.log(requestData);
    // axios.post("http://localhost:5000/api/multipleFiles", formFilesData, {}).then((res) => {
    //   console.log("from the file axios");
    //   console.log(res.data);

    axios
      .post(`http://localhost:5000/hozlaRequests/add`, requestData)
      .then((response) => {
        setData({
          ...data,
          work_id: response.data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        // toast.success(`הטופס נשלח בהצלחה`);
        // history.push(`/signin`);
        console.log(response.data);
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
    // });
  };

  const dataFiles = files.map(
    (el, i) => (
      // {
      //   return
      <Draggable key={el.id} draggableId={el.name} index={i}>
        {
          (provided) => (
            // {
            //   return
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <FormGroup>
                <MDAlert color="mekatnar">
                  <MDButton
                    dir="ltr"
                    iconOnly
                    variant="text"
                    // onClick={deleteFile1(el.id)}
                    onClick={() => {
                      if (i > -1) {
                        setFiles((currentFile) =>
                          files.filter((oneFile, oneIndex) => oneIndex !== i)
                        );
                      }
                    }}
                    // onClick={handleDelete}
                    // onClick={handleRemove}

                    // onClick={() => fileRemove(el)}
                  >
                    <Icon fontSize="small">delete</Icon>&nbsp;
                  </MDButton>
                  <MDBox>
                    <MDTypography variant="h6" color="light">
                      {el.name}
                    </MDTypography>
                    <MDTypography variant="body2" color="light">
                      {el.size} MB
                    </MDTypography>
                  </MDBox>
                </MDAlert>
                {/* <TextareaAutosize
                  minLength={1}
                  maxRows={2}
                  aria-label="maximum height"
                  placeholder="הערות נוספות..."
                  style={{ minWidth: 380 }}
                /> */}

                {/* <MDInput
                  label={el.name}
                  onChange={handleChangeTxtAera}
                  style={{ minWidth: 360 }}
                  multiline
                  rows={3}
                  contrast
                  // value={() => {
                  //   setTextArea({ ...textArea, txt: filePush.name });
                  // }}
                /> */}

                {/* <textarea
                name="textAreaValue"
                rows={3} cols={55}
                value={data.textAreaValue}
                onChange={handleChangeTxtAera}
                placeholder="הערות הדפסה">
                {data.textAreaValue}
              </textarea> */}
                {/* <MDButton onClick={handleClickOpen} color="mekatnar" variant="text" size="medium">
                בחר אפשרות הדפסה
              </MDButton>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>
                  הגדר אפשרות הדפסה עבור:
                  <MDTypography variant="h6" color="mekatnar">
                    {el.name}
                  </MDTypography>
                </DialogTitle>

                <DialogContent>
                  <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Label for={`${propPrint.nameFile}"copyType"`}>
                        {textPlaceHolderInputs[7]}
                      </Label>
                      <Input
                        name={`${propPrint.nameFile}"copyType"`}
                        // name={data.propPrint.nameFile}
                        type="select"
                        value={propPrint.props.propCopyType}
                        onChange={handleChangePropPrintFile}
                      >
                        <option defult value="b&w2">
                          שחור לבן דו צדדי
                        </option>
                        <option value="color1">צבעוני יחיד</option>
                        <option value="color2">צבעוני דו צדדי</option>
                        <option value="b&w1">שחור לבן יחיד</option>
                      </Input>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Label for={`${propPrint.nameFile}"pageType"`}>
                        {textPlaceHolderInputs[13]}
                      </Label>
                      <Input
                        name={`${propPrint.nameFile}"pageType"`}
                        type="select"
                        value={propPrint.props.propPageType}
                        onChange={handleChangePropPrintFile}
                      >
                        <option value={`${propPrint.props.propPageType}A0`}>A0</option>
                        <option value={`${propPrint.props.propPageType}A3`}>A3</option>
                        <option defult value={`${propPrint.props.propPageType}A4`}>
                          A4
                        </option>
                        <option value={`${propPrint.props.propPageType}A5`}>A5</option>
                        <option value={`${propPrint.props.propPageType}A6`}>A6</option>
                        <option value={`${propPrint.props.propPageType}A4b`}>A4 בריסטול</option>
                        <option value={`${propPrint.props.propPageType}A3b`}>A3 בריסטול</option>
                      </Input>
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>ביטול</Button>
                  <Button onClick={handleClose}>אישור</Button>
                </DialogActions>
              </Dialog> */}
              </FormGroup>
            </div>
          )
          // }
        }
      </Draggable>
    )
    // }
  );
  useEffect(() => {
    console.log(`You clicked ${dataFiles} times`);
  }, [dataFiles]);

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

  // ! try DND
  // const [items, setItems] = useState(files);

  // const dataMap = files.map((el, i) => {
  //   return (
  //     <Draggable key={el.id} draggableId={el.id.toString()} index={i} >
  //       {(provided) => {
  //         return (
  //           <div
  //             {...provided.draggableProps}
  //             {...provided.dragHandleProps}
  //             ref={provided.innerRef}
  //           >
  //             <MDAlert color="mekatnar">
  //               {el.name}
  //             </MDAlert>
  //           </div>
  //         )
  //       }}
  //     </Draggable >
  //   )
  // })
  const handleOnDragEnd = (res) => {
    if (!res.destination) return;
    // const filesCopy = [...files];
    const filesCopy = Array.from(files);

    const [reorderedItem] = filesCopy.splice(res.source.index, 1);
    filesCopy.splice(res.destination.index, 0, reorderedItem);

    setFiles(filesCopy);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleAdd = () => {
    setFiles([...files]);
  };
  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  // const InputFiles = ({ accept, onFiles, files, getFilesFromEvent }) => {
  //   const text = files.length > 0 ? "Add more files" : "Choose files";

  //   return (
  //     <label
  //       style={{
  //         backgroundColor: "#007bff",
  //         color: "#fff",
  //         cursor: "pointer",
  //         padding: 15,
  //         borderRadius: 3,
  //       }}
  //     >
  //       {text}
  //       <input
  //         style={{ display: "none" }}
  //         type="file"
  //         accept={accept}
  //         multiple
  //         onChange={(e) => {
  //           getFilesFromEvent(e).then((chosenFiles) => {
  //             onFiles(chosenFiles);
  //           });
  //         }}
  //       />
  //     </label>
  //   );
  // };

  // const handleChangeStatus = ({ meta }, status) => {
  //   console.log(status, meta)
  // }

  // const handleSubmit = (files, allFiles) => {
  //   console.log(files.map(f => f.meta))
  //   allFiles.forEach(f => f.remove())
  // }

  // ! try DND

  const ToraHeilitPrintRequestForm = () => (
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
                  טופס הזמנת תורה חילית{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="forTypePrint">{textPlaceHolderInputs[16]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[6]}
                      name="forTypePrint"
                      type="select"
                      value={data.forTypePrint}
                      onChange={handleChange}
                    >
                      <option value="gdod">גדוד</option>
                      <option value="hativa">חטיבה</option>
                      <option value="ogda">אוגדה</option>
                      <option value="pikod">פיקוד</option>
                      <option value="matkal">מטכל</option>
                      {/* <option value="ogda">אוגדה</option> */}
                    </Input>
                  </FormGroup>
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
                      <option value="A0">A0</option>
                      <option value="A3">A3</option>
                      <option defult value="A4">
                        A4
                      </option>
                      <option value="A5">A5</option>
                      <option value="A6">A6</option>
                      <option value="A4b">A4 בריסטול</option>
                      <option value="A3b">A3 בריסטול</option>
                    </Input>
                    <Popup
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
                        {/* <MDBox> */}
                        <img
                          src={A_paper_size_a6}
                          alt="פרטי סוג דף"
                          style={{ width: 350, height: 250 }}
                        />
                        {/* <MDTypography variant="h6" color="light">A0 (84.1 * 118.9 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A3 (29.7 * 42 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A4 (21 * 29.7 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A5 (14.85 * 21 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A6 (10.5 * 14.85 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A4 בריסטול (21 * 29.7 ס"מ)</MDTypography>
                          <MDTypography variant="h6" color="light">A3 בריסטול (29.7 * 42 ס"מ)</MDTypography> */}
                        {/* </MDBox> */}
                      </MDAlert>
                    </Popup>
                  </FormGroup>
                  {/* <FormGroup>
                    <Label for="numOfCopyies">{textPlaceHolderInputs[8]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[8]}
                      name="numOfCopyies"
                      type="number"
                      min="1"
                      value={data.numOfCopyies}
                      onChange={handleChange}
                    />
                  </FormGroup> */}
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
                    <Label for="fullNameTakein">{textPlaceHolderInputs[15]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[9]}
                      name="fullNameTakein"
                      type="text"
                      value={data.fullNameTakein}
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
                  <FormGroup>
                    <FormText color="muted">ניתן לרשום כמות עותקים עבור כל כרך</FormText>
                  </FormGroup>
                  {/* <div>{dataTHFiles}</div> */}
                  {/* <MDTypography variant="h6" color="mekatnar">
                    {toraHeilitFiles.length}
                  </MDTypography> */}
                  {toraHeilitVolume.map((volume, index) => (
                    <Container>
                      <FormGroup>
                        <MDTypography variant="h6" color="mekatnar">
                          {volume.volumeType}:
                        </MDTypography>
                        <MDBox bgColor="light" opacity={5} shadow="lg" variant="contained" p={1}>
                          <MDAlert color="mekatnar">
                            <MDTypography variant="h6" color="light">
                              {volume.volumeName}
                            </MDTypography>
                          </MDAlert>

                          <Input
                            // placeholder={textPlaceHolderInputs[8]}
                            name={volume.numOfCopies}
                            type="number"
                            min="0"
                            value={volume.numOfCopies}
                            onChange={handleChangeNumPrintTH(index)}
                          />
                        </MDBox>
                      </FormGroup>
                    </Container>
                  ))}
                </FormGroup>

                <FormGroup row>
                  <FormGroup>
                    {/* <input
                      accept=".pdf"
                      type="file"
                      id="select-files"
                      style={{ display: 'none' }}
                      onChange={handleFileEvent}
                      multiple
                    />
                    <Label htmlFor="select-files">
                      <MDButton variant="contained" color="mekatnar" component="span">
                        העלאת קובץ
                      </MDButton>
                    </Label> */}

                    {/* <Input
                      type="file"
                      multiple
                      accept="application/pdf, image/png, image/jpeg"
                      onChange={handleFileEvent}
                      // disabled={fileLimit}
                    /> */}
                  </FormGroup>

                  {/* <MDTypography variant="h6" color="mekatnar">
                    נבחרו {files.length} קבצים
                  </MDTypography>
                  {files.length === 0 ? (
                    <FormText color="muted">ניתן להעלאות רק קבצי pdf .jpeg .png.</FormText>
                  ) : (
                    <Container>
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="items">
                          {
                            (provided) => (
                              // {
                              //   return
                              <div {...provided.droppableProps} ref={provided.innerRef}>
                                {dataFiles}
                                {provided.placeholder}
                              </div>
                            )
                            // }
                          }
                        </Droppable>
                      </DragDropContext>
                      <FormGroup>
                        <FormText color="muted">ניתן לגרור את הקבצים לפי הסדר</FormText>
                      </FormGroup>
                      <FormGroup>
                        <Label for="clientNote">הערות נוספות...</Label>
                        <Input
                          name="clientNote"
                          type="textarea"
                          // label=""
                          onChange={handleChangeTxtAera}
                          style={{ minWidth: 360 }}
                          multiline
                          rows={3}
                          // contrast
                          value={data.clientNote}
                          // value={() => {
                          //   setTextArea({ ...textArea, txt: filePush.name });
                          // }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <MDButton
                          dir="ltr"
                          color="mekatnar"
                          // iconOnly
                          variant="text"
                          // onClick={handleDelete}
                          // onClick={handleRemove}
                          onClick={() => {
                            setFiles([]);
                          }}
                          // onClick={() => fileRemove(el)}
                        >
                          מחק הכל
                        </MDButton>
                      </FormGroup>
                    </Container>
                  )} */}
                  {
                    // <Container>
                    //   <DragDropContext onDragEnd={handleOnDragEnd}>
                    //     <Droppable droppableId='items'>
                    //       {(provided) => {
                    //         return (
                    //           <MDBox bgColor="light"
                    //             {...provided.droppableProps}
                    //             ref={provided.innerRef}
                    //           >
                    //             {
                    //               files.map((el, i) => {
                    //                 return (
                    //                   <Draggable key={el.id} draggableId={el.name} index={i} >
                    //                     {(provided) => {
                    //                       return (
                    //                         <div
                    //                           ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    //                         >
                    //                           <MDAlert color="mekatnar" >
                    //                             <MDButton
                    //                               iconOnly
                    //                               variant="text"
                    //                               onClick={handleRemove}
                    //                             // onClick={handleDelete}
                    //                             // onClick={() => {
                    //                             //   setFiles(
                    //                             //     el.filter(a =>
                    //                             //       a.id !== files.id
                    //                             //     ));
                    //                             // }}
                    //                             >
                    //                               <Icon fontSize="small">delete</Icon>&nbsp;
                    //                             </MDButton>
                    //                             <MDBox>
                    //                               <MDTypography variant="h6" color="light">{el.name}</MDTypography>
                    //                               <MDTypography variant="subtitle2" color="light">{el.size} MB</MDTypography>
                    //                             </MDBox>
                    //                           </MDAlert>
                    //                           <Label for={`${el.name}"copyType"`}>{textPlaceHolderInputs[7]}</Label>
                    //                           <Input
                    //                             // placeholder={textPlaceHolderInputs[7]}
                    //                             name={`${el.name}"copyType"`}
                    //                             // name={data.propPrint.nameFile}
                    //                             type="select"
                    //                             value={data.propPrint.props.propCopyType}
                    //                             onChange={handleChange}
                    //                           >
                    //                             <option defult value="b&w2">
                    //                               שחור לבן דו צדדי
                    //                             </option>
                    //                             <option value="color1">צבעוני יחיד</option>
                    //                             <option value="color2">צבעוני דו צדדי</option>
                    //                             <option value="b&w1">שחור לבן יחיד</option>
                    //                           </Input>
                    //                           <Label for={`${el.name}"copyType"`}>{textPlaceHolderInputs[13]}</Label>
                    //                           <Input
                    //                             name={`${el.name}"pageType"`}
                    //                             type="select"
                    //                             value={data.propPrint.props.propPageType}
                    //                             onChange={handleChange}
                    //                           >
                    //                             <option value={`${el.name}"A0"`}>A0</option>
                    //                             <option value={`${el.name}"A3"`}>A3</option>
                    //                             <option defult value={`${el.name}"A4"`}>A4</option>
                    //                             <option value={`${el.name}"A5"`}>A5</option>
                    //                             <option value={`${el.name}"A6"`}>A6</option>
                    //                             <option value={`${el.name}"A4b"`}>A4 בריסטול</option>
                    //                             <option value={`${el.name}"A3b"`}>A3 בריסטול</option>
                    //                           </Input>
                    //                           {/* <Popup
                    //                             trigger={
                    //                               <MDButton
                    //                                 variant="gradient"
                    //                                 color="mekatnar"
                    //                                 circular="true"
                    //                                 iconOnly="true"
                    //                                 size="small"
                    //                               >
                    //                                 <Icon>help_outline</Icon>
                    //                               </MDButton>
                    //                             }
                    //                           >
                    //                             <MDAlert color="mekatnar">
                    //                               <img src={A_paper_size_a6} style={{ width: 350, height: 250 }} />
                    //                             </MDAlert>
                    //                           </Popup> */}
                    //                         </div>
                    //                       )
                    //                     }}
                    //                   </Draggable >
                    //                 )
                    //               })
                    //             }
                    //             {provided.placeholder}
                    //           </MDBox>
                    //         )
                    //       }}
                    //     </Droppable>
                    //   </DragDropContext>
                    // </Container>
                    // <DragDropContext onDragEnd={handleOnDragEnd}>
                    //   <Droppable>
                    //     {(provided) => (
                    //       <ul {...provided.droppableProps} ref={provided.innerRef}>
                    //         {files.map((file => {
                    //           return (
                    //             <Draggable>
                    //               {(provided) => (
                    //                 // <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    //                 //   <div>
                    //                 //     {/* <img src={thumb} alt={`${name} Thumb`} /> */}
                    //                 //   </div>
                    //                 //   <p>
                    //                 //     {name}
                    //                 //   </p>
                    //                 // </li>
                    //                 <MDAlert color="mekatnar" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    //                   {/* <MDButton
                    //                     iconOnly
                    //                     variant="text"
                    //                     // onClick={handleDelete}
                    //                     onClick={() => {
                    //                       setFiles(
                    //                         file.filter(a =>
                    //                           a.id !== files.id
                    //                         )
                    //                       );
                    //                     }}
                    //                   >
                    //                     <Icon fontSize="small">delete</Icon>&nbsp;
                    //                   </MDButton> */}
                    //                   <MDBox>
                    //                     <MDTypography variant="h6" color="light">{file.name}</MDTypography>
                    //                     <MDTypography variant="subtitle2" color="light">{file.size} MB</MDTypography>
                    //                   </MDBox>
                    //                 </MDAlert>
                    //               )}
                    //             </Draggable>
                    //           );
                    //         }))}
                    //         {provided.placeholder}
                    //       </ul>
                    //     )}
                    //   </Droppable>
                    // </DragDropContext>
                    // files.map(file => (
                    //   <div >
                    //     <MDAlert color="mekatnar" >
                    //       <MDButton
                    //         iconOnly
                    //         variant="text"
                    //         // onClick={handleDelete}
                    //         onClick={() => {
                    //           setFiles(
                    //             file.filter(a =>
                    //               a.id !== files.id
                    //             )
                    //           );
                    //         }}
                    //       >
                    //         <Icon fontSize="small">delete</Icon>&nbsp;
                    //       </MDButton>
                    //       <MDBox>
                    //         <MDTypography variant="h6" color="light">{file.name}</MDTypography>
                    //         <MDTypography variant="subtitle2" color="light">{file.size} MB</MDTypography>
                    //       </MDBox>
                    //     </MDAlert>
                    //   </div>
                    // ))
                  }
                </FormGroup>
                {/*
                      // ! Show img and file
                       {imageUrl && selectedFile && (
                         <MDBox mt={2} textAlign="center">
                          <div>קבצים:</div>
                          <img src={imageUrl} alt={selectedFile.name} height="100px" />
                          <p>
                            {selectedFile.name}
                          </p>
                        </MDBox>
                      )} 
                      // ! Show img and file
                      */}

                <div className="text-center">
                  <MDButton
                    color="mekatnar"
                    size="large"
                    // onClick={clickSubmit}
                    className="btn-new-blue"
                    type="submit"
                  >
                    שלח בקשה
                    <Icon fontSize="small">upload</Icon>&nbsp;
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

        {ToraHeilitPrintRequestForm()}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
