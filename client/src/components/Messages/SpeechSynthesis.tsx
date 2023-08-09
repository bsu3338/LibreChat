import { useState, useEffect } from 'react';

function useSpeechSynthesis() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [textToSpeak, setTextToSpeak] = useState('');

  const synthesizeSpeech = (text) => {
    setTextToSpeak(text);
  };

  useEffect(() => {
    const speak = () => {
      if (!isEnabled) return; // Don't speak if isEnabled is false
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      synth.speak(utterance);
    };

    const handleKeyDown = (event) => {
      if (event.shiftKey && event.altKey && event.key === 'P') {
        console.log('Speech Toggle', isEnabled);
        setIsEnabled((prevEnabled) => {
          const newState = !prevEnabled;
          if (newState) {
            speak(); // Speak if isEnabled is being set to true
          }
          return newState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [textToSpeak, isEnabled]);

  return { synthesizeSpeech };
}

export default useSpeechSynthesis;
