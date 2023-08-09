import { useState, useEffect } from 'react';

const useSpeechRecognition = (ask) => {
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsSpeechSupported(true);
    } else {
      console.log("Browser does not support SpeechRecognition");
      setIsSpeechSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        transcript += result[0].transcript;

        if (result.isFinal) {
          setText(transcript);
          ask({ text: transcript });
        }
      }

      // Set the text with both interim and final results
      setText(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      setText('');
    };

    if (isListening) {
      recognition.start();
    } //else {
    //  recognition.stop();
   // }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const toggleListening = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsListening(prevIsListening => !prevIsListening);
    console.log('Toggle Listening');
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.altKey && event.key === 'L') {
      console.log('Speech Supported', isSpeechSupported);
      if (isSpeechSupported) {
        console.log('Toggle Ran from KeyStroke');
        toggleListening();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return { isSpeechSupported, isListening, text, toggleListening };
};

export default useSpeechRecognition;
