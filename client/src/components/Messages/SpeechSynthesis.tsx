import { useState, useEffect } from 'react';

function useSpeechSynthesis(text) {
  const [isEnabled, setIsEnabled] = useState(false);
  console.log('SpeechSynth',text);
  useEffect(() => {
    const speak = () => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    };

    const handleKeyDown = (event) => {
      if (event.shiftKey && event.altKey && event.key === 'P') {
        setIsEnabled((prevEnabled) => !prevEnabled);
        console.log('Text to Speech', isEnabled);
        if (!isEnabled) {
          speak();
        }
      }
    };

    if (isEnabled) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [text, isEnabled]);
}

export default useSpeechSynthesis;
