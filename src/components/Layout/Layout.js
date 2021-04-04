import React from 'react';
import Aux from '../../hoc/Aux';
import { Grid } from '@material-ui/core';

import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import { Route } from 'react-router-dom';
import ScheduleEvent from '../Content/ScheduleEvent/ScheduleEvent';
import ViewEvent from '../Content/ViewEvent/ViewEvent';
import CreateEvent from '../Content/CreateEvent/CreateEvent';
import EditEvent from '../Content/EditEvent/EditEvent';
import ViewAccount from '../Content/ViewAccount/ViewAccount';

const layout= (props) => (
    <Aux>
        <Grid container direction="column">
            <Grid item container>
                <Navbar />
            </Grid>
            <Grid item container >
                <Route path="/" exact component={Login} />
                <Route path="/events" exact component={ScheduleEvent}/>
                <Route path="/viewEvent/:id" exact component={ViewEvent}/>
                <Route path="/editEvent/:id" exact component={EditEvent}/>
                <Route path="/createEvent/" exact component={CreateEvent}/>
                <Route path="/account/" exact component={ViewAccount}/>
            </Grid>
        </Grid>
    </Aux>
)

export default layout;