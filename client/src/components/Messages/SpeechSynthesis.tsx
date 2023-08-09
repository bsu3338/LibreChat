import { useState, useEffect } from 'react';

function useSpeechSynthesis() {
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [textToSpeak, setTextToSpeak] = useState('');

  const synthesizeSpeech = (text) => {
    if (isSpeechEnabled) {
      setTextToSpeak(text);
    }
  };

  const toggleSpeechSynthesis = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
  };

    const handleKeyDown = (event) => {
    if (event.shiftKey && event.altKey && event.key === 'P') {
      toggleSpeechSynthesis();
      console.log('Toggle Text-To-Speech', isSpeechEnabled);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSpeechEnabled]);
  
  useEffect(() => {
    if (!isSpeechEnabled || !textToSpeak) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    synth.speak(utterance);
  }, [textToSpeak, isSpeechEnabled]);

  return { synthesizeSpeech, toggleSpeechSynthesis, isSpeechEnabled };
}

export default useSpeechSynthesis;
