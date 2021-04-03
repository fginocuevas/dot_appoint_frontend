import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function ErrorBanner(props) {

    const classes = useStyles();

    return(
        <Grid item container>
        {props.pageErrors && Object.keys(props.pageErrors).length !== 0 && 
            <div className={classes.root}>
                <Alert severity="error" color="error">
                    {props.pageErrors.message}
                </Alert>
            </div>
        }
        </Grid>
    )
}
