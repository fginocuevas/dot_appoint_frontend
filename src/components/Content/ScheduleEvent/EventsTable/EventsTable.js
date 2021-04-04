import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import { withRouter, NavLink } from 'react-router-dom';

import AcceptEventDialog from '../../AcceptEventDialog/AcceptEventDialog';
import DeleteEventDialog from '../../DeleteEventDialog/DeleteEventDialog';
import SnackBarCustom from '../../../../containers/SnackBarCustom/SnackBarCustom';

const useStyles = theme => ({
    table: {
      minWidth: 650,
    },
  });

  //TODO Get All Events
const RETRIEVE_ALL_EVENTS_URL= 'http://localhost:8080/event/retrieveAll';
const RETRIEVE_ALL_EVENTS_BY_DOCTOR_URL = 'http://localhost:8080/event/retrieveAllByDoctor/';

class EventsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events : [],
            appUserId: 0,
            roleTypeId: 0,
            pageError: null,
            pageSuccess: null,
        };
        this.showSuccessMessage = this.showSuccessMessage.bind(this);
        this.showErrorMessage= this.showErrorMessage.bind(this);
        this.handleReload= this.handleReload.bind(this);
    }

    handleReload(proceed){
        if(proceed){
            window.location.reload();
        }
    }

    showSuccessMessage(message){
        this.setState({
            pageSuccess: message
        })
    }

    showErrorMessage(message){
        this.setState({
            pageError: message
        })
    }

    componentDidMount(){
        this.handleAuthorization();

        if(localStorage.getItem('appUser')){

            const appUser= JSON.parse(localStorage.getItem('appUser'));
            let retrieveUrl= RETRIEVE_ALL_EVENTS_URL;

            if(appUser.roleTypeId === 2){
                retrieveUrl= RETRIEVE_ALL_EVENTS_BY_DOCTOR_URL + appUser.id;
            }

            axios.get(retrieveUrl, {data : {}})
                .then(response => {
                    this.setState({events : response.data});
                }).catch((error) => {
                    if (error.response) {
                        console.log("error", error.response.data.message);
                    }
                });

        } else {
            console.log("Error occurred")
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.searchData){
            this.setState({events : nextProps.searchData});
        }
    }

    handleAuthorization() {
        if(localStorage.getItem('appUser')){
            const appUser= JSON.parse(localStorage.getItem('appUser'));
            this.setState({
                appUserId : appUser.id,
                roleTypeId : appUser.roleTypeId
            });
        }
    }

    parseStatus = (statusId) => {
        return (statusId) ? "ACCEPTED" : "PENDING";
    }

    isAppUserScheduler = () => {
        return this.state.roleTypeId === 1;
    }

    render(){
        const { classes } = this.props;
        return(
            <TableContainer component={Paper}>
                {this.state.pageSuccess && 
                <SnackBarCustom 
                    errorMessage={this.state.pageSuccess}
                    severity="success"/>}
                {this.state.pageError && 
                <SnackBarCustom 
                    errorMessage={this.state.pageError}
                    severity="error"/>}
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Patient's Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Start Time</TableCell>
                            <TableCell align="right">End Time</TableCell>
                            <TableCell align="right">Actions</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.events.map((event) => (
                            <TableRow key={event.id} style={{ textDecoration: 'none' }}>
                                <TableCell component="th" scope="row">{event.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {event.patientName}
                                </TableCell>
                                <TableCell align="right">{event.eventDate}</TableCell>
                                <TableCell align="right">{event.startTime}</TableCell>
                                <TableCell align="right">{event.endTime}</TableCell>
                                <TableCell align="right">{this.parseStatus(event.accepted)}</TableCell>
                                <TableCell align="right">
                                    <IconButton component={NavLink} to={'/viewEvent/' + event.id}>
                                        <SearchIcon fontSize="small" />
                                    </IconButton>
                                    {!this.isAppUserScheduler() && 
                                        <IconButton disabled={event.accepted}>
                                            <AcceptEventDialog 
                                                targetEvent={event}
                                                showSuccessMessage= {this.showSuccessMessage}
                                                showErrorMessage= {this.showErrorMessage}
                                                handleReload= {this.handleReload}
                                            />
                                        </IconButton>
                                    }
                                    {this.isAppUserScheduler() && 
                                        <IconButton component={NavLink} to={'/editEvent/' + event.id}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    }
                                    <IconButton>
                                        <DeleteEventDialog 
                                            targetEvent={event}
                                            showSuccessMessage= {this.showSuccessMessage}
                                            showErrorMessage= {this.showErrorMessage}
                                            handleReload= {this.handleReload}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default withRouter(withStyles(useStyles)(EventsTable));