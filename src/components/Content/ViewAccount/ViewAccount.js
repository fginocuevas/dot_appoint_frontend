import React, { Component } from 'react'
import { Container, Grid, TextField, withStyles, Button, Icon, FormControl, InputLabel, Select } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ErrorBanner from '../../../containers/ErrorBanner/ErrorBanner';
import SnackBarCustom from '../../../containers/SnackBarCustom/SnackBarCustom';

const useStyles = (theme) => ({
    button: {
        margin: theme.spacing(2),
    },
});

const RETRIEVE_USER_URL= 'http://localhost:8080/user/';
const RETRIEVE_STATUS_TEMPLATE_URL= 'http://localhost:8080/status/template';
const UPDATE_DOCTOR_STATUS_URL= 'http://localhost:8080/doctor/changeStatus';

class ViewAccount extends Component {

    constructor (props) {
        super(props);
        this.state = {
            userData: {},
            statusTypes: [],
            pageError: null,
        };
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    componentDidMount(){
        this.resetError();

        if(localStorage.getItem('appUser')){

            const appUser= JSON.parse(localStorage.getItem('appUser'));    

            // Retrieve User Details
            axios.get(RETRIEVE_USER_URL + appUser.id, {data:{}})
            .then(response => {
                console.log("response", response.data);
                this.setState({
                    userData : response.data,
                    chosenStatusId : response.data.statusTypeId
                });
            }).catch((error) => {
                if (error.response) {
                    this.setState( {pageError : error.response.data.message} );
                }
            });

            //Retrieve Status Template
            axios.get(RETRIEVE_STATUS_TEMPLATE_URL, {data:{}})
            .then(response => {
                this.setState({
                    statusTypes : response.data,
                    chosenStatusId : response.data.statusTypeId
                });
            }).catch((error) => {
                if (error.response) {
                    this.setState( {pageError : error.response.data.message} );
                }
            });

        } else {
            this.setState( {pageError : "An unknown error occurred. Please contact your system administrator"} );
        }
        
    }

    handleBackButton = () => {
        this.props.history.push('/events');
    }

    handleUpdateStatus = () => {
        this.resetError();
        const formData = {
            doctorId: this.state.userData.id,
            statusType: this.state.chosenStatusId,
        }

        axios.put(UPDATE_DOCTOR_STATUS_URL, formData)
        .then(response => {
            this.setState({pageSuccess : "Successfully updated status to " + response.data.statusDisplayText})
            this.props.history.push({
                pathname: '/account/' 
            });
        }).catch((error) => {
            if (error.response) {
                this.setState( {pageError : error.response.data.message} );
            }
        });

    }

    parseStatus = (statusId) => {
        return (statusId) ? "ACCEPTED" : "PENDING";
    }

    resetError = () => {
        this.setState({ pageError : null});
    }

    render(){
        const { classes } = this.props;
        
        return(
            <Container>
                <Grid container>
                    <h3>Account Information</h3>
                </Grid>
                {this.state.pageSuccess && 
                <SnackBarCustom 
                    errorMessage={this.state.pageSuccess}
                    severity="success"/>}
                <ErrorBanner pageErrors={this.state.pageError}/>
                <Grid container>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                name="firstname"
                                label="Firstname"
                                value={this.state.userData.firstname}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="lastname"
                                label="Lastname"
                                value={this.state.userData.lastname}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                name="email"
                                label="Email"
                                value={this.state.userData.email}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="role"
                                label="Role"
                                value={this.state.userData.role}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                                Status
                            </InputLabel>
                            <Select
                                native
                                name="chosenStatusId"
                                value={this.state.chosenStatusId}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'chosenStatusId',
                                    id: 'outlined-age-native-simple',
                                }}>
                                {this.state.statusTypes.map(statusType => (
                                    <option 
                                        key={statusType.value} 
                                        value={statusType.value}
                                    > 
                                    {statusType.displayText}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container>
                        <Button fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                            onClick={this.handleUpdateStatus}
                            className={classes.button}
                            endIcon={<Icon>edit</Icon>}
                        >Change Status</Button>
                    </Grid>
                    <Grid container>
                        <Button fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleBackButton}
                            className={classes.button}
                            endIcon={<Icon>back</Icon>}
                        >Back</Button>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withRouter(withStyles(useStyles)(ViewAccount));