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

  useEffect(() => {
    if (!isSpeechEnabled || !textToSpeak) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    synth.speak(utterance);
  }, [textToSpeak, isSpeechEnabled]);

  return { synthesizeSpeech, toggleSpeechSynthesis, isSpeechEnabled };
}

export default useSpeechSynthesis;
