import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import moment from 'moment-timezone';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
  borderRadius: 2,
};

export default function ConversionModal(props) {

  const timeZones = moment.tz.names();
  const filterOptions = createFilterOptions({
    limit: 2,
  });

  const [dateTime, setDateTime] = React.useState(moment.tz(new Date(), moment.tz.guess(true)));
  const handleChange = (value) => {
    setDateTime(value);
    // convertDateTime(value, otherTimeZone);
  }

  const [timeZone, setTimeZone] = React.useState(moment.tz.guess(true))
  const handleTimeZone = (value) => {
    setTimeZone(value);
    dateTime.tz(value, true);
    // convertDateTime(value, otherTimeZone);
  }

  // const [otherDateTime, setOtherDateTime] = React.useState(moment.tz(new Date(), moment.tz.guess(true)));

  const [otherTimeZone, setOtherTimeZone] = React.useState(moment.tz.guess(true))
  const handleOtherTimeZone = (value) => {
    setOtherTimeZone(value);
    // convertDateTime(dateTime, value);
  }

  const convertDateTime = (dt, tz, otz) => {
    return moment.tz(dt, tz).tz(otz).format("MM/DD/yyyy h:mm a");
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
            Time Conversion
          </Typography>
          <Box sx={{display: "flex",}}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
            views={['day']}
            inputFormat="MM/DD/yyyy"
            value={dateTime}
            onChange={handleChange}
            renderInput={(params) => <TextField sx={{width: 145, maxWidth: '50%', marginTop: '10px', marginRight: '5px'}} {...params} />}
            PopperProps={{
              placement: "top",
              sx: {"& .MuiPaper-root": {
                maxHeight: "335px",
              }}
            }}
          />
          <TimePicker
            value={dateTime}
            onChange={handleChange}
            renderInput={(params) => <TextField sx={{width: 145, maxWidth: '50%', marginTop: '10px', marginLeft: '5px'}} {...params} />}
            PopperProps={{
              placement: "top",
            }}
          />
          </LocalizationProvider>
          </Box>
          <Autocomplete
              value={timeZone}
              disablePortal
              options={timeZones}
              filterOptions={filterOptions}
              onChange={(e, newValue) => {handleTimeZone(newValue)}}
              sx={{width: 300, marginTop: '10px',}}
              renderInput={(params) => <TextField {...params} />}
          />
          <Typography sx={{marginTop: '10px',}} component="h2" >
            IS
          </Typography>
          <Typography sx={{marginTop: '10px',}} component="h2" >
            {convertDateTime(dateTime, timeZone, otherTimeZone)}
          </Typography>
          <Autocomplete
            value={otherTimeZone}
            disablePortal
            options={timeZones}
            filterOptions={filterOptions}
            onChange={(e, newValue) => {handleOtherTimeZone(newValue)}}
            sx={{width: 300, marginTop: '10px',}}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button sx={{marginTop: "10px", width: "100%"}} onClick={props.handleClose} variant="outlined">Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
