import React from "react";
import { useLocalStorage } from "./useLocalStorage"
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Timer from '@mui/icons-material/Timer';
// import "./App.css";
import "./AppExtension.css";
import Form from "./form"
import Countdown from "./countdown";
import BasicModal from "./modal";

function App() {

  // function getDateTime(defaultValue) {
  //   const saved = localStorage.getItem("dateTime");
  //   const initial = JSON.parse(saved);
  //   return initial || defaultValue;
  // }

  // const [dateTime, setDateTime] = useState(getDateTime(new Date()));
  const [dateTime, setDateTime] = useLocalStorage("dateTime", new Date());

  const state = {
    value: dateTime,
  }

  function handleChangeValue(newValue){
    setDateTime(newValue);
  };

  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

  const [mode, setMode] = useLocalStorage("theme", "light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
        >
          <div className="App">
            <div className="header">Countdown Timer 
              <IconButton sx={{ ml: 1, transform: 'translateY(-3px)' }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
              <IconButton sx={{ ml: 1, transform: 'translateY(-3px)' }} onClick={handleOpen} color="inherit">
                  <Timer/>
              </IconButton></div>
            <Countdown value={state}/>
            <div className="other-text">UNTIL</div>
            <Form
              value={state}
              onChangeValue={handleChangeValue}/>
          </div>
          <BasicModal
              onSubmit={handleChangeValue}
              open={open}
              handleClose={handleClose}/>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;