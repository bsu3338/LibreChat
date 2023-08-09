import { useState, useEffect } from 'react';
import useSpeechRecognition from '../Input/SpeechRecognition';

function useSpeechSynthesis() {
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isAutoListen, setIsAutoListen] = useState(false);
  const [textToSpeak, setTextToSpeak] = useState('');
  // const { isSpeechSupported, isListening, toggleListening } = useSpeechRecognition();

  const synthesizeSpeech = (text) => {
    setTextToSpeak(text);
  };

  const toggleSpeechSynthesis = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    console.log('Toggle Text-To-Speech', !isSpeechEnabled);
  };

  const toggleAutoListen = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    console.log('Toggle Text-To-Speech', !isSpeechEnabled);
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.altKey && event.key === 'P') {
      toggleSpeechSynthesis();
    }
    if (event.shiftKey && event.altKey && event.key === 'O') {
      toggleAutoListen();
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
