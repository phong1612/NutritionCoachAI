import { useState, useEffect, useRef } from 'react';

export default function useSpeechRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error('Speech Recognition API not supported');
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcriptArray = Array.from(event.results)
                                        .map(result => result[0].transcript).join(' ');
            setTranscript(transcriptArray);
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
        }

        recognition.onend = () => setIsListening(false)
        recognitionRef.current = recognition;
    }, [])

    function startListening() {
        setTranscript('');
        recognitionRef.current?.start()
        setIsListening(true);
    }

    function stopListening() {
        recognitionRef.current?.stop()
        setIsListening(false);
    }
    
    return { transcript, isListening, startListening, stopListening, setIsListening };
}