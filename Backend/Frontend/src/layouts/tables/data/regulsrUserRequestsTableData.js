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
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";

const { user } = isAuthenticated();
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
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
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

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/hozlaRequests/personalnumber`, {
  //       params: {
  //         personalnumber: user.personalnumber,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setRequestDB(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hozlaRequests/`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);
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

  // const projectOptions = ["א", "ב", "ג", "ד", "ה", "ו"];
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
    }
    return [stutus, color];
  };
  const dbRows = requestDB.map((hozla, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    fileID: hozla._id,
    project: hozla.workName,
    clearance:
      // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      clearanceOptions[parseInt(hozla.workClearance, 10)],
    // </MDTypography>
    status: (
      <>
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
          {getWorkStuts(hozla.status)[0]}
        </MDTypography>
        <Progress
          variant="gradient"
          color={getWorkStuts(hozla.status)[1]}
          value={hozla.status === 125 ? 100 : hozla.status}
        />
      </>
    ),
    NameRequester: hozla.fullNameAsker,
    diliveryDate: hozla.workRecivedDate.split("T")[0],
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
  }));
  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "אסמכתא", accessor: "fileID", align: "center" },
      { Header: "שם העבודה", accessor: "project", align: "center" },
      { Header: "סיווג העבודה", accessor: "clearance", align: "center" },
      { Header: "סטטוס", accessor: "status", align: "center" },
      { Header: "שם המזמין", accessor: "NameRequester", align: "center" },
      { Header: "תאריך קבלה מבוקש", accessor: "diliveryDate", align: "center" },
      { Header: "פרטים נוספים", accessor: "additionalInfo", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}

// rows: [
//   {
//     // project: <Project image={LogoAsana} name="Asana" />,
//     project: projectOptions[0],
//     clearance:
//       // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//       clearanceOptions[0],
//     // </MDTypography>
//     status: (
//       <>
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           בהדפסה
//         </MDTypography>
//         <Progress color="info" value={60} />
//       </>
//     ),
//     completion: <Progress color="info" value={60} />,
//     additionalInfo: (
//       <MDTypography component="a" href="#" color="text">
//         <Icon>info</Icon>
//       </MDTypography>
//     ),
//   },
//   {
//     project: projectOptions[1],
//     clearance: (
//       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//         {clearanceOptions[2]}
//       </MDTypography>
//     ),
//     status: (
//       <>
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           בהדפסה
//         </MDTypography>
//         <Progress color="info" value={60} />
//       </>
//     ),
//     additionalInfo: (
//       <MDTypography component="a" href="#" color="text">
//         <Icon>info</Icon>
//       </MDTypography>
//     ),
//   },
//   {
//     project: projectOptions[2],
//     clearance: (
//       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//         {clearanceOptions[3]}
//       </MDTypography>
//     ),
//     status: (
//       <>
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           בהדפסה
//         </MDTypography>
//         <Progress color="info" value={60} />
//       </>
//     ),
//     additionalInfo: (
//       <MDTypography component="a" href="#" color="text">
//         <Icon>info</Icon>
//       </MDTypography>
//     ),
//   },
//   {
//     project: projectOptions[3],
//     clearance: (
//       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//         {clearanceOptions[1]}
//       </MDTypography>
//     ),
//     status: (
//       <>
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           בהדפסה
//         </MDTypography>
//         <Progress color="info" value={60} />
//       </>
//     ),
//     additionalInfo: (
//       <MDTypography component="a" href="#" color="text">
//         <Icon>info</Icon>
//       </MDTypography>
//     ),
//   },
//   {
//     project: projectOptions[4],
//     clearance: (
//       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//         {clearanceOptions[0]}
//       </MDTypography>
//     ),
//     status: (
//       <>
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           בהדפסה
//         </MDTypography>
//         <Progress color="info" value={60} />
//       </>
//     ),
//     additionalInfo: (
//       <MDTypography component="a" href="#" color="text">
//         <Icon>info</Icon>
//       </MDTypography>
//     ),
//   },
//   {
//     project: projectOptions[5],
//     clearance: (
//       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//         {clearanceOptions[2]}
//       </MDTypography>
//     ),
//     status: (
//       <>
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           בהדפסה
//         </MDTypography>
//         <Progress color="info" value={60} />
//       </>
//     ),
//     additionalInfo: (
//       <MDTypography component="a" href="#" color="text">
//         <Icon>info</Icon>
//       </MDTypography>
//     ),
//   },
// ],
