/* eslint-disable no-unused-vars */
// @mui material components
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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import MDTypography from "components/MDTypography";

import nglogo from "assets/images/NG_VR.png";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

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
                  labels: ["טופל", "ממתין", "הודפס"],
                  datasets: {
                    label: "Projects",
                    backgroundColors: ["info", "dark", "success"],
                    data: [60, 30, 10],
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={6} md={8}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="היום"
                  count="30"
                  percentage={{ color: "success", label: "כמות הדפים שהודפסו היום" }}
                />
              </MDBox>

              <MDBox mb={6} md={8}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="השבוע"
                  count="30"
                  percentage={{ color: "success", label: "כמות הדפים שהודפסו השבוע" }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <DefaultLineChart
                dir="ltr"
                icon={{ color: "mekatnar", component: "leaderboard" }}
                title="דוח מנהלים"
                description="כמות הדפסת דפים"
                chart={{
                  labels: [
                    "Jan.",
                    "Feb.",
                    "Mar.",
                    "Apr.",
                    "May.",
                    "Jun.",
                    "Jul.",
                    "Aug.",
                    "Sep.",
                    "Oct.",
                    "Nov.",
                    "Dec.",
                  ],
                  datasets: [
                    {
                      label: "כמות דפים",
                      color: "info",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 250],
                    },
                    {
                      label: "דפים צבעוניים",
                      color: "primary",
                      data: [30, 90, 40, 140, 290, 290, 340, 230, 400, 200],
                    },
                    {
                      label: "דפים שחור לבן",
                      color: "dark",
                      data: [40, 80, 70, 90, 30, 90, 140, 130, 200, 50],
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
