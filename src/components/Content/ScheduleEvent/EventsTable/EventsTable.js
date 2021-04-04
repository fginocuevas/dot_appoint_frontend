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

const useStyles = theme => ({
    table: {
      minWidth: 650,
    },
  });

  //TODO Get All Events
const RETRIEVE_EVENT_BY_DATE_RANGE_URL= 'http://localhost:8080/event/retrieveByDateRange?startDate=2021-02-01&endDate=2021-04-03';

class EventsTable extends Component {

    state = {
        events : [],
        appUserId: 0,
        roleTypeId: 0,
    };

    componentDidMount(){
        this.handleAuthorization();
        axios.get(RETRIEVE_EVENT_BY_DATE_RANGE_URL, {data : {}})
        .then(response => {
            // console.log(response);
            this.setState({events : response.data});
        })
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

    isAppUserScheduler = () => {
        return this.state.roleTypeId === 1;
    }

    render(){
        const { classes } = this.props;
        return(
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Patient's Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Start Time</TableCell>
                            <TableCell align="right">End Time</TableCell>
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
                                <TableCell align="right">
                                    <IconButton component={NavLink} to={'/viewEvent/' + event.id}>
                                        <SearchIcon fontSize="small" />
                                    </IconButton>
                                    {!this.isAppUserScheduler() && 
                                        <IconButton disabled={event.accepted}>
                                            <AcceptEventDialog targetEvent={event}/>
                                        </IconButton>
                                    }
                                    {this.isAppUserScheduler() && 
                                        <IconButton component={NavLink} to={'/editEvent/' + event.id}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    }
                                    <IconButton>
                                        <DeleteEventDialog targetEvent={event}/>
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