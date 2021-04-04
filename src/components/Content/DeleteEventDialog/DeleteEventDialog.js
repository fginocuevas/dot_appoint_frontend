import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

const DELETE_EVENT_URL= 'http://localhost:8080/event/delete/';

const DeleteEventDialog = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete= () => {
    console.log(props.targetEvent);

    axios.get(DELETE_EVENT_URL + props.targetEvent.id)
        .then(response => { 
          console.log("Deleting event success!");
          props.showSuccessMessage("Successfully deleted event for " + props.targetEvent.patientName);
          props.handleReload(true);
        }).catch(error => {
          console.log("Error occurred in delete event");
          console.log(error.response.data);
          props.showErrorMessage(error.response.data.message);
        });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DeleteIcon fontSize="small" onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete the scheduled event?
            {/**
             * TODO Insert event details here
             */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteEventDialog;