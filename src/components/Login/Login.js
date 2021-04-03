import React, { Component } from 'react';
import axios from 'axios';
import { Container, Paper, withStyles, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1),
        margin: theme.spacing(10),
    }
});

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const AUTHENTICATE_URL = "http://localhost:8080/authenticate";

    const username = this.state.username;
    const password = this.state.password;

    const formData = {
      username: username,
      password: password
    };

    axios.post(AUTHENTICATE_URL, formData).then(res => {
        console.log("Bearer " + res.data.jwttoken);
        localStorage.setItem("authorization", res.data.jwttoken);
        return this.handleDashboard();
    }).catch(err => {
        console.log("ERROR")
    });
  };

  handleDashboard() {
        console.log("handleDashboard start");
        axios.get("http://localhost:8080/user/1").then(res => {
        //Place currentUser in cookies
        if (res.data) {
            this.props.history.push("/events");
        } else {
            alert("Authentication failure");
        }
        }).catch(err => {
            console.log(err);
        });
  }

  render() {
    const { classes } = this.props;
    return (
        <Container>
            <Grid container justify="center" wrap="wrap">
                <form className="form-signin" onSubmit={this.handleFormSubmit}>
                    <Paper className={classes.padding}>
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Face />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField 
                                        onChange={this.handleChange}
                                        id="username" 
                                        label="Username" 
                                        type="text" 
                                        fullWidth 
                                        autoFocus 
                                        required />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Fingerprint />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField 
                                        onChange={this.handleChange}
                                        id="password" 
                                        label="Password" 
                                        type="password" 
                                        fullWidth 
                                        required />
                                </Grid>
                            </Grid>
                            <Grid container justify="center" style={{ marginTop: '40px' }}>
                                <Button 
                                    fullWidth
                                    type="submit"
                                    variant="contained" 
                                    size="large" 
                                    color="primary" 
                                    style={{ textTransform: "none" }}
                                >Login</Button>
                            </Grid>
                        </div>
                    </Paper>
                </form>
            </Grid>
        </Container>
    );
  }
}
export default withRouter(withStyles(styles)(Login));