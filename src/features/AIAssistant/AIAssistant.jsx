import { useState, useEffect } from 'react'
import SideBar from './SideBar'
import ChatUI from './ChatUI'
import styles from './AIAssistant.module.css'


export default function AIAssistant() {
    const [activeConversationId, setActiveConversationId] = useState(null)
    const [conversations, setConversations] = useState([]);

    function handleConversationCreated(newConversation) {
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
    }

    return (
        <div className={styles["ai-wrapper"]}>
            <SideBar 
                conversations={conversations}
                setConversations={setConversations}
                activeConversationId={activeConversationId}
                onSelectConversation={setActiveConversationId}
                onNewChat={() => setActiveConversationId(null)}
            />
            <ChatUI conversationId={activeConversationId} 
                    onConversationCreated={handleConversationCreated}/>
        </div>
    )
}