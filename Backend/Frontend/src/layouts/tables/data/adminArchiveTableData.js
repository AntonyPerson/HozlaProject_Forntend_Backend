/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link, useParams } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";

// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );
  const params = useParams();
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [errorDB, setErrorDB] = useState(false);
  const [formData, setFormData] = useState({});
  const [error404, setError404] = useState(false);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [pressedID, setpressedID] = useState("");
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
  const clearanceOptions = ['בלמ"ס', "שמור", "סודי", "סודי ביותר"];
  // const bindingTypes = ["הידוק", "ספירלה", "חירור", "אחר"];
  // const copyTypes = ["שחור לבן דו צדדי", "צבעוני יחיד", "צבעוני דו צדדי", "שחור לבן יחיד"];
  // const pageTypes = { A4: "A4", A3: "A3", A4b: "A4 בריסטול", A3b: "A3 בריסטול" };
  const MINUTE_MS = 100000;

  const getDaysDiff = (dateToCheck) => {
    const day = new Date().getDate();
    const mounth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = Date.parse(`${year}-${mounth}-${day}`);

    // console.log(dateToCheck);
    // console.log(`${year}-${mounth}-${day}`);
    // console.log(currentDate);
    // console.log(Date.parse(dateToCheck));
    const diff = Math.abs(currentDate - Date.parse(dateToCheck)) / (1000 * 3600 * 24);
    // console.log(diff);
    return diff;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hozlaRequests/archivedRequests`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);

        response.data.forEach((element) => {
          if (getDaysDiff(element.updatedAt.split("T")[0]) >= 7) {
            axios
              .delete(`http://localhost:5000/hozlaRequests/${element._id}`)
              .then((delRespone) => {
                console.log(delRespone.data);
              })
              .catch((error) => {
                console.log(error);
                // setIsError(true);
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/hozlaAdminRequests/`)
  //       .then((response) => {
  //         // console.log(`the object data`);
  //         console.log(response.data);
  //         console.log(params.formID);
  //         // console.log(params.hozlaRequestID);

  //         setFormData(response.data);
  //         console.log(formData);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         console.log(error.code);
  //         if (error.code === "ERR_BAD_REQUEST") {
  //           setError404(true);
  //         } else {
  //           setErrorDB(true);
  //         }
  //       });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/hozlaRequests/`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setRequestDB(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
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
    } else if (value === 125) {
      stutus = "נאסף";
      color = "success";
    } else if (value === 150) {
      stutus = "העבודה נדחתה";
      color = "error";
    }
    return [stutus, color];
  };

  const dbRows = requestDB.map((hozla, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    name: hozla.name,
    fileID: hozla._id,
    project: hozla.workName,
    projectFor: hozla.projectFor,
    clearance:
      // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      clearanceOptions[parseInt(hozla.workClearance, 10)],
    // </MDTypography>
    startDate: hozla.workGivenDate.split("T")[0],
    endDate: hozla.workRecivedDate.split("T")[0],
    status: (
      <>
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
          {getWorkStuts(hozla.status)[0]}
        </MDTypography>
        <Progress
          variant="gradient"
          color={getWorkStuts(hozla.status)[1]}
          value={hozla.status >= 125 ? 100 : hozla.status}
        />
      </>
    ),
    NameRequester: hozla.fullNameAsker,
    // diliveryDate: hozla.workRecivedDate.split("T")[0],
    additionalInfo: (
      <Link to={`/RequestForm/${hozla._id}`} key={hozla._id}>
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
      </Link>
    ),
    update: (
      <Link to={`/adminForm/${hozla._id}`} key={hozla._id}>
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
          <Icon>edit</Icon>
        </MDButton>
      </Link>
    ),
  }));

  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "אסמכתא", accessor: "fileID", align: "center" },
      // { Header: "שם", accessor: "name", align: "center" },
      { Header: "שם המבקש", accessor: "NameRequester", align: "center" },
      { Header: "שם האוסף", accessor: "name", align: "center" },
      { Header: "תאריך קבלה", accessor: "startDate", align: "center" },
      { Header: "תאריך סיום", accessor: "endDate", align: "center" },
      // { Header: "שם העבודה", accessor: "project", align: "center" },
      { Header: "עבור העבודה", accessor: "projectFor", align: "center" },
      { Header: "סטטוס", accessor: "status", align: "center" },
      { Header: "סיווג", accessor: "clearance", align: "center" },
      { Header: "פרטים נוספים", accessor: "additionalInfo", align: "center" },
      { Header: "עדכן", accessor: "update", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}
