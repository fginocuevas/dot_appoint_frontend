import React, { Component } from 'react'
import { Container, Grid } from '@material-ui/core';


class ViewEvent extends Component {
    render(){
        return(
            <Container>
                <Grid container>
                    <h3>View Event</h3>
                </Grid>
                <Grid>
                    Details here
                </Grid>
            </Container>
        )
    }
}

export default ViewEvent;