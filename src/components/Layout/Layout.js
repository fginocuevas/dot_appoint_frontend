import React from 'react';
import Aux from '../../hoc/Aux';
import { Grid } from '@material-ui/core';

import Navbar from '../Navbar/Navbar';
import Content from '../Content/Content';

const layout= (props) => (
    <Aux>
        <Grid container direction="column">
            <Grid item container>
                <Navbar />
            </Grid>
            <Grid item container >
                <Content />
            </Grid>
        </Grid>
    </Aux>
)

export default layout;