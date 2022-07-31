import { AppBar, CssBaseline, Toolbar, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { spacing } from '@mui/system';
import { Howl } from 'howler';
import React from 'react';
import Matubokkuri from './assets/matubokkuri.png';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50'
      }
    },
  });

  const hello_sound = new Howl({
    src: ['./assets/hello.mp3'],
    onplay: ()=>{
      console.log("サウンド再生!!");
    },
    onstop: ()=>{
      console.log("サウンド停止!!");
    },
    onpause: ()=>{
      console.log("サウンド一時停止!!");
    },
    onend: ()=>{
      console.log("サウンド終了!!");
    }
  });

  const react_matubokkuri = () => {
    hello_sound.play();
    alert("\\ｺﾝﾆﾁﾊ/");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              こんにちは
            </Typography>
          </Toolbar>
        </AppBar>
      <Container fixed sx={{ mt: 6 }} >
        <img src={Matubokkuri}  alt="松ぼっくり" onClick={react_matubokkuri}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
