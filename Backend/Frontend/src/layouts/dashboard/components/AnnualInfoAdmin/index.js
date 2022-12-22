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
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const [dataFromDB, setDataFromDB] = useState({
    countPrintInYear: 0,
    numBeatsColourful: 0,
    sumBeatsBlackwhite: 0,
    sumRequestInYear: 0,
  });

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

  const params = useParams();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hozlaAdminRequests/getAnnualInfo`)
      .then((response) => {
        // console.log(`the object data`);
        // console.log(response.data);
        setFormData(response.data);
        // formData.forEach((num) => {
        setDataFromDB({
          ...dataFromDB,
          countPrintInYear: response.data.countPrintInYear,
          numBeatsColourful: response.data.numBeatsColourful,
          sumBeatsBlackwhite: response.data.sumBeatsBlackwhite,
          sumRequestInYear: response.data.sumRequestInYear,
        });
        axios.get(`http://localhost:5000/hozlaAdminRequests/first/Doc`).then((res) => {
          // console.log(`the object data`);
          console.log(getDaysDiff(res.data.createdAt.split("T")[0]));

          // change to 365
          if (getDaysDiff(res.data.createdAt.split("T")[0]) > 365) {
            axios
              .post(`http://localhost:5000/hozlaAdminRequests/deleteAllDoc`)
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
        console.log(error.code);
        // if (error.code === "ERR_BAD_REQUEST") {
        //   setError404(true);
        // } else {
        //   setErrorDB(true);
        // }
      });
  }, []);
  // useEffect(() => {
  //   axios.get(`http://localhost:5000/hozlaAdminRequests/`).then((response) => {
  //     // console.log(`the object data`);
  //     // console.log(response.data);
  //     setFormData(response.data);
  //     formData.forEach((nbpy) => {
  //       setDataFromDB({
  //         ...dataFromDB,
  //         numBeatsPerYear: nbpy.numBeatsPerYear,
  //         countPrintInDay: nbpy.countPrintInDay,
  //         numBeatsPerDay: nbpy.numBeatsPerDay,
  //         countPrintInYear: nbpy.countPrintInYear,
  //       });
  //     });
  //   });
  //   // .catch((error) => {
  //   //   console.log(error);
  //   //   console.log(error.code);
  //   //   if (error.code === "ERR_BAD_REQUEST") {
  //   //     setError404(true);
  //   //   } else {
  //   //     setErrorDB(true);
  //   //   }
  //   // });
  // }, []);
  console.log(formData);
  console.log(params);

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
          title="כמות הדפים שהודפסו"
          dateTime={dataFromDB.countPrintInYear}
        />
        {/* <TimelineItem
          color="success"
          icon={<Icon>access_time</Icon>}
          title="כמות הדפים שהודפסו היום"
          dateTime={dataFromDB.countPrintInDay}
        /> */}
        <TimelineItem
          color="warning"
          // icon="payment"
          icon={<Icon>opacity_sharp</Icon>}
          title="מספר פעימות צבעוני"
          dateTime={dataFromDB.numBeatsColourful}
        />
        <TimelineItem
          color="info"
          // icon="shopping_cart"
          icon={<Icon>opacity_sharp</Icon>}
          title="מספר פעימות שחור לבן"
          dateTime={dataFromDB.sumBeatsBlackwhite}
        />
        <TimelineItem
          color="success"
          // icon="shopping_cart"
          icon={<Icon>request_quote</Icon>}
          title="כמות בקשות"
          dateTime={dataFromDB.sumRequestInYear}
          lastItem
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
