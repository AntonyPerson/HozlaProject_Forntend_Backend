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
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function MoreInfoAdmin() {
  // * data from database
  const dataFromDB = {
    printed: 40,
    inprint: 10,
    intreatment: 30,
    waiting: 20,

    countPrintInDay: 10,
    countPrintInWeek: 30,
    requests: 20,
    numBeatsPerDay: 100,
    numBeatsPerWeek: 350,
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          מידע נוסף
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
          color="success"
          icon="weekend"
          title="כמות הדפים שהודפסו היום"
          dateTime={dataFromDB.countPrintInDay}
        />
        <TimelineItem
          color="error"
          // icon="inventory_2"
          icon="weekend"
          title="כמות הדפים שהודפסו השבוע"
          dateTime={dataFromDB.countPrintInWeek}
        />
        <TimelineItem
          color="mekatnar"
          // icon="shopping_cart"
          icon="weekend"
          title="מספר פעימות ביום"
          dateTime={dataFromDB.numBeatsPerDay}
        />
        <TimelineItem
          color="warning"
          // icon="payment"
          icon="weekend"
          title="מספר פעימות בשבוע"
          dateTime={dataFromDB.numBeatsPerWeek}
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

export default MoreInfoAdmin;
