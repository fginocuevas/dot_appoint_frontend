import { Container, Grid, TextField, Box, Button, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EventsTable from './EventsTable/EventsTable';
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter, NavLink } from 'react-router-dom';
import ErrorBanner from '../../../containers/ErrorBanner/ErrorBanner';

const useStyles = (theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
        width: '25ch'
      },
    },
    dateField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    button: {
        margin: theme.spacing(1),
    },
  });

const RETRIEVE_EVENT_BY_DATE_RANGE_URL= 'http://localhost:8080/event/retrieveByDateRange';

class ScheduleEvent extends Component {

    constructor () {
        super();
        this.state = {
            searchData: null,
            startDateSelected: moment(new Date()).format("YYYY-MM-DD"),
            endDateSelected: moment(new Date()).format("YYYY-MM-DD"),
            pageErrors: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    searchByDateRangeHandler = () => {
        if(this.state.startDateSelected && this.state.endDateSelected){

            const formData = {
                data : {},
                params: {
                    startDate: this.state.startDateSelected,
                    endDate: this.state.endDateSelected
                }
            }

            axios.get(RETRIEVE_EVENT_BY_DATE_RANGE_URL, formData)
            .then(response => {
                this.setState({searchData: response.data});
            })
        }

    }
    
    render(){
        const { classes } = this.props;

        return(
            <Container>
                <Grid container>
                    <h3>Schedule Event</h3>
                </Grid>
                <ErrorBanner pageErrors={this.state.pageErrors}/>
                <Box mt={0.5}>
                    <Grid container>
                            <Grid item xs={8} >
                                <form className={classes.container} noValidate>
                                    <TextField
                                        name="startDateSelected"
                                        label="From"
                                        type="date"
                                        className={classes.textField}
                                        value={this.state.startDateSelected}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    <TextField
                                        name="endDateSelected"
                                        label="To"
                                        type="date"
                                        className={classes.textField}
                                        value={this.state.endDateSelected}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        endIcon={<Icon>search</Icon>}
                                        onClick= {this.searchByDateRangeHandler}
                                    >Search</Button>
                                </form>
                            </Grid>
                            <Grid item xs={4} >
                                <Button component={NavLink} to={'/createEvent/'}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        endIcon={<Icon>add</Icon>}
                                    >Set New Event</Button>
                            </Grid>
                    </Grid>
                </Box>
                <Box mt={0.5}>
                    <EventsTable 
                        searchData = {this.state.searchData}/>
                </Box>
            </Container>
        )

    }
    
}

export default withRouter(withStyles(useStyles)(ScheduleEvent));