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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Upload } from "antd-upload";
import Grid from "@mui/material/Grid";
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
  const [toraHeilitVolume, setToraHeilitVolume] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { getRootProps, getInputProps } = useDropzone({});
  const [change, setChange] = useState(false);
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
    "שם מזמין העבודה",
    "תאריך מסירת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך נדרש לקבלת העבודה",
    "שם אוסף העבודה",
    "עבור",
  ];
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   console.log(`You upload ${files.length} files`);
  // });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/toraHeilit/`)
      .then((response) => {
        // console.log(`the object data`);
        console.log(`tora ${response}`);
        if (response.data === null) {
          const addVolume = {
            toraHeilitVolumes: JSON.stringify([
              {
                volumeType: "כרך 1",
                maxNumConfirm: 2,
                volumeName: "מערך הטנ''א בגדוד",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 2",
                maxNumConfirm: 2,
                volumeName: "מערך הטנ''א בחטיבה",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 3",
                maxNumConfirm: 2,
                volumeName: "מערך הטנ''א באוגדה",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 4",
                maxNumConfirm: 2,
                volumeName: "מערך הטנ''א בגיס",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 5",
                maxNumConfirm: 2,
                volumeName: "אגד טנ''א ארצי",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 6",
                maxNumConfirm: 2,
                volumeName: "מערך הטנ''א בפיקוד",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 7",
                maxNumConfirm: 2,
                volumeName: "מערך הטנ''א בזרועות ובאגפים",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 8",
                maxNumConfirm: 2,
                volumeName: "מערך הטנ''א במטכ''ל ובמרכזים",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 10",
                maxNumConfirm: 2,
                volumeName: "מערך החלפים והמכללים",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 11",
                maxNumConfirm: 2,
                volumeName: "מערך החילוץ והגרירה",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 12",
                maxNumConfirm: 2,
                volumeName: "אחזקת צמ''ח",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "כרך 13",
                maxNumConfirm: 2,
                volumeName: "הטנ''א בצורות הקרב השונות",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "טנ''ה 2",
                maxNumConfirm: 10,
                volumeName: "מדדי שחיקה",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "טנ''ה 4",
                maxNumConfirm: 10,
                volumeName: "פנקס קודים לדיווח אחזקתי",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "טנ''ה 5",
                maxNumConfirm: 10,
                volumeName: "פנקס קודים טנ''א לחלפים",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "טנ''ה 6",
                maxNumConfirm: 10,
                volumeName: "פנקס שליטה למחטפ/מפקד כיתה",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "טנ''ה 7",
                maxNumConfirm: 10,
                volumeName: "פנקס שליטה לטנ''א גדודי",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "טנ''ה 8",
                maxNumConfirm: 10,
                volumeName: "חוברת תבניות לרמות השונות",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 10",
                maxNumConfirm: 10,
                volumeName: "פנקס משואה",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2",
                maxNumConfirm: 10,
                volumeName: "חוברת ניתוח תקלות משביתות בצל''ם עיקרי",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 א",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות אוטומבטיבי",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 ב",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות צריח",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 ג",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות בקרה ותצפית",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 ד",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות מ''י",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 ה",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות מערכת גיל",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 ו",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות רכב מבצעי",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 ח",
                maxNumConfirm: 10,
                volumeName: "פנקס כיס תחמושת",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 ט",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות נמ''ר",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 י",
                maxNumConfirm: 10,
                volumeName: "הנעה - מרכבה סימן 4",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 יא",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות נק''ל",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 יב",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות נגמ''ש",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 יג",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות אוטומטיבי תומ''ת",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 יד",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות אכזרית",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 טו",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות צמ''ה",
                numOfCopies: 0,
                statusVol: 0,
              },
              {
                volumeType: "ע' 2 טז",
                maxNumConfirm: 10,
                volumeName: "איתור תקלות גנרטורים",
                numOfCopies: 0,
                statusVol: 0,
              },
            ]),
          };
          axios.post(`http://localhost:5000/toraHeilit/add`, addVolume).then((res) => {
            // toast.success(`הטופס נשלח בהצלחה`);
            // history.push(`/signin`);
            console.log(res.data);
            setToraHeilitVolume(JSON.parse(response.data.toraHeilitVolumes));
          });
          // console.log(twoSides);
        } else {
          setToraHeilitVolume(JSON.parse(response.data.toraHeilitVolumes));
          console.log(`data`);
          console.log(JSON.parse(response.data.toraHeilitVolumes));
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
      });
  }, []);

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
  const hozlaConfirm = (value, maxNum) => {
    let confirm = "";
    if (value > 2 && maxNum === 2) {
      confirm = "נדרש אישור מדור תורה";
    } else if (value > 10 && maxNum === 10) {
      confirm = "נדרש אישור מדור תורה";
    } else {
      confirm = "";
    }
    return [confirm];
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

    if (change === false) {
      flag = false;
      ErrorReason.push("לא בוצעו שינויים");
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
      // typeRequest: "ToraHeilit",

      // workName: "תורה חילית",

      toraHeilitVolumes: JSON.stringify(toraHeilitVolume),
    };
    console.log(requestData);
    // axios.post("http://localhost:5000/api/multipleFiles", formFilesData, {}).then((res) => {
    //   console.log("from the file axios");
    //   console.log(res.data);

    axios
      .post(`http://localhost:5000/toraHeilit/update`, requestData)
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

  const handleStatusChange = (index) => (evt) => {
    const newToraHeilitVolume = [...toraHeilitVolume]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newToraHeilitVolume[index].statusVol = evt.target.value; // replace e.target.value with whatever you want to change it to

    setToraHeilitVolume(newToraHeilitVolume);
    // const numPrintList = [...toraHeilitVolume];
    // numPrintList[index][name] = value;
    // setToraHeilitVolume({ ...toraHeilitVolume, numOfCopies: numPrintList });
    console.log(toraHeilitVolume);
    setChange(true);
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
      return <Navigate to="/toraHeilitrequestForm" />;
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
          סטטוסיי תורה חילית עודכנו
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר אסמכתא: {data.work_id}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            <Link style={{ color: "white" }} to="/toraHeilitrequestForm">
              לצפייה בעדכון טופס
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

  // ! try DND

  const ToraHeilitVolumeAdmin = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="6" md="8">
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
                  עדכון סטטוס תורה חילית{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row className="">
                  {toraHeilitVolume.map((volume, index) => (
                    // <Container>
                    <Grid item xs={6} sm={4} md={4} key={index} spacing={3}>
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
                            // placeholder={textPlaceHolderInputs[5]}
                            name="workClearance"
                            type="select"
                            value={volume.statusVol}
                            onChange={handleStatusChange(index)}
                          >
                            <option value="0">ניתן להזמין</option>
                            <option value="100">תורה בתהליך עדכון</option>
                          </Input>
                          {/* {volume.statusVol === "100" ? (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  // defaultChecked
                                  checked="false"
                                  value="100"
                                  onChange={handleStatusChange(index)}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label={<MDTypography for="twoSides">בתהליך עדכון</MDTypography>}
                              labelPlacement="start"
                            />
                          ) : (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  // defaultChecked
                                  checked="false"
                                  value="0"
                                  onChange={handleStatusChange(index)}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label={<MDTypography for="twoSides">בתהליך עדכון</MDTypography>}
                              labelPlacement="start"
                            />
                          )} */}

                          {/* {volume.numOfCopies > 2 && index < 11 && (
                            <MDTypography variant="h6" color="mekatnar">
                              נדרש אישור הוצל"א
                            </MDTypography>
                          )}{" "}
                          {volume.numOfCopies > 10 && index > 10 && (
                            <MDTypography variant="h6" color="mekatnar">
                              נדרש אישור הוצל"א
                            </MDTypography>
                          )} */}
                        </MDBox>
                      </FormGroup>
                    </Grid>
                    // </Container>
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
                    עדכן
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

        {ToraHeilitVolumeAdmin()}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
