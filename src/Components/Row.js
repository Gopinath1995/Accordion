import React, { useState, useRef } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { toast } from 'react-toastify';
import {
    Grid,
    Button,
    Paper,
    Box,
    Collapse,
    TableRow,
    TableCell,
    TextField,
    MenuItem,
    Select,
    Typography,
} from "@material-ui/core";
import { Validate } from "./Validation";
const Row = ({
    dataItems,
    keyvalue,
    expandedId,
    setExpandedId,
    handleExpandClick,
    setData,
    data
}) => {

    const {
        id,
        name,
        email,
        position,
        recruiter,
        status
    } = dataItems;

    //Row data States
    const [StatusValue, SetstatusValue] = React.useState("");
    const [details, setDetails] = useState({
        name: "",
        recruiter: "",
        email: "",
        position: "",
        status: "",
    });

    const [error, setError] = useState({
        isError: false,
        FieldName: "",
        Message: "",
    });

    //========Onchange functionalities========//
    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    //------onClick Form Update--------//
    const updateData = async (e, patientId) => {
        e.preventDefault();
        const value = Validate(details);
        if (value) {
            setError({
                isError: value.isError,
                FieldName: value.FieldName,
                Message: value.Message,
            });
        } else {
            const response = await axios.put(
                `http://localhost:3006/data/${id}`,
                details
            );
            setData(
                data.map((items) => {
                    return items.id === id ? { ...response.data } : items;
                })
            );
            toast.success("Modified Successfully");
            setExpandedId(-1);
            window.scrollTo(0, 0);
            setError({
                isError: false,
                FieldName: "",
                Message: "",
            });

        }
    };

    //------onSelect--------//
    const onSelect = (id, keyvalue) => {
        handleExpandClick(keyvalue);
        if (id) {
            setDetails({
                ...details,
                ...dataItems,
            });
        };
    }

    // Spearding Error objects
    const { isError, FieldName, Message } = error;
    return (
        <React.Fragment>
            <TableRow className="table_row">
                <TableCell
                    onClick={() => onSelect(id, keyvalue)}
                    style={{ cursor: "pointer" }}
                >
                    {(expandedId === keyvalue) == false ? (
                        <NavigateNextIcon />
                    ) : (
                        <ExpandMoreIcon />
                    )}
                </TableCell>
                <TableCell
                    style={{ cursor: "pointer" }}
                    align="center"
                    component="th"
                    scope="row"
                    onClick={() => onSelect(id, keyvalue)}
                >
                    {name}
                </TableCell>
                <TableCell
                    style={{ cursor: "pointer" }}
                    align="center"
                    onClick={() => onSelect(id, keyvalue)}
                >
                    {email}
                </TableCell>
                <TableCell
                    style={{ cursor: "pointer" }}
                    align="center"
                    onClick={() => onSelect(id, keyvalue)}
                >
                    {position}
                </TableCell>
                <TableCell
                    style={{ cursor: "pointer" }}
                    align="center"
                    onClick={() => onSelect(id, keyvalue)}
                >
                    {recruiter}
                </TableCell>
                <TableCell className="table_row_size" align="center">
                    <Button
                        style={{
                            backgroundColor:
                                (status === "Selected" && "#1b5e20") ||
                                (status === "Rejected" && "#e53935") ||
                                (status === "Hold" && "#ffb300"),
                        }}
                        className="statusBtn">
                        {status}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedId === keyvalue} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Modify Details
                            </Typography>
                            <Paper elevation={4} style={{ padding: "15px" }} >
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4} sm={12} style={{ marginTop: "20px" }}>
                                            <TextField
                                                fullWidth
                                                className="form_textfield"
                                                type="text"
                                                value={details.name}
                                                onChange={onChange}
                                                name="name"
                                                error={Boolean(isError && FieldName === "name")}
                                                helperText={FieldName === "name" && Message}
                                                inputProps={{
                                                    maxLength: 20,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12} style={{ marginTop: "20px" }}>
                                            <TextField
                                                fullWidth
                                                className="form_textfield"
                                                type="email"
                                                value={details.email}
                                                name="email"
                                                onChange={onChange}
                                                error={Boolean(isError && FieldName === "email")}
                                                helperText={FieldName === "email" && Message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12} style={{ marginTop: "20px" }}>
                                            <TextField
                                                fullWidth
                                                className="form_textfield"
                                                type="text"
                                                value={details.position}
                                                name="position"
                                                onChange={onChange}
                                                error={Boolean(isError && FieldName === "position")}
                                                helperText={FieldName === "position" && Message}
                                                inputProps={{
                                                    maxLength: 30,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} sm={12} style={{ marginTop: "20px" }}>
                                            <TextField
                                                fullWidth
                                                className="form_textfield"
                                                type="text"
                                                value={details.recruiter}
                                                name="recruiter"
                                                onChange={onChange}
                                                error={Boolean(isError && FieldName === "recruiter")}
                                                helperText={FieldName === "recruiter" && Message}
                                                inputProps={{
                                                    maxLength: 20,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12} style={{ marginTop: "20px" }}>
                                            <Select
                                                className="form-dropdown"
                                                fullWidth
                                                name="status"
                                                value={details.status}
                                                onChange={onChange}
                                                error={Boolean(isError && FieldName === "status")}
                                            >
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value={"Selected"}>Selected</MenuItem>
                                                <MenuItem value={"Rejected"}>Rejected</MenuItem>
                                                <MenuItem value={"Hold"}>Hold</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12}>
                                        <div className="d-flex my">
                                            <div>
                                                <button
                                                    className="srchbtn"
                                                    onClick={(e) => updateData(e, id)}
                                                >Save
                                                </button>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>

    )
}

export default Row