import { useEffect } from 'react';
import useSpeechRecognition from './SpeechRecognition';
import useSpeechSynthesis from '../Messages/SpeechSynthesis';

const handleGlobalKeyDown = (event) => {
  const { toggleListening } = useSpeechRecognition();
  const { toggleSpeechSynthesis } = useSpeechSynthesis();

  
  if (event.shiftKey && event.altKey) {
    if (event.key === 'L') {
      // Logic related to speech recognition
      toggleSpeechRecognition();
    }
    if (event.key === 'P') {
      // Logic related to speech synthesis
      toggleSpeechSynthesis();
    }
    if (event.key === 'O') {
      // Other logic as needed
      //toggleAutoListen();
    }
  }
};

// Inside a component or higher-order function:
useEffect(() => {
  window.addEventListener('keydown', handleGlobalKeyDown);

  return () => {
    window.removeEventListener('keydown', handleGlobalKeyDown);
  };
}, []);
