import React, { Component } from 'react'
import { Container, Grid, TextField, FormControl, InputLabel, Select, withStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = (theme) => ({

});

const RETRIEVE_ALL_DOCTORS_URL= 'http://localhost:8080/doctor/retrieveAll';

class ViewEvent extends Component {

    constructor () {
        super();
        this.state = {
            patientName: null,
            eventDate: null,
            startTime: null,
            endTime: null,
            doctorId: null,
            schedulerId: null,
            doctorList: []
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
                                value={this.state.doctorId}
                                onChange={this.handleChange}
                                label="Doctor's Name"
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}>
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
                </Grid>
            </Container>
        )
    }
}

export default withStyles(useStyles)(ViewEvent);