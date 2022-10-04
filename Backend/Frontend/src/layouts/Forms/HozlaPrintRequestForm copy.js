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
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  Input,
  FormText,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import { toast } from "react-toastify";
export default function HozlaPrintRequestForm() {
  const [data, setData] = useState({
    unit: "",
    anaf: "",
    mador: "",
    phoneNumber: "",

    workName: "",
    workClearance: "",
    bindingType: "",
    bindingTypeOther: "",
    copyType: "",
    numOfCopyies: "",

    fullNameAsker: "",
    workGivenDate: "",

    fullNameReciver: "",
    workRecivedDate: "",

    personalnumber: "",
    role: "",

    file: "",

    pageType: "",

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
  ];

  // const [gdods, setGdods] = useState([]);
  // const [hativas, setHativas] = useState([]);
  // const [ogdas, setOgdas] = useState([]);
  // const [pikods, setPikods] = useState([]);

  // const loadGdods = () => {
  //   axios
  //     .get("http://localhost:8000/api/gdod")
  //     .then((response) => {
  //       setGdods(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const loadHativas = () => {
  //   axios
  //     .get("http://localhost:8000/api/hativa")
  //     .then((response) => {
  //       setHativas(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const loadOgdas = () => {
  //   axios
  //     .get("http://localhost:8000/api/ogda")
  //     .then((response) => {
  //       setOgdas(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const loadPikods = () => {
  //   axios
  //     .get("http://localhost:8000/api/pikod")
  //     .then((response) => {
  //       setPikods(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  function handleChange2(selectedOption, name) {
    setData({ ...data, [name]: selectedOption.value });
  }

  const clickSubmit = (event) => {
    CheckSignUpForm(event);
  };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    let ErrorReason = "";

    if (data.unit === "") {
      flag = false;
      ErrorReason = "יחידה לא צויין";
      toast.error(ErrorReason);
    }
    if (data.anaf === "") {
      flag = false;
      ErrorReason = "ענף לא צויין ";
      toast.error(ErrorReason);
    }
    if (data.mador === "") {
      flag = false;
      ErrorReason = "מדור לא צויין ";
      toast.error(ErrorReason);
    }
    if (data.phoneNumber === "") {
      flag = false;
      ErrorReason = "נייד לא צויין ";
      toast.error(ErrorReason);
    }
    if (data.workName === "") {
      flag = false;
      ErrorReason = "שם העבודה לא צויין ";
      toast.error(ErrorReason);
    }
    if (data.bindingType === "3") {
      if (data.bindingTypeOther === "") {
        flag = false;
        ErrorReason = "השיטת הכריכה לא צויינה ";
        toast.error(ErrorReason);
      }
    }

    if (data.numOfCopyies === "") {
      flag = false;
      ErrorReason = "כמות העותקים לא צויינה ";
      toast.error(ErrorReason);
    }
    if (data.fullNameAsker === "") {
      flag = false;
      ErrorReason = "לא צויין שם מוסר העבודה";
      toast.error(ErrorReason);
    }
    if (data.workGivenDate === "") {
      flag = false;
      ErrorReason = "לא צויין תאריך מסירת העבודה";
      toast.error(ErrorReason);
    }
    if (data.fullNameReciver === "") {
      flag = false;
      ErrorReason = "לא צויין שם מקבל העבודה";
      toast.error(ErrorReason);
    }
    if (data.workRecivedDate === "") {
      flag = false;
      ErrorReason = "לא צויין תאריך מסירת העבודה ";
      toast.error(ErrorReason);
    }
    if (data.file === "") {
      flag = false;
      ErrorReason = "קובץ לא הועלה";
      toast.error(ErrorReason);
    }

    // if (flag != true) {
    //   toast.error(ErrorReason);
    // }
  };

  // const FixUser = (event) => {
  //   event.preventDefault();
  //   if (data.role === "0") {
  //     delete data.gdodid;
  //     delete data.hativaid;
  //     delete data.ogdaid;
  //     delete data.pikodid;
  //   }
  //   if (data.role === "1") {
  //     delete data.hativaid;
  //     delete data.ogdaid;
  //     delete data.pikodid;
  //   }
  //   if (data.role === "2") {
  //     delete data.gdodid;
  //     delete data.ogdaid;
  //     delete data.pikodid;
  //   }
  //   if (data.role === "3") {
  //     delete data.gdodid;
  //     delete data.hativaid;
  //     delete data.pikodid;
  //   }
  //   if (data.role === "4") {
  //     delete data.gdodid;
  //     delete data.hativaid;
  //     delete data.ogdaid;
  //   }
  //   SignUp(event);
  // };

  // const SignUp = (event) => {
  //   event.preventDefault();
  //   setData({ ...data, loading: true, successmsg: false, error: false });
  //   const user = {
  //     name: data.name,
  //     lastname: data.lastname,
  //     role: data.role,
  //     personalnumber: data.personalnumber,
  //     gdodid: data.gdodid,
  //     hativaid: data.hativaid,
  //     ogdaid: data.ogdaid,
  //     pikodid: data.pikodid,
  //   };
  //   axios
  //     .post(`http://localhost:8000/api/signup`, user)
  //     .then((res) => {
  //       setData({ ...data, loading: false, error: false, successmsg: true });
  //       toast.success(`הרשמתך נקלטה בהצלחה, מתן ההרשאות יתבצע תוך עד 72 שעות`);
  //       history.push(`/signin`);
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       setData({
  //         ...data,
  //         errortype: error.response.data.error,
  //         loading: false,
  //         error: true,
  //       });
  //     });
  // };

  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      return <Navigate to="/signin" />;
    }
  };

  const showSuccess = () => (
    <div
      className="alert alert-info "
      style={{ textAlign: "right", display: data.successmsg ? "" : "none" }}
    >
      <h2>הבקשה נשלחה להוצלא</h2>
      <Link to="/signin">למעקב אחר סטטוס העבודה</Link>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ textAlign: "right", display: data.error ? "" : "none" }}
    >
      <h2>שגיאה בשליחת הבקשה</h2>
    </div>
  );
  const showLoading = () => (
    <div
      className="alert alert-success"
      style={{ textAlign: "right", display: data.loading ? "" : "none" }}
    >
      <h2>בטעינה</h2>
    </div>
  );

  // useEffect(() => {
  //   loadGdods();
  //   loadHativas();
  //   loadOgdas();
  //   loadPikods();
  // }, []);

  const hozlaPrintRequestForm = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="6" md="7">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <div className="text-center text-muted mb-4">
                <medium>טופס הזמנת צילום הוצל"א</medium>
              </div>
              <Form style={{ textAlign: "right" }} role="form">
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="unit">{textPlaceHolderInputs[0]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[0]}
                      id="unit"
                      name="unit"
                      type="string"
                      value={data.unit}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="anaf">{textPlaceHolderInputs[1]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[1]}
                      name="anaf"
                      type="string"
                      value={data.anaf}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="mador">{textPlaceHolderInputs[2]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[2]}
                      name="mador"
                      type="string"
                      value={data.mador}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phoneNumber">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[3]}
                      name="phoneNumber"
                      type="string"
                      value={data.phoneNumber}
                      onChange={handleChange}
                      required
                      maxLength={10}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workName">{textPlaceHolderInputs[4]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[4]}
                      name="workName"
                      type="string"
                      value={data.workName}
                      onChange={handleChange}
                      required
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
                      <option value="3">סודי ביותר</option>
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
                        type="string"
                        value={data.bindingTypeOther}
                        onChange={handleChange}
                        required
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
                      min="0"
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
                      type="string"
                      value={data.fullNameAsker}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workGivenDate">{textPlaceHolderInputs[10]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[10]}
                      name="workGivenDate"
                      type="date"
                      value={data.workGivenDate}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup row className="">
                  <FormGroup>
                    <Label for="fullNameReciver">{textPlaceHolderInputs[11]}</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[11]}
                      name="fullNameReciver"
                      type="string"
                      value={data.fullNameReciver}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="workRecivedDate">{textPlaceHolderInputs[10]}</Label>
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
                  <Label for="File">
                    <button className="btn-new-blue">העלאה קובץ</button>
                  </Label>
                  <Input
                    onChange={handleChange}
                    type="file"
                    accept=".pdf"
                    name="file"
                    id="File"
                    required
                  />
                  {data.file === "" ? (
                    <FormText color="muted">ניתן להעלאות רק קבצי PDF</FormText>
                  ) : (
                    <FormText dir="ltr" color="muted">
                      {data.file}
                    </FormText>
                  )}
                </FormGroup>
                {/* <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    הרשאה
                  </div>
                  <FormGroup dir="rtl">
                    <Input
                      type="select"
                      name="role"
                      value={data.role}
                      onChange={handleChange}
                    >
                      <option value="">הרשאה</option>
                      <option value="0">מנהל מערכת</option>
                      <option value="1">הרשאת גדוד</option>
                      <option value="2">הרשאת חטיבה</option>
                      <option value="3">הרשאת אוגדה</option>
                      <option value="4">הרשאת פיקוד</option>
                    </Input>
                  </FormGroup> */}

                {/* {data.role === "0" ? (
                    <div>מנהל מערכת</div>
                  ) : data.role === "1" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        גדוד
                      </div>
                      <FormGroup dir="rtl" style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <Select data={gdods} handleChange2={handleChange2} name={'gdodid'} val={data.gdodid ? data.gdodid : undefined} />
                      </FormGroup>
                    </>
                  ) : data.role === "2" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        חטיבה
                      </div>
                      <FormGroup dir="rtl" style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <Select data={hativas} handleChange2={handleChange2} name={'hativaid'} val={data.hativaid ? data.hativaid : undefined} />
                      </FormGroup>
                    </>
                  ) : data.role === "3" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        אוגדה
                      </div>
                      <FormGroup dir="rtl" style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <Select data={ogdas} handleChange2={handleChange2} name={'ogdaid'} val={data.ogdaid ? data.ogdaid : undefined} />
                      </FormGroup>
                    </>
                  ) : data.role === "4" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        פיקוד
                      </div>
                      <FormGroup dir="rtl" style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                        <Select data={pikods} handleChange2={handleChange2} name={'pikodid'} val={data.pikodid ? data.pikodid : undefined} />
                      </FormGroup>
                    </>
                  ) : data.role === "" ? (
                    <div>נא להכניס הרשאה</div>
                  ) : null} */}

                <div className="text-center">
                  <button onClick={clickSubmit} className="btn-new-blue">
                    שלח בקשה
                  </button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <Container className="mt--8 pb-5">
      <Row className="justify-content-center">
        <Col>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {hozlaPrintRequestForm()}
          {NavigateUser()}
        </Col>
      </Row>
    </Container>
  );
}
