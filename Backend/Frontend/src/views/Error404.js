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

import Error404image from "assets/images/error404.png";

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

function Error404() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        component="img"
        src={Error404image}
        alt="Error 404 image"
        width="60%"
        alignSelf="center"
        m="10%"
        ml="15%"
        mt="2%"
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Error404;
