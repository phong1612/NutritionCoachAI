import { supabase } from "../SupabaseCli"
export async function loadMessages(userId) {
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })

    if (error) throw error
    return data
}

export async function saveMessages(message) {
    const {error} = await supabase
        .from("messages")
        .insert(message)
    if(error) {
        throw error
    }
}