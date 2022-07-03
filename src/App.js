import React from "react";
import { useLocalStorage } from "./useLocalStorage"
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Timer from '@mui/icons-material/Timer';
import ChangeCircle from '@mui/icons-material/ChangeCircle';
// import "./App.css";
import "./AppExtension.css";
import Form from "./form"
import Countdown from "./countdown";
import { Tooltip } from "@mui/material";
import TimerModal from "./timerModal";
import ConversionModal from "./conversionModal";

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

  const [timerOpen, setTimerOpen] = React.useState(false);
  const handleTimerOpen = () => setTimerOpen(true);
  const handleTimerClose = () => setTimerOpen(false);

  const [conversionOpen, setConversionOpen] = React.useState(false);
  const handleConversionOpen = () => setConversionOpen(true);
  const handleConversionClose = () => setConversionOpen(false);

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
              <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'} PopperProps={{
                      modifiers: [{name: "offset", options: {offset: [0, -14], }, }, ], }}>
                <IconButton sx={{ ml: 1, transform: 'translateY(-3px)' }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
              {/* <Tooltip title='Timer' PopperProps={{
                      modifiers: [{name: "offset", options: {offset: [0, -14], }, }, ], }}>
                <IconButton sx={{ ml: 1, transform: 'translateY(-3px)' }} onClick={handleTimerOpen} color="inherit">
                    <Timer/>
                </IconButton>
              </Tooltip> */}
              <Tooltip title='Time Conversion' PopperProps={{
                      modifiers: [{name: "offset", options: {offset: [0, -14], }, }, ], }}>
                <IconButton sx={{ ml: 1, transform: 'translateY(-3px)' }} onClick={handleConversionOpen} color="inherit">
                    <ChangeCircle/>
                </IconButton>
              </Tooltip>
            </div>
            <Countdown value={state}/>
            <div className="other-text">UNTIL</div>
            <Form
              value={state}
              onChangeValue={handleChangeValue}/>
          </div>
          <TimerModal
              onSubmit={handleChangeValue}
              open={timerOpen}
              handleClose={handleTimerClose}/>
          <ConversionModal
              onSubmit={handleChangeValue}
              open={conversionOpen}
              handleClose={handleConversionClose}/>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;