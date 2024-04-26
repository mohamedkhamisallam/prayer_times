
import { CssBaseline, ThemeProvider,  createTheme } from '@mui/material'
import './App.css'
import MainContent from './Components/MainContent'
import { useState } from 'react'
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { green, red, teal } from '@mui/material/colors';

function App() {
  
  const [dark, setdark] = useState('light')

  const darkmode=()=>{
       dark==='light'?setdark('dark'):setdark('light');
  }
  const darkTheme = createTheme({
    typography:{
      fontFamily:"IBM Plex Sans Arabic, sans-serif "
    },
    mode:'dark',
    palette:{
      mode:dark,
      // common: {
      //   black: green[800],
      //   white:green[500]
      // }
    }
    
    
    
  });

  const lightTheme = createTheme({
    typography:{
      fontFamily:"IBM Plex Sans Arabic, sans-serif "
    },
    mode:'light',
    palette:{
      mode:dark,
      // primary: {
      //   main: red[500],
        
      // }
    }
    
    
    
  });
  
  
  return (
  
    <>
    <ThemeProvider theme={dark==='dark' ? darkTheme : lightTheme}>
    <CssBaseline />
    <div className=' flex justify-center mt-5 mb-5 sticky top-2 right-0 left-0 '>
    <button 
    
    onClick={darkmode}
    className=   {   dark==='light'?"bg-black text-white adjust flex justify-around min-w-[15%] rounded-full items-center  ":"   bg-white text-black adjust flex justify-around min-w-[15%] rounded-full items-center"  } > 
    {dark==='dark'? <><  FaToggleOn   /><h5>ligth mode</h5></>: <><  FaToggleOff   /><h5>dark mode</h5></>}
   
   
</button>
   

    </div>
    
    <MainContent/>
    </ThemeProvider>
    
    </>
    
    
    
  )
}

export default App


// import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material/Box';
// import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
// // import Brightness4Icon from '@mui/icons-material/Brightness4';
// // import Brightness7Icon from '@mui/icons-material/Brightness7';
// import MainContent from './Components/MainContent';
// import { FaToggleOff, FaToggleOn } from "react-icons/fa";

// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

// function MyApp() {
//   const theme = useTheme();
//   const colorMode = React.useContext(ColorModeContext);
//   return (
//     <Box
      
//     >
//       {theme.palette.mode} mode
//       <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
//         {theme.palette.mode === 'dark' ? <  FaToggleOn  />: <FaToggleOff />}
//       </IconButton>
//       <MainContent/>
//     </Box>
//   );
// }

// export default function ToggleColorMode() {
//   const [mode, setMode] = React.useState('light');
//   const colorMode = React.useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//       },
//     }),
//     [],
//   );

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode],
//   );

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <MyApp />
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
// import { amber, deepOrange, grey } from '@mui/material/colors';
// import MainContent from './Components/MainContent';

// const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     primary: {
//       ...amber,
//       ...(mode === 'dark' && {
//         main: amber[300],
//       }),
//     },
//     ...(mode === 'dark' && {
//       background: {
//         default: deepOrange[900],
//         paper: deepOrange[900],
//       },
//     }),
//     text: {
//       ...(mode === 'light'
//         ? {
//             primary: grey[900],
//             secondary: grey[800],
//           }
//         : {
//             primary: '#fff',
//             secondary: grey[500],
//           }),
//     },
//   },
// });

// function MyApp() {
//   const theme = useTheme();
//   return (
//     <Box
      
//     >
//       This is a {theme.palette.mode} mode theme with custom palette
//       <MainContent/>
//     </Box>
    
//   );
// }

// const darkModeTheme = createTheme(getDesignTokens('dark'));

// export default function DarkThemeWithCustomPalette() {
//   return (
//     <ThemeProvider theme={darkModeTheme}>
//       <MyApp />
//     </ThemeProvider>
//   );
// }