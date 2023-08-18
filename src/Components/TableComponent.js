import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Row from "./Row"
import axios from "axios";
import {
    Select,
    MenuItem
} from "@material-ui/core";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import {
    Grid,
    Typography,
    TextField,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableContainer,
    Divider

} from "@mui/material";
import TablePagination from "@material-ui/core/TablePagination";


const TableComponent = () => {

    const [loader, setloader] = React.useState(false);
    const [APIdata, setAPIdata] = useState([]);
    const [data, setData] = useState([]);
    const [candidateName, setcandidateName] = useState("");
    const [candidatePosition, setcandidatePosition] = useState("");
    const [recruiterName, setrecruiterName] = useState("");
    const [status, setStatus] = useState("");
    const [searchDob, setsearchDob] = React.useState(null);
    const [values, setValues] = React.useState("");
    const [totalcount, setTotalCount] = React.useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    //Expand collapse states
    const [expandedId, setExpandedId] = React.useState(-1);
    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };

    const dataFetch = async () => {
        
        const res = await axios.get(`http://localhost:3006/data`);
        setloader(true)
        if (res.status == 200) {
            setData(res.data);
            setAPIdata(res.data);
            setloader(false);
            setTotalCount(res.data.length);
        } else {
            toast.error("Please check the API data server");
            setTotalCount("")
        }

    };
    useEffect(() => {
        dataFetch();
    }, [page]);

    const SignInC = (evt) => {
        if (evt.keyCode == 13) {
            SearchByValue();
        }
    };

    const handleChange = (e) => {
        setStatus(e.target.value);
    }
console.log("test");
    const SearchByValue = (e) => {
        if (
            candidateName.trim() === "" &&
            candidatePosition.trim() === "" &&
            recruiterName.trim() === "" && status.trim() === ""
        ) {
            toast.error("Please enter any search param");
        } else {
            const filterList = APIdata.filter((item1) => {
                if ((item1.name.toLowerCase() == candidateName.toLowerCase()) ||
                    (item1.position.toLowerCase() == candidatePosition.toLowerCase()) ||
                    (item1.recruiter.toLowerCase() == recruiterName.toLowerCase()) ||
                    (item1.status.toLowerCase() == status.toLowerCase())) {
                    return item1
                }
            })
            console.log(filterList)
            setTotalCount(filterList.length);
            setData(filterList)
        }
    }

    const Resetbyvalue = (e) => {
        setExpandedId(-1);
        dataFetch();
        setcandidateName("");
        setcandidatePosition("");
        setrecruiterName("");
        setStatus("");
        setPage(0);

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (<React.Fragment>
        <ToastContainer autoClose={2000} />
        <div className="header_title">Recruitment Management</div>
        <Divider />
        <div className="module_title my">Interviewer Details</div>
        <Grid container spacing={3}>
            <Grid item xs={12} md={3} sm={12}>
                <TextField
                    className="form_textfield form_search_field"
                    label="Name"
                    type="text"
                    variant="standard"
                    name="Name"
                    value={candidateName}
                    onChange={(e) => setcandidateName(e.target.value)}
                    onKeyUp={SignInC}
                    inputProps={{
                        maxLength: 30,
                        autoComplete: "none",
                    }}
                />
            </Grid>
            <Grid item xs={12} md={3} sm={12}>
                <TextField
                    className="form_textfield form_search_field"
                    label="Position"
                    type="text"
                    variant="standard"
                    name="Position"
                    value={candidatePosition}
                    onChange={(e) => setcandidatePosition(e.target.value)}
                    onKeyUp={SignInC}
                    inputProps={{
                        maxLength: 30,
                        autoComplete: "none",
                    }}
                />
            </Grid>
            <Grid item xs={12} md={3} sm={12}>
                <TextField
                    className="form_textfield form_search_field"
                    label="Recruiter Name"
                    type="text"
                    variant="standard"
                    name="Recruiter Name"
                    value={recruiterName}
                    onChange={(e) => setrecruiterName(e.target.value)}
                    onKeyUp={SignInC}
                    inputProps={{
                        maxLength: 30,
                        autoComplete: "none",
                    }}
                />
            </Grid>
            <Grid item xs={12} md={3} sm={12} >
                <Select style={{ marginTop: "12px" }}
                    className="form-dropdown form_search_field"

                    fullWidth
                    name="status"
                    value={status}
                    onChange={handleChange}
                >
                    <MenuItem style={{ height: "25px" }} value={""}>
                    </MenuItem>
                    <MenuItem value={"Selected"}>Selected</MenuItem>
                    <MenuItem value={"Rejected"}>Rejected</MenuItem>
                    <MenuItem value={"Hold"}>Hold</MenuItem>
                </Select>

            </Grid>
        </Grid>

        <div className="d-flex my">
            <div>
                <button className="srchbtn"
                    onClick={SearchByValue}
                >
                    Search
                </button>
            </div>
            <div className="mx"></div>
            <div>
                <button className="srchbtn"
                    onClick={Resetbyvalue}
                >
                    Reset
                </button>
            </div>
        </div>
        {loader == true ? (
            <div className="loaderAdj">
                <CircularProgress />
            </div>
        ) : data.length !== 0 ? (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead className="table_head">
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                                <TableSortLabel>
                                    Candidate Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel    >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel  >
                                    Position
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel  >
                                    Recruiter Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((dataItems) => {
                                return (
                                    <Row
                                        keyvalue={dataItems.id}
                                        expandedId={expandedId}
                                        setExpandedId={setExpandedId}
                                        handleExpandClick={handleExpandClick}
                                        key={dataItems.id}
                                        dataItems={dataItems}
                                        setData={setData}
                                        data={data}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
                {totalcount > 6 ? (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        colSpan={3}
                        component="div"
                        count={totalcount}
                        rowsPerPage={rowsPerPage}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                ) : (
                    ""
                )}
            </TableContainer>
        ) : (
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} sm={12} align="center">
                    <Typography>No Records Found</Typography>
                    <div>Clone the https://github.com/Gopinath1995/DataServer.git</div>
                    <div>Run the server to show the data</div>
                </Grid>
            </Grid>
        )}
    </React.Fragment>

    )
}

export default TableComponent
