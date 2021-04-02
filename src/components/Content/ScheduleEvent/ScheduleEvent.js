import { Container, Grid, TextField, Box, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import EventsTable from './EventsTable/EventsTable';

const useStyles = makeStyles((theme) => ({
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
  }));

const ScheduleEvent = (props) => {

    const classes = useStyles();
    
    return(
        <Container>
            <Grid container>
                <h3>Schedule Event</h3>
            </Grid>
            <Grid item container>
                <div className={classes.root}>
                    <Alert severity="success" color="info">
                        This is a success alert — check it out!
                    </Alert>
                </div>
            </Grid>
            <Box mt={0.5}>
                <Grid container>
                        <Grid item xs={8} >
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="date"
                                    label="From"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <TextField
                                    id="date"
                                    label="To"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Icon>search</Icon>}
                                >Search</Button>
                            </form>
                        </Grid>
                        <Grid item xs={4} >
                            <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<Icon>add</Icon>}
                                >Set New Event</Button>
                        </Grid>
                </Grid>
            </Box>
            <Box mt={0.5}>
                <EventsTable />
            </Box>
        </Container>
    )
}

export default ScheduleEvent;