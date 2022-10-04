/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

import { Link, withRouter, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
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
import hozlaLogo from "assets/images/hozlaLogo.png";

function HozlaAbout() {
  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="mekatnar"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDBox component="img" src={hozlaLogo} alt="hozlaLogo" width="12rem" alignSelf="center" />
        {/* <MDTypography variant="h4" fontWeight="medium"    mt={1}>מערכת הוצל"א</MDTypography> */}
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDTypography variant="h5" fontWeight="medium" mt={1}>
          מערכת הוצל"א היא מערכת שמסייעת בניהול של הזמנות הצילום בצה"ל. המערכת מאפשרת קבלת הזמנת
          צילומים, ניהול כלל ההזמנות שהתקבלו, אפשרויות מעקב אחר ההזמנות וקבלת דוחות שונים על סמך
          הזמננות אלו.
        </MDTypography>
      </MDBox>
    </Card>
  );
}

export default HozlaAbout;
