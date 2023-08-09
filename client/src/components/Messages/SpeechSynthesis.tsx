import { useEffect } from 'react';

function useSpeechSynthesis(text) {
  useEffect(() => {
    const speak = () => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    };

    const handleKeyDown = (event) => {
      if (event.shiftKey && event.altKey && event.code === 'KeyP') {
        speak();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [text]);
}

export default useSpeechSynthesis;
