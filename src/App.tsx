import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

function App() {
  const [clickCount, setClickCount] = useState(0);

  const playSound = () => {
    setClickCount((prev) => prev + 1);
    const utterance = new SpeechSynthesisUtterance("コンニチハ");
    utterance.lang = "ja-JP";
    utterance.rate = 9;
    utterance.pitch = 2;
    speechSynthesis.speak(utterance);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 1, sm: 2 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 2, sm: 3 },
          }}
        >
          <Card
            elevation={8}
            sx={{
              borderRadius: { xs: 2, sm: 3, md: 4 },
              width: "100%",
              maxHeight: { xs: "calc(100vh - 32px)", sm: "calc(100vh - 48px)" },
              overflow: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center", py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                  color: "#9c27b0",
                  background:
                    "linear-gradient(45deg, #9c27b0 30%, #ff4081 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hello まつぼっくり
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: { xs: 1, sm: 2, md: 3 },
                }}
              >
                <CardMedia
                  component="img"
                  image="/matsu.png"
                  alt="まつぼっくり"
                  sx={{
                    width: { xs: "80%", sm: 300, md: 400, lg: 500 },
                    height: { xs: "auto", sm: 300, md: 400, lg: 500 },
                    maxWidth: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                    transition: "transform 0.1s",
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                  onClick={playSound}
                />
              </Box>

              <Box sx={{ my: { xs: 1, sm: 2 } }}>
                <Chip
                  label={`クリック回数: ${clickCount} 回`}
                  color="primary"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.5rem" },
                    py: { xs: 2, sm: 3 },
                    px: { xs: 2, sm: 3 },
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mt: { xs: 1, sm: 2 },
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
                }}
              >
                まつぼっくりをクリックすると挨拶してくれます！
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
