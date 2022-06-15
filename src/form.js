import { useLocalStorage } from "./useLocalStorage"
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from "@mui/material/Box";

export default function Form(props) {
  const [name, setName] = useLocalStorage("name", "")

  const handleChange = (newValue) => {
    props.onChangeValue(newValue);
  };

  return (
    // <Box sx={{width: 500, maxWidth: '100%', marginBottom: '20px'}} autoComplete='off'>
    //   <LocalizationProvider dateAdapter={AdapterDateFns}>
    //     <TextField
    //         value={name}
    //         inputProps={{ maxLength: 100, style: { textAlign: 'center'}}}
    //         onChange={(e) => setName(e.target.value)}
    //         sx={{marginTop: '20px'}}
    //         fullWidth
    //       />
    //     <DesktopDatePicker
    //       inputFormat="MM/dd/yyyy"
    //       value={dateTime}
    //       onChange={handleChange}
    //       renderInput={(params) => <TextField sx={{width: 240, maxWidth: '50%', marginTop: '20px', marginRight: '10px'}} {...params} />}
    //     />
    //     <TimePicker
    //       value={dateTime}
    //       onChange={handleChange}
    //       renderInput={(params) => <TextField sx={{width: 240, maxWidth: '50%', marginTop: '20px', marginLeft: '10px'}} {...params} />}
    //     />
    //   </LocalizationProvider>
    // </Box>
    <Box sx={{width: 350, maxWidth: '100%', marginBottom: '20px'}} autoComplete='off'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TextField
            value={name}
            inputProps={{ maxLength: 100, style: { textAlign: 'center'}}}
            onChange={(e) => setName(e.target.value)}
            sx={{marginTop: '20px'}}
            fullWidth
          />
        <DesktopDatePicker
          views={['day']}
          inputFormat="MM/dd/yyyy"
          value={props.value.value}
          onChange={handleChange}
          renderInput={(params) => <TextField sx={{width: 168, maxWidth: '50%', marginTop: '14px', marginRight: '7px', fontSize: '10px'}} {...params} />}
          PopperProps={{
            placement: "top",
            sx: {"& .MuiPaper-root": {
              maxHeight: "335px",
            }}
          }}
        />
        <TimePicker
          value={props.value.value}
          onChange={handleChange}
          renderInput={(params) => <TextField sx={{width: 168, maxWidth: '50%', marginTop: '14px', marginLeft: '7px'}} {...params} />}
          PopperProps={{
            placement: "top",
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
