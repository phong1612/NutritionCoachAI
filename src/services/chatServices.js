import { supabase } from "../SupabaseCli"
export async function loadMessages(conversationID) {
    const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationID)
        .order("created_at", { ascending: true })
    return data || []
}

export async function saveMessages(message) {
    const {error} = await supabase
        .from("messages")
        .insert(message)
    if(error) {
        throw error
    }
}

export async function saveConversation(conversation) {
    const { data, error } = await supabase
        .from("conversation")
        .insert(conversation)

    if (error) throw error

    return data
}