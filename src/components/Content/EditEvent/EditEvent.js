import React, { Component } from 'react'
import { Container, Grid, TextField, withStyles, Button, Icon } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ErrorBanner from '../../../containers/ErrorBanner/ErrorBanner';

const useStyles = (theme) => ({
    button: {
        margin: theme.spacing(2),
    },
});

const RETRIEVE_EVENT_URL= 'http://localhost:8080/event/retrieve/';
const EDIT_EVENT_URL= 'http://localhost:8080/event/edit';

class EditEvent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            event: {},
            pageError: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.resetError();

        axios.get(RETRIEVE_EVENT_URL + this.props.match.params.id, {data:{}})
        .then(response => {
            console.log(response.data);
            this.setState({event : response.data});
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                this.setState( {pageError : error.response.data.message} );
            }
        })
    }

    handleChange (evt) {
        this.setState({ event : {
            ...this.state.event,
            [evt.target.name]: evt.target.value }
        });
    }

    handleBackButton = () => {
        this.props.history.push('/events');
    }

    parseStatus = (statusId) => {
        return (statusId) ? "ACCEPTED" : "PENDING";
    }

    resetError = () => {
        this.setState({ error : null});
    }

    submitForm = (evt) => {
        evt.preventDefault();

        console.log("state", this.state);

        const formData= {
            id: this.state.event.id,
            patientName: this.state.event.patientName,
            eventDate: this.state.event.eventDate,
            startTime: this.state.event.startTime,
            endTime: this.state.event.endTime,
            comments: this.state.event.comments,
        }

        console.log("form", formData);

        axios.put(EDIT_EVENT_URL, formData).then(response => {
            //TODO Handle toast or notification
            this.props.history.push('/viewEvent/' + response.data.id)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                this.setState( {pageError : error.response.data.message} );
            }
        })
    }

    render(){
        const { classes } = this.props;
        
        return(
            <Container>
                <Grid container>
                    <h3>Edit Event</h3>
                </Grid>
                <ErrorBanner pageErrors={this.state.pageError}/>
                <form onSubmit={this.submitForm}>
                    <Grid container>
                            <Grid item container>
                                <TextField
                                    name="patientName"
                                    value={this.state.event.patientName}
                                    onChange= {this.handleChange}
                                    label="Patient's Name"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
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
                                        onChange= {this.handleChange}
                                        label="Date"
                                        type="date"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        name="startTime"
                                        value={this.state.event.startTime}
                                        onChange= {this.handleChange}
                                        label="Start Time"
                                        type="time"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        name="endTime"
                                        value={this.state.event.endTime}
                                        onChange= {this.handleChange}
                                        label="End Time"
                                        type="time"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
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
                            <Grid item container>
                                    <TextField
                                        name="comments"
                                        value={this.state.event.comments}
                                        onChange= {this.handleChange}
                                        label="Comments"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                    />
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
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.handleEditButton}
                                        className={classes.button}
                                        endIcon={<Icon>edit</Icon>}
                                    >Edit</Button>
                                </Grid>
                                <Grid container>
                                    <Button fullWidth
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleBackButton}
                                        className={classes.button}
                                        endIcon={<Icon>back</Icon>}
                                    >Back</Button>
                                </Grid>
                            </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}

export default withRouter(withStyles(useStyles)(EditEvent));