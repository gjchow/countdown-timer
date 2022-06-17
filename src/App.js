import React from "react";
import { useLocalStorage } from "./useLocalStorage"
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// import "./App.css";
import "./AppExtension.css";
import Form from "./form"
import Countdown from "./countdown";

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
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton></div>
            <Countdown value={state}/>
            <div className="other-text">UNTIL</div>
            <Form
              value={state}
              onChangeValue={handleChangeValue}/>
          </div>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;