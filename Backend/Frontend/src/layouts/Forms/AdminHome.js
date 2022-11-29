/* eslint-disable no-unused-vars */
// @mui material components
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  // MDInput,
  FormText,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Navigate, useParams } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import AnnualInfoAdmin from "layouts/dashboard/components/AnnualInfoAdmin";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import nglogo from "assets/images/NG_VR.png";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [infoSB, setInfoSB] = useState(false);

  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [errorDB, setErrorDB] = useState(false);
  const [error404, setError404] = useState(false);

  const [dates, setdates] = useState({});
  const [status, setStatus] = useState({
    // hozlaRequestID: params.formID,
    received: 0,
    inprint: 0,
    ended: 0,
    readyForTakeIn: 0,
  });
  const getWorkStuts = (value) => {
    // let stutus = "נשלח";
    // let color = "error";
    if (value === 25) {
      setStatus({
        ...status,
        received: status.received + 1,
        inprint: status.inprint,
        ended: status.ended,
        readyForTakeIn: status.readyForTakeIn,
      });
      // stutus = "התקבלה";
      // color = "error";
    } else if (value === 50) {
      setStatus({
        ...status,
        received: status.received,
        inprint: status.inprint + 1,
        ended: status.ended,
        readyForTakeIn: status.readyForTakeIn,
      });
    } else if (value === 75) {
      setStatus({
        ...status,
        received: status.received,
        inprint: status.inprint,
        ended: status.ended + 1,
        readyForTakeIn: status.readyForTakeIn,
      });
    } else if (value === 100) {
      setStatus({
        ...status,
        received: status.received,
        inprint: status.inprint,
        ended: status.ended,
        readyForTakeIn: status.readyForTakeIn + 1,
      });
    }
    // return [stutus, color];
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/hozlaRequests/`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setRequestDB(response.data);
  //       requestDB.map((hozla, index) => ({
  //         status: (
  //           <>{getWorkStuts(hozla.status)[0]}</>
  //         ),
  //       }));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);
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

  // * data from database
  const dataFromDB = {
    received: 10,
    inprint: 40,
    ended: 20,
    readyForTakeIn: 30,

    countPrintInDay: 10,
    countPrintInWeek: 30,
  };
  // const [status, setStatus] = useState({
  //   // hozlaRequestID: params.formID,
  //   received: 0,
  //   inprint: 0,
  //   ended: 0,
  //   readyForTakeIn: 0,
  // });
  // const getWorkStuts = (value) => {
  //   // let stutus = "נשלח";
  //   // let color = "error";
  //   if (value === 25) {
  //     setStatus({
  //       ...status,
  //       received: status.received + 1,
  //       inprint: status.inprint,
  //       ended: status.ended,
  //       readyForTakeIn: status.readyForTakeIn,
  //     });
  //     // stutus = "התקבלה";
  //     // color = "error";
  //   } else if (value === 50) {
  //     setStatus({
  //       ...status,
  //       received: status.received,
  //       inprint: status.inprint + 1,
  //       ended: status.ended,
  //       readyForTakeIn: status.readyForTakeIn,
  //     });
  //   } else if (value === 75) {
  //     setStatus({
  //       ...status,
  //       received: status.received,
  //       inprint: status.inprint,
  //       ended: status.ended + 1,
  //       readyForTakeIn: status.readyForTakeIn,
  //     });
  //   } else if (value === 100) {
  //     setStatus({
  //       ...status,
  //       received: status.received,
  //       inprint: status.inprint,
  //       ended: status.ended,
  //       readyForTakeIn: status.readyForTakeIn + 1,
  //     });
  //   }
  //   // return [stutus, color];
  // };
  // const dbStatus = requestDB.map((hozla, index) => ({
  //   // project: <Project image={LogoAsana} name="Asana" />,

  //   status: (
  //     <>
  //       {getWorkStuts(hozla.status)[0]}
  //     </>
  //   ),
  // }));

  // const dataDB = requestDB.map((hozla, index) => ({
  //   labels: [
  //     "Jan.",
  //     "Feb.",
  //     "Mar.",
  //     "Apr.",
  //     "May.",
  //     "Jun.",
  //     "Jul.",
  //     "Aug.",
  //     "Sep.",
  //     "Oct.",
  //     "Nov.",
  //     "Dec.",
  //   ],
  //   datasets: [
  //     {
  //       label: "כמות דפים",
  //       color: "info",
  //       data: [70, 170, 110, 230, 320, 290, 150, 230, 120, 250],
  //     },
  //     {
  //       label: "דפים צבעוניים",
  //       color: "mekatnar",
  //       data: [30, 90, 40, 140, 290, 200, 100, 100, 60, 200],
  //     },
  //     {
  //       label: "דפים שחור לבן",
  //       color: "dark",
  //       data: [40, 80, 70, 90, 30, 90, 50, 130, 60, 50],
  //     },
  //   ],
  // }));

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/AdminHome`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setRequestDB(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="דוח נתונים"
      content={`הודפס ${dataFromDB.printed}\n
        בהדפסה ${dataFromDB.inprint}\n
        בטיפול ${dataFromDB.intreatment}\n
        ממתין ${dataFromDB.waiting}\n
        כמות הדפסות היום ${dataFromDB.countPrintInDay}\n
        כמות הדפסות השבוע ${dataFromDB.countPrintInWeek}\n`}
      dateTime="עכשיו"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <DefaultDoughnutChart
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title="ניהול הוצל''א יומי"
                description="מעקב בקשות להדפסה"
                chart={{
                  labels: ["התקבלה", "בהדפסה", "הסתיימה", "מוכן לאיסוף"],
                  datasets: {
                    label: "Projects",
                    backgroundColors: ["dark", "info", "mekatnar", "success"],
                    data: [
                      // dbStatus
                      // dataFromDB.waiting,
                      // dataFromDB.intreatment,
                      // dataFromDB.inprint,
                      // dataFromDB.printed,
                      dataFromDB.received,
                      dataFromDB.inprint,
                      dataFromDB.ended,
                      dataFromDB.readyForTakeIn,
                    ],
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AnnualInfoAdmin />
              {/* <MDBox mb={6} md={8} lg={4}>
                <ComplexStatisticsCard
                  icon="weekend"
                  title="היום"
                  count={dataFromDB.countPrintInDay}
                  percentage={{ color: "success", label: "כמות הדפים שהודפסו היום" }}
                />
              </MDBox>

              <MDBox mb={6} md={8} lg={4}>
                <ComplexStatisticsCard
                  icon="weekend"
                  title="השבוע"
                  count={dataFromDB.countPrintInWeek}
                  percentage={{ color: "success", label: "כמות הדפים שהודפסו השבוע" }}
                />
              </MDBox>
              <Grid item xs={12} sm={12} lg={12}>
                <MDButton variant="gradient" color="mekatnar" onClick={openInfoSB} fullWidth>
                  כמות הנתונים
                </MDButton>
                {renderInfoSB}
              </Grid> */}
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <VerticalBarChart
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title="דוח מנהלים"
                description="כמות הדפסת דפים לפי ענף"
                chart={{
                  labels: [
                    "ענף תו``ן",
                    "ענף א",
                    "ענף ב",
                    "ענף ג",
                    "ענף ד",
                    "ענף ה",
                    "ענף ו",
                    "ענף ז",
                    "ענף ח",
                    "ענף ט",
                  ],
                  datasets: [
                    {
                      label: "כמות דפים",
                      color: "mekatnar",
                      data: [70, 170, 110, 230, 320, 290, 150, 230, 120, 250],
                    },
                  ],
                }}
              />
            </Grid>
            {/* 
                            
                                <ReportsBarChart
                                    color="info"
                                    title="website views"
                                    description="Last Campaign Performance"
                                    date="campaign sent 2 days ago"
                                    chart={reportsBarChartData}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="daily sales"
                                    description={
                                        <>
                                            (<strong>+15%</strong>) increase in today sales.
                                        </>
                                    }
                                    date="updated 4 min ago"
                                    chart={sales}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="dark"
                                    title="completed tasks"
                                    description="Last Campaign Performance"
                                    date="just updated"
                                    chart={tasks}
                                />
                            </MDBox>
                        </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
