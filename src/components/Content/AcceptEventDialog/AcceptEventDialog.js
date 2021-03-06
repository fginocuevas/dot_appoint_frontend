import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import axios from 'axios';

const ACCEPT_EVENT_URL= 'http://localhost:8080/event/accept';

const AcceptEventDialog = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAccept= () => {
    let formData = {
      eventId: props.targetEvent.id,
      doctorId: props.targetEvent.doctorId
    }

    axios.post(ACCEPT_EVENT_URL, formData)
        .then(response => { 
          props.showSuccessMessage("Successfully accepted event for " + props.targetEvent.patientName);
          props.handleReload(true);
          console.log("Accepting event success!");
        }).catch((error) => {
          if (error.response) {
              console.log("Error occurred in handleAccept");
              console.log(error.response.data);
              props.showErrorMessage(error.response.data.message);
          }
        });

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ThumbUpIcon fontSize="small" onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Accept Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to accept the scheduled event?
            {/**
             * TODO Insert event details here
             */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AcceptEventDialog;