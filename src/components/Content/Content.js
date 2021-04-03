import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import ScheduleEvent from './ScheduleEvent/ScheduleEvent';
import ViewEvent from './ViewEvent/ViewEvent';
import CreateEvent from './CreateEvent/CreateEvent';

const Content = (props) => {
    
    return(
        <Container>
            <Grid item container>
                <Route path="/events" exact component={ScheduleEvent}/>
                <Route path="/viewEvent/:id" exact component={ViewEvent}/>
                <Route path="/createEvent/" exact component={CreateEvent}/>
            </Grid>
        </Container>
    )
}

export default Content;