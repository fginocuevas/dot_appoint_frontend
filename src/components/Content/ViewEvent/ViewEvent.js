import React, { Component } from 'react'
import { Container, Grid, TextField, withStyles, Button, Icon } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const useStyles = (theme) => ({
    button: {
        margin: theme.spacing(2),
    },
});

const RETRIEVE_EVENT_URL= 'http://localhost:8080/event/retrieve/';

class ViewEvent extends Component {

    constructor () {
        super();
        this.state = {
            event: {}
        };
    }

    componentDidMount(){
        axios.get(RETRIEVE_EVENT_URL + this.props.match.params.id, {data:{}})
        .then(response => {
            console.log(response.data);
            this.setState({event : response.data});
        })
    }

    parseStatus = (statusId) => {
        return (statusId) ? "ACCEPTED" : "PENDING";
    }

    render(){
        const { classes } = this.props;
        return(
            <Container>
                <Grid container>
                    <h3>View Event</h3>
                </Grid>
                <Grid container>
                        <Grid item container>
                            <TextField
                                name="patientName"
                                value={this.state.event.patientName}
                                label="Patient's Name"
                                placeholder="Placeholder"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                disabled
                            />
                        </Grid>

                        {/**
                         *   Time Slot 
                         */}
                        <Grid item container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    name="eventDate"
                                    value={this.state.event.eventDate}
                                    label="Date"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="startTime"
                                    value={this.state.event.startTime}
                                    label="Start Time"
                                    type="time"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="endTime"
                                    value={this.state.event.endTime}
                                    label="End Time"
                                    type="time"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <TextField
                                name="doctorName"
                                value={this.state.event.assignedTo}
                                label="Doctor's Name"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    name="schedulerName"
                                    value={this.state.event.createdBy}
                                    label="Scheduler's Name"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="createdBy"
                                    value={this.state.event.creationDateTime}
                                    label="Creation Datetime"
                                    type="datetime"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    name="status"
                                    value={this.parseStatus(this.state.event.accepted)}
                                    label="Status"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="acceptedDateTime"
                                    value={this.state.event.acceptedDateTime}
                                    label="Accepted Datetime"
                                    type="datetime"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid container>
                                <Button fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.props.history.goBack}
                                    endIcon={<Icon>back</Icon>}
                                >Back</Button>
                            </Grid>
                        </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withRouter(withStyles(useStyles)(ViewEvent));