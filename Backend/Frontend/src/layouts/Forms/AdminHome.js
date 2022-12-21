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
  // const { sales, tasks } = reportsLineChartData;
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
    received: 0,
    inWorking: 0,
    inprint: 0,
    readyForTakeIn: 0,
  });

  const [anaf, setAnaf] = useState({
    tun: 0,
    takom: 0,
    tom: 0,
    sadot: 0,
    aczaka: 0,
    segel: 0,
    peer: 0,
    ergon: 0,
    shalishot: 0,
    other: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hozlaRequests/getCountStatus`)
      .then((responseStatus) => {
        console.log(responseStatus.data);
        setRequestDB(responseStatus.data);
        setStatus({
          ...status,
          received: responseStatus.data.received,
          inWorking: responseStatus.data.inWorking,
          inprint: responseStatus.data.inprint,
          readyForTakeIn: responseStatus.data.readyForTakeIn,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
    axios
      .get(`http://localhost:5000/hozlaAdminRequests/getAnafPrintCount`)
      .then((responseAnaf) => {
        console.log(responseAnaf.data);
        setAnaf({
          ...anaf,
          tun: responseAnaf.data.tun,
          takom: responseAnaf.data.takom,
          tom: responseAnaf.data.tom,
          sadot: responseAnaf.data.sadot,
          aczaka: responseAnaf.data.aczaka,
          segel: responseAnaf.data.segel,
          peer: responseAnaf.data.peer,
          ergon: responseAnaf.data.ergon,
          shalishot: responseAnaf.data.shalishot,
          other: responseAnaf.data.other,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="דוח נתונים"
      content={`הודפס `}
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
                title="ניהול הוצל''א"
                description="מעקב בקשות להדפסה"
                chart={{
                  labels: ["התקבלה", "בעבודה", "בהדפסה", "מוכן לאיסוף"],
                  datasets: {
                    label: "Projects",
                    backgroundColors: ["mekatnar", "info", "dark", "success"],
                    // data: ,
                    data: [
                      // dbStatus
                      // dataFromDB.waiting,
                      // dataFromDB.intreatment,
                      // dataFromDB.inprint,
                      // dataFromDB.printed,
                      `${status.received}`,
                      `${status.inWorking}`,
                      `${status.inprint}`,
                      `${status.readyForTakeIn}`,
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
                    "אחר",
                    "שלישות",
                    "אחזקה",
                    "ענף פא``ר",
                    "ענף ארגון",
                    "ענף סגל",
                    "ענף תו``ם",
                    "ענף שדו``ת",
                    "ענף תקו``ם",
                    "ענף תו``ן",
                  ],
                  datasets: [
                    {
                      label: "כמות דפים",
                      color: "mekatnar",
                      data: [
                        `${anaf.other}`,
                        `${anaf.shalishot}`,
                        `${anaf.aczaka}`,
                        `${anaf.peer}`,
                        `${anaf.ergon}`,
                        `${anaf.segel}`,
                        `${anaf.tom}`,
                        `${anaf.sadot}`,
                        `${anaf.takom}`,
                        `${anaf.tun}`,
                      ],
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
