import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import ScheduleEvent from './ScheduleEvent/ScheduleEvent';
import ViewEvent from './ViewEvent/ViewEvent';

const Content = (props) => {
    
    return(
        <Container>
            <Grid item container>
                <Route path="/events" exact component={ScheduleEvent}/>
                <Route path="/viewevent/:id" component={ViewEvent}/>
            </Grid>
        </Container>
    )
}

export default Content;