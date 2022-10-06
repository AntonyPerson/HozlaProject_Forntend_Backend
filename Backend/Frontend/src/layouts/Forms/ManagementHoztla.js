import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
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

import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// @mui material components
import MDTypography from "components/MDTypography";
import MDInput from "../../components/MDInput/index";
import MDButton from "../../components/MDButton/index";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

import StarOutlineIcon from '@mui/icons-material/StarOutline';


const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      return <Navigate to="/signin" />;
    }
  };

const clickFavorite = () => {
    
};
export default function ManagementHoztla() {
    const textStatus = [
        "התקבל",
        "ממתין"
    ];
    const requestList = [
    {
        name: "aaaa",
        personalNumber: "123213232",
        // clearance: "!!!!",
        // startDate: "222222222",
        // workName: "fgfdfdgf",
    },
    {
        name: "bbbbb",
        personalNumber: "343432432",
        // clearance: "#########",
        // startDate: "4566879",
        // workName: "k.k.kjhf",
    },
    {
        name: "ccccccccc",
        personalNumber: "56767564",
        // clearance: "@@@@@@@@@@",
        // startDate: "9889890",
        // workName: "rewerette",
    },
];
// const list = requestList.map((alist) => alist);
//     const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) =>
//   <li>{number}</li>
// );
const dataTableList = requestList.map((alist) => (
    <h1>{alist}</h1>
));

    const dataTable = () => (
        <DashboardLayout>
            <DashboardNavbar />
            <MDButton className="btn-new-blue">
                ↻
            </MDButton>
            
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                ניהול הוצל"א
                            </MDTypography>
                        </MDBox>
                        
                        <DataTable
                            isSorted={true}
                            entriesPerPage={true}
                            showTotalEntries={true}
                            noEndBorder
                            table={{
                                columns: [
                                    { Header: "מעודפים", accessor: "favorite", width: "10%" },
                                    { Header: "שם", accessor: "name", width: "20%" },
                                    { Header: "מספר אישי", accessor: "personalNumber", width: "15%" },
                                    { Header: "שם העבודה", accessor: "workName", width: "20%" },
                                    { Header: "תאריך מסירה", accessor: "startDate", width: "15%" },
                                    { Header: "סטטוס", accessor: "status", width: "10%" },
                                    { Header: "סיווג", accessor: "clearance", width: "5%" },
                                    { Header: "עדכן", accessor: "action", width: "10%" },

                                ],
                                rows: [
                                    
                                    // {
                                    //     clearance: alist.clearance,
                                    //     status: (
                                    //         <MDBox ml={-1}>
                                    //             <MDBadge badgeContent={textStatus[1]} color="dark" variant="gradient" size="sm" />
                                    //         </MDBox>
                                    //     ),
                                    //     startDate: alist.startDate,
                                    //     workName: alist.workName,
                                    //     personalNumber: alist.personalNumber,
                                    //     name: alist.name,
                                    //     action: (
                                    //         <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                    //             עדכן
                                    //         </MDTypography>
                                    //     ),
                                    //     favorite: (
                                    //         <MDButton variant="outlined" color="warning" iconOnly>
                                    //             <StarOutlineIcon />
                                    //         </MDButton>
                                    //     ),
                                    // },
                                    {
                                        clearance: "בלמס",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent={textStatus[1]} color="dark" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "4/11/2021",
                                        workName: "bbbbbbb",
                                        personalNumber: "0000000",
                                        name: "aaaaaaaaaa",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly onClick={clickFavorite}>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                    {
                                        clearance: "סודי-ביותר",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "4/07/2022",
                                        workName: "הוצלא",
                                        personalNumber: "1111111",
                                        name: "דביר וסקר",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                    {
                                        clearance: "סודי",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent="ממתין" color="dark" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "4/07/2021",
                                        workName: "הוצלא",
                                        personalNumber: "2222222",
                                        name: "אנטוני פרסון",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                    {
                                        clearance: "שמור",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent="ממתין" color="dark" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "4/03/2022",
                                        workName: "מקטנאר",
                                        personalNumber: "3333333",
                                        name: "קורן בר יוסף",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                    {
                                        clearance: "שמור",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "4/03/2022",
                                        workName: "מקטנאר",
                                        personalNumber: "4444444",
                                        name: "רותם ורולקר",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                    {
                                        clearance: "שמור",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "4/03/2022",
                                        workName: "מקטנאר",
                                        personalNumber: "5555555",
                                        name: "ענת לקוס",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                    {
                                        clearance: "סודי-ביותר",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent="התקבל" color="success" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "14/06/2022",
                                        workName: "רפט",
                                        personalNumber: "6666666",
                                        name: "נואה גבאי",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                    {
                                        clearance: "בלמס",
                                        status: (
                                            <MDBox ml={-1}>
                                                <MDBadge badgeContent="ממתין" color="dark" variant="gradient" size="sm" />
                                            </MDBox>
                                        ),
                                        startDate: "14/06/2022",
                                        workName: "מקטנאר",
                                        personalNumber: "7777777",
                                        name: "דניאל פושקרב",
                                        action: (
                                            <MDTypography component="a" href="/adminForm" variant="inherit" color="info" fontWeight="medium">
                                                עדכן
                                            </MDTypography>
                                        ),
                                        favorite: (
                                            <MDButton variant="outlined" color="warning" iconOnly>
                                                <StarOutlineIcon />
                                            </MDButton>
                                        ),
                                    },
                                ]
                            }}
                        />
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
        
    );
    

    return (
        <Container className="mt--8 pb-5" dir="rtl">
            <Row className="justify-content-center">
                <Col>
                    {/* {dataTable} */}
                    {dataTable()}
                    {/* {NavigateUser()} */}
                </Col>
            </Row>
        </Container>
    );
}