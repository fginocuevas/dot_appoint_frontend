import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import ScheduleEvent from './ScheduleEvent/ScheduleEvent';

const Content = (props) => {
    
    return(
        <Container>
            <Grid item container>
                <Route path="/event" exact component={ScheduleEvent}/>
            </Grid>
        </Container>
    )
}

export default Content;