/* eslint-disable import/newline-after-import */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

import { Link, withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  ButtonGroup,
  // Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Container,
  Col,
  Collapse,
} from "reactstrap";
import axios from "axios";

import HozlaAbout from "./HozlaAbout";
import TeamNGComp from "./TeamNGComp";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function AboutPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="top" height="100%">
          <Grid item xs={11} sm={9} md={7} lg={5} xl={5}>
            <MDBox pt={4} pb={5} px={3}>
              <HozlaAbout />
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <TeamNGComp />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AboutPage;
