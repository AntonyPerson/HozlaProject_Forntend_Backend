/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import regulsrUserRequestsTableData from "layouts/tables/data/regulsrUserRequestsTableData";
import adminTableTeamData from "layouts/tables/data/adminTableTeamData";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import MDButton from "components/MDButton";

import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

const adminTeamTable = () => {
  const tableTittle = 'הצוות שלי';

  const [dbError, setDbError] = useState(false);
  //   const { columns, rows } = authorsTableData();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}><Icon>addcircleoutline</Icon>הוסף משתמש</MenuItem>
      <MenuItem onClick={closeMenu}><Icon>deleteoutline</Icon>מחק הכל</MenuItem>
    </Menu>
  );

  const {
    columns: pColumns,
    rows: pRows,
    dbError: dbe,
    setDBerror: setDbe,
  } = adminTableTeamData();
  const handleErrorClose = () => {
    setDbError(true);
    setDbe(false);
  };

  const showError = () => (
    <Dialog
      open={dbe}
      onClose={handleErrorClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בקבלת הבקשות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );


  const table = () => (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
            >
              <MDTypography variant="h3" color="white">
                {tableTittle}
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <MDBox color="text" px={2} dir="ltr">
                <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                  more_vert
                </Icon>
              </MDBox>
              {renderMenu}
              {pRows.length !== 0 ? (
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder={false}
                />
              ) : dbError || dbe ? (
                <MDTypography mx={30} variant="h3" color="error" textGradient={true}>
                  תקלת שרת{" "}
                </MDTypography>
              ) : (
                <MDTypography mx={30} variant="h3" color="mekatnar" textGradient={true}>
                  לא קיימות בקשות הוצלא בחשבונך
                </MDTypography>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showError()}
      {table()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default adminTeamTable;
