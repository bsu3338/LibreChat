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
        console.log('Speech Toggle');
        setIsEnabled((prevEnabled) => {
          const newState = !prevEnabled;
          if (!newState) {
            speak();
          }
          return newState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [text, isEnabled]);
}

export default useSpeechSynthesis;
