import { useState } from 'react'
import useSpeechRecognition from '../../hooks/useSpeechRecognition'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './VoiceChat.module.css'


export default function VoiceChat() {
    const [message, setMessage] = useState([])
    const [inputText, setInputText] = useState('')
    const { transcript, isListening, startListening, stopListening, setIsListening } = useSpeechRecognition()
    const [AIResponse, setAIResponse] = useState("")
    const [usedVoice, setUsedVoice] = useState(false)


    // sync transcript into input when voice is used
    const displayText = isListening ? transcript : inputText

    async function handleSend(e) {
        if (isListening) {
            stopListening()
            setInputText(transcript)  // copy transcript into input when stopped
            setUsedVoice(true)
        }
        const textToSend = inputText.trim() || transcript.trim()
        if (!textToSend) return;

        // Add user's message to the chat
        setMessage(prev => [...prev, { role: 'user', content: textToSend }])
        setInputText('')  // clear input after sending

        // Send the message to API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: textToSend, history: message })
        });

        const data = await response.json();
        setMessage(prev => [...prev, { role: 'assistant', content: data.response }]);

        // optional: speak the response back
        if (usedVoice) {
            const utterance = new SpeechSynthesisUtterance(data.response)
            utterance.lang = 'en-US'
            window.speechSynthesis.speak(utterance)
        }
        setUsedVoice(false)
        
    }

    function handleMicButton() {
        if (isListening) {
            stopListening()
            setInputText(transcript)  // copy transcript into input when stopped
            setUsedVoice(true)
        } else {
            setInputText('')
            startListening()
            setUsedVoice(false)
        }
    }

    // reset usedVoice when user starts typing manually
    function handleInputChange(e) {
        setInputText(e.target.value)
        setUsedVoice(false)  // typing overrides voice mode
    }

    // send on Enter key
    function handleKeyDown(e) {
        if (e.key === 'Enter') handleSend()
    }

    return (
        <div className={styles["voice-chat"]}>
            <div className={styles["sous-header"]}>
                <h1>SOUS</h1>
                <p>Your AI Culinary Assistant</p>
            </div>

            <div className={styles["chat-history"]}>
                {message.length === 0 && (
                    <p className={styles["sous-msg"]}>
                        Good day. I'm SOUS, your culinary assistant. Ask me anything — 
                        from how long to rest a steak to what to make with leftover rice.
                    </p>
                )}
                {message.map((msg, i) => (
                    
                        <div key={i} className={styles[msg.role === 'user' ? 'user-msg' : 'sous-msg']}>
                            {msg.role === 'assistant' && <span className={styles["sous-tag"]}>SOUS</span>}
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                ))}
            </div>

            <div className={styles["controls"]}>
                <input className={styles['input_query']} 
                                    type="text" 
                                    placeholder={isListening ? '🎙 Listening...' : 'Ask SOUS anything...'}
                                    aria-label='Add query'
                                    name="Query"
                                    value={inputText}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleMicButton} className={styles['mic-button']} aria-label={isListening ? 'Stop recording' : 'Start recording'}>
                    {isListening ? '⏹' : '🎙'}
                </button>

                <button className={styles['send-button']} onClick={handleSend}>
                    Send to SOUS
                </button>
            </div>
        </div>
    )
}
// 
