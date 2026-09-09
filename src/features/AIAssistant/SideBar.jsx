import { useState, useEffect } from 'react'
import { userAuth } from '../../context/AuthContext'
import { supabase } from '../../SupabaseCli'
import styles from './AIAssistant.module.css'

export default function Sidebar({ conversations, setConversations, activeConversationId, onSelectConversation, onNewChat }) {
    const { session } = userAuth()
    const user = session?.user
    useEffect(() => {
        // load list of past conversations from supabase
        async function loadConversations() {
            const { data } = await supabase
                .from('conversation')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
            setConversations(data || [])
        }
        loadConversations()
    }, [activeConversationId])

    return (
        <div className={styles["sidebar"]}>
            <button onClick={onNewChat}>New Chat +</button>
            {conversations.map(convo => (
                <p 
                    key={convo.id}
                    onClick={() => onSelectConversation(convo.id)}
                    className={convo.id === activeConversationId ? 'active' : ''}
                >
                    {convo.title || 'Untitled Chat'}
                </p>
            ))}
        </div>
    )
}