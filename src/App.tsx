import { useState } from "react";
import "./App.css";
import { Layout } from "./components/Layout";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { ContentArea } from "./components/ContentArea";
import { Title } from "./components/Title";
import { PineconeImage } from "./components/PineconeImage";
import { InfoText } from "./components/InfoText";
import { BottomGradient } from "./components/BottomGradient";

function App() {
  const [isPressed, setIsPressed] = useState(false);

  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance("コンニチハ");
    utterance.lang = "ja-JP";
    utterance.rate = 1.2;
    utterance.pitch = 1.3;
    speechSynthesis.speak(utterance);
  };

  return (
    <Layout>
      <BackgroundPattern />

      <ContentArea>
        <Title />

        <PineconeImage
          isPressed={isPressed}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          onClick={playSound}
        />

        <InfoText />
      </ContentArea>

      <BottomGradient />
    </Layout>
  );
}

export default App;
