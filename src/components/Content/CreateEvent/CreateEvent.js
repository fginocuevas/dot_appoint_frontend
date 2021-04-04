import React, { Component } from 'react'
import { Container, Grid, TextField, FormControl, InputLabel, Select, withStyles, Button, Icon } from '@material-ui/core';
import axios from 'axios';
import ErrorBanner from '../../../containers/ErrorBanner/ErrorBanner';
import { withRouter } from 'react-router-dom'

const useStyles = (theme) => ({
    button: {
        margin: theme.spacing(2),
    },
});

const RETRIEVE_ALL_DOCTORS_URL= 'http://localhost:8080/doctor/retrieveAll';
const CREATE_NEW_EVENT_URL= 'http://localhost:8080/event/create';

class CreateEvent extends Component {

    constructor () {
        super();
        this.state = {
            patientName: null,
            eventDate: null,
            startTime: null,
            endTime: null,
            assignedDoctorId: 0,
            schedulerId: 1,
            doctorList: [],
            pageError: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get(RETRIEVE_ALL_DOCTORS_URL, {data : {}})
        .then(response => {
            this.setState({doctorList : response.data});
        })
    }

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    resetError = () => {
        this.setState({ error : null});
    }


    submitForm = (evt) => {
        evt.preventDefault();
        this.resetError();

        const formData= {
            patientName: this.state.patientName,
            eventDate: this.state.eventDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            assignedDoctorId: parseInt(this.state.assignedDoctorId),
            schedulerId: this.state.schedulerId,
        }
        axios.post(CREATE_NEW_EVENT_URL, formData).then(response => {
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
                    <h3>Create Event</h3>
                </Grid>
                <ErrorBanner pageErrors={this.state.pageError}/>
                <form onSubmit={this.submitForm}>
                    <Grid container>
                            <Grid item container>
                                <TextField
                                    onChange= {this.handleChange}
                                    name="patientName"
                                    label="Patient's Name"
                                    placeholder="Patient's Name"
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
                                        onChange= {this.handleChange}
                                        name="eventDate"
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
                                        onChange= {this.handleChange}
                                        name="startTime"
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
                                        onChange= {this.handleChange}
                                        name="endTime"
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
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-age-native-simple">Doctor's Name</InputLabel>
                                    <Select
                                        native
                                        value={this.state.assignedDoctorId}
                                        onChange={this.handleChange}
                                        label="Doctor's Name"
                                        inputProps={{
                                            name: 'assignedDoctorId',
                                            id: 'outlined-age-native-simple',
                                        }}>
                                            <option aria-label="None" value="" />
                                            {this.state.doctorList.map(doctorData => (
                                                <option 
                                                    key={doctorData.id} 
                                                    value={doctorData.id}>
                                                        {doctorData.id} - {doctorData.lastname}, {doctorData.firstname}
                                                </option>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container>
                                <Button fullWidth
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<Icon>submit</Icon>}
                                >Submit</Button>
                            </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}

export default withRouter(withStyles(useStyles)(CreateEvent));