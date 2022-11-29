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
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function AnnualInfoAdmin() {
  // const params = useParams();
  // const [formData, setFormData] = useState({});
  // const [error404, setError404] = useState(false);
  // const [errorDB, setErrorDB] = useState(false);
  // // * data from database
  // const [dataFromDB, setDataFromDB] = useState({
  //   countPrintInDay: 10,
  //   countPrintInYear: 3000,
  //   requests: 20,
  //   numBeatsPerDay: 100,
  //   numBeatsPerYear: 350000,
  // });
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/hozlaAdminRequests/`)
  //     .then((response) => {
  //       // console.log(`the object data`);
  //       console.log(response.data);
  //       console.log(params.formID);
  //       // console.log(params.numAccepted);
  //       // console.log(params.numInPrint);
  //       // console.log(params.numEnded);
  //       // console.log(params.numReadyForTakeIn);
  //       // console.log(params.sumBeatsToday);
  //       // console.log(params.sumBeatsYear);
  //       // console.log(params.sumPagesToday);
  //       // console.log(params.sumPagesYear);
  //       // console.log(params.anaf);
  //       // console.log(params.sumPages);

  //       setFormData(response.data);
  //       // setdates({
  //       //   workGivenDate: response.data.workGivenDate.split("T")[0],
  //       //   workRecivedDate: response.data.workRecivedDate.split("T")[0],
  //       // });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log(error.code);
  //       if (error.code === "ERR_BAD_REQUEST") {
  //         setError404(true);
  //       } else {
  //         setErrorDB(true);
  //       }
  //     });
  // }, []);
  const dataFromDB = {
    countPrintInDay: 10,
    countPrintInYear: 3000,
    requests: 20,
    numBeatsPerDay: 100,
    numBeatsPerYear: 350000,
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          מידע שנתי
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              {/* <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon> */}
            </MDTypography>
            &nbsp;
            {/* <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "} */}
            {/* this month */}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={1}>
        <TimelineItem
          color="mekatnar"
          // icon="inventory_2"
          icon={<Icon>print</Icon>}
          title="כמות הדפים שהודפסו השנה"
          dateTime={dataFromDB.countPrintInYear}
        />
        <TimelineItem
          color="success"
          icon={<Icon>access_time</Icon>}
          title="כמות הדפים שהודפסו היום"
          dateTime={dataFromDB.countPrintInDay}
        />
        <TimelineItem
          color="warning"
          // icon="payment"
          icon={<Icon>opacity_sharp</Icon>}
          title="מספר פעימות השנה"
          dateTime={dataFromDB.numBeatsPerYear}
        />
        <TimelineItem
          color="info"
          // icon="shopping_cart"
          icon={<Icon>access_time</Icon>}
          title="מספר פעימות ביום"
          dateTime={dataFromDB.numBeatsPerDay}
        />

        {/* <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        /> */}
      </MDBox>
    </Card>
  );
}

export default AnnualInfoAdmin;
