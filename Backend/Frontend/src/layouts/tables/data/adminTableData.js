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
import { Link } from "react-router-dom";

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/managementHoztla/`)
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

  const getWorkStuts = (value) => {
    let stutus = "נשלח";
    let color = "error";
    if (value === 25) {
      stutus = "התקבלה";
      color = "error";
    } else if (value === 50) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "הסתיימה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "נאסף";
      color = "success";
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
    startDate: hozla.startDate,
    endDate: hozla.endDate,
    status: (
      <>
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
          {getWorkStuts(hozla.status)[0]}
        </MDTypography>
        <Progress variant="gradient" color={getWorkStuts(hozla.status)[1]} value={hozla.status} />
      </>
    ),
    NameRequester: hozla.fullNameAsker,
    // diliveryDate: hozla.workRecivedDate.split("T")[0],
    additionalInfo: (
      <Link to={`/adminFieldReuestFormDB/${hozla._id}`} key={hozla._id}>
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
        <MDTypography
          component="a"
          // href={`/RequestForm/${hozla._id}`}
          // href="/adminForm"
          variant="inherit"
          color="mekatnar"
          fontWeight="medium"
        >
          עדכן
        </MDTypography>
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

    rows: [
      {
        name: "דביר וסקר",
        clearance: "סודי",
        status: (
          <>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              {getWorkStuts(100)[0]}
            </MDTypography>
            <Progress variant="gradient" color={getWorkStuts(100)[1]} value={100} />
          </>
        ),
        startDate: "27/10/2022",
        endDate: "10/11/2022",
        project: "הוצלא",
        projectFor: "הוצלא",
        NameRequester: "0000000",
        fileID: "aaaaaaaaaa",
        additionalInfo: (
          <Link to="/adminFieldReuestFormDB">
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
          <MDTypography
            component="a"
            // href={`/RequestForm/${hozla._id}`}
            href="/adminForm"
            variant="inherit"
            color="mekatnar"
            fontWeight="medium"
          >
            עדכן
          </MDTypography>
        ),
      },
      {
        name: "אנטוני פרסון",
        clearance: "שמור",
        status: (
          <>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              {getWorkStuts(75)[0]}
            </MDTypography>
            <Progress variant="gradient" color={getWorkStuts(75)[1]} value={75} />
          </>
        ),
        startDate: "27/10/2022",
        endDate: "14/11/2022",
        project: "הוצלא",
        projectFor: "הוצלא",
        NameRequester: "1111111",
        fileID: "bbbbbbbbbb",
        additionalInfo: (
          <Link to="/adminFieldReuestFormDB">
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
          <MDTypography
            component="a"
            // href={`/RequestForm/${hozla._id}`}
            href="/adminForm"
            variant="inherit"
            color="mekatnar"
            fontWeight="medium"
          >
            עדכן
          </MDTypography>
        ),
      },
      {
        name: "קורן בר יוסף",
        clearance: "שמור",
        status: (
          <>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              {getWorkStuts(100)[0]}
            </MDTypography>
            <Progress variant="gradient" color={getWorkStuts(100)[1]} value={100} />
          </>
        ),
        startDate: "27/10/2022",
        endDate: "20/11/2022",
        project: "רפט",
        projectFor: "רפט",
        NameRequester: "3333333",
        fileID: "ccccccccc",
        additionalInfo: (
          <Link to="/adminFieldReuestFormDB">
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
          <MDTypography
            component="a"
            // href={`/RequestForm/${hozla._id}`}
            href="/adminForm"
            variant="inherit"
            color="mekatnar"
            fontWeight="medium"
          >
            עדכן
          </MDTypography>
        ),
      },
      {
        name: "רותם ורולקר",
        clearance: "סודי",
        status: (
          <>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              {getWorkStuts(75)[0]}
            </MDTypography>
            <Progress variant="gradient" color={getWorkStuts(75)[1]} value={75} />
          </>
        ),
        startDate: "27/10/2022",
        endDate: "10/11/2022",
        project: "רפט",
        projectFor: "רפט",
        NameRequester: "4444444",
        fileID: "dddddddddd",
        additionalInfo: (
          <Link to="/adminFieldReuestFormDB">
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
          <MDTypography
            component="a"
            // href={`/RequestForm/${hozla._id}`}
            href="/adminForm"
            variant="inherit"
            color="mekatnar"
            fontWeight="medium"
          >
            עדכן
          </MDTypography>
        ),
      },
      {
        name: "ענת לקוס",
        clearance: "שמור",
        status: (
          <>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              {getWorkStuts(50)[0]}
            </MDTypography>
            <Progress variant="gradient" color={getWorkStuts(50)[1]} value={50} />
          </>
        ),
        startDate: "27/10/2022",
        endDate: "14/11/2022",
        project: "מקטנאר",
        projectFor: "מקטנאר",
        NameRequester: "55555555",
        fileID: "eeeeeeeee",
        additionalInfo: (
          <Link to="/adminFieldReuestFormDB">
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
          <MDTypography
            component="a"
            // href={`/RequestForm/${hozla._id}`}
            href="/adminForm"
            variant="inherit"
            color="mekatnar"
            fontWeight="medium"
          >
            עדכן
          </MDTypography>
        ),
      },
      {
        name: "נואה גבאי",
        clearance: "סודי-ביותר",
        status: (
          <>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              {getWorkStuts(75)[0]}
            </MDTypography>
            <Progress variant="gradient" color={getWorkStuts(75)[1]} value={75} />
          </>
        ),
        startDate: "31/10/2022",
        endDate: "10/11/2022",
        project: "רפט",
        projectFor: "מקטנאר",
        NameRequester: "66666666",
        fileID: "ffffffffff",
        additionalInfo: (
          <Link to="/adminFieldReuestFormDB">
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
          <MDTypography
            component="a"
            // href={`/RequestForm/${hozla._id}`}
            href="/adminForm"
            variant="inherit"
            color="mekatnar"
            fontWeight="medium"
          >
            עדכן
          </MDTypography>
        ),
      },
      {
        name: "דניאל פושקרב",
        clearance: "בלמס",
        status: (
          <>
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              {getWorkStuts(25)[0]}
            </MDTypography>
            <Progress variant="gradient" color={getWorkStuts(25)[1]} value={25} />
          </>
        ),
        startDate: "30/10/2022",
        endDate: "1/12/2022",
        project: "מקטנאר",
        projectFor: "מקטנאר",
        NameRequester: "7777777",
        fileID: "gggggggg",
        additionalInfo: (
          <Link to="/adminFieldReuestFormDB">
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
          <MDTypography
            component="a"
            // href={`/RequestForm/${hozla._id}`}
            href="/adminForm"
            variant="inherit"
            color="mekatnar"
            fontWeight="medium"
          >
            עדכן
          </MDTypography>
        ),
      },
      // {
      //     clearance: "סודי-ביותר",
      //     status: (
      //         <MDBox ml={-1}>
      //             <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
      //         </MDBox>
      //     ),
      //     startDate: "4/07/2022",
      //     workName: "הוצלא",
      //     personalNumber: "1111111",
      //     name: "דביר וסקר",
      //     action: (
      //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
      //             עדכן
      //         </MDTypography>
      //     ),
      //     favorite: (
      //         <MDButton variant="outlined" color="warning" iconOnly>
      //             <StarOutlineIcon />
      //         </MDButton>
      //     ),
      // },
      // {
      //     clearance: "סודי",
      //     status: (
      //         <MDBox ml={-1}>
      //             <MDBadge badgeContent="ממתין" color="dark" variant="gradient" size="sm" />
      //         </MDBox>
      //     ),
      //     startDate: "4/07/2021",
      //     workName: "הוצלא",
      //     personalNumber: "2222222",
      //     name: "אנטוני פרסון",
      //     action: (
      //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
      //             עדכן
      //         </MDTypography>
      //     ),
      //     favorite: (
      //         <MDButton variant="outlined" color="warning" iconOnly>
      //             <StarOutlineIcon />
      //         </MDButton>
      //     ),
      // },
      // {
      //     clearance: "שמור",
      //     status: (
      //         <MDBox ml={-1}>
      //             <MDBadge badgeContent="ממתין" color="dark" variant="gradient" size="sm" />
      //         </MDBox>
      //     ),
      //     startDate: "4/03/2022",
      //     workName: "מקטנאר",
      //     personalNumber: "3333333",
      //     name: "קורן בר יוסף",
      //     action: (
      //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
      //             עדכן
      //         </MDTypography>
      //     ),
      //     favorite: (
      //         <MDButton variant="outlined" color="warning" iconOnly>
      //             <StarOutlineIcon />
      //         </MDButton>
      //     ),
      // },
      // {
      //     clearance: "שמור",
      //     status: (
      //         <MDBox ml={-1}>
      //             <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
      //         </MDBox>
      //     ),
      //     startDate: "4/03/2022",
      //     workName: "מקטנאר",
      //     personalNumber: "4444444",
      //     name: "רותם ורולקר",
      //     action: (
      //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
      //             עדכן
      //         </MDTypography>
      //     ),
      //     favorite: (
      //         <MDButton variant="outlined" color="warning" iconOnly>
      //             <StarOutlineIcon />
      //         </MDButton>
      //     ),
      // },
      // {
      //     clearance: "שמור",
      //     status: (
      //         <MDBox ml={-1}>
      //             <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
      //         </MDBox>
      //     ),
      //     startDate: "4/03/2022",
      //     workName: "מקטנאר",
      //     personalNumber: "5555555",
      //     name: "ענת לקוס",
      //     action: (
      //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
      //             עדכן
      //         </MDTypography>
      //     ),
      //     favorite: (
      //         <MDButton variant="outlined" color="warning" iconOnly>
      //             <StarOutlineIcon />
      //         </MDButton>
      //     ),
      // },
      // {
      //     clearance: "סודי-ביותר",
      //     status: (
      //         <MDBox ml={-1}>
      //             <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
      //         </MDBox>
      //     ),
      //     startDate: "14/06/2022",
      //     workName: "רפט",
      //     personalNumber: "6666666",
      //     name: "נואה גבאי",
      //     action: (
      //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
      //             עדכן
      //         </MDTypography>
      //     ),
      //     favorite: (
      //         <MDButton variant="outlined" color="warning" iconOnly>
      //             <StarOutlineIcon />
      //         </MDButton>
      //     ),
      // },
      // {
      //     clearance: "בלמס",
      //     status: (
      //         <MDBox ml={-1}>
      //             <MDBadge badgeContent="ממתין" color="dark" variant="gradient" size="sm" />
      //         </MDBox>
      //     ),
      //     startDate: "14/06/2022",
      //     workName: "מקטנאר",
      //     personalNumber: "7777777",
      //     name: "דניאל פושקרב",
      //     action: (
      //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
      //             עדכן
      //         </MDTypography>
      //     ),
      //     favorite: (
      //         <MDButton variant="outlined" color="warning" iconOnly>
      //             <StarOutlineIcon />
      //         </MDButton>
      //     ),
      // },
    ],
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
