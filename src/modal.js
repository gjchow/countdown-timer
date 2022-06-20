import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.default',
  boxShadow: 24,
  p: 2,
  color: 'text.primary',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default function BasicModal(props) {
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const onSubmit = () => {
    var date = +new Date()
    if (days > 0){
      date += (1000 * 60 * 60 * 24 * +days);
    }
    if (hours > 0){
      date += (1000 * 60 * 60 * +hours);
    }
    if (minutes > 0){
      date += (1000 * 60 * +minutes);
    }
    if (seconds > 0){
      date += (1000* +seconds);
    }
    date = new Date(date);
    props.onSubmit(date);
    props.handleClose();
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            Timer
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 , marginBottom: "10px", marginTop: "10px"}}>
            Anything less than 0 will be ignored.
          </Typography>
          <Box sx={{display: "flex", flexDirection: 'column',}}>
            <TextField 
              value={days}
              onChange={(e) => setDays(e.target.value)}
              id="days" 
              label="Days" 
              type="number"
              InputProps={{ inputProps: { min: 0} }}
              sx={{marginTop: "10px", width: "224px"}}/>
            <TextField 
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              id="hours" 
              label="Hours" 
              type="number"
              InputProps={{ inputProps: { min: 0} }}
              sx={{marginTop: "10px", width: "224px"}}/>
            <TextField 
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              id="minutes" 
              label="Minutes" 
              type="number"
              InputProps={{ inputProps: { min: 0} }}
              sx={{marginTop: "10px", width: "224px"}}/>
            <TextField 
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              id="seconds" 
              label="Seconds" 
              type="number"
              InputProps={{ inputProps: { min: 0} }}
              sx={{marginTop: "10px", width: "224px"}}/>
          </Box>
          <span>
          <Button sx={{marginTop: "10px", width: "107px", marginRight: "5px"}} onClick={onSubmit} variant="outlined">OK</Button>
          <Button sx={{marginTop: "10px", width: "107px", marginLeft: "5px"}} onClick={props.handleClose} variant="outlined">Cancel</Button></span>
        </Box>
      </Modal>
    </div>
  );
}
