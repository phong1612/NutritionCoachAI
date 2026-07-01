import { supabase } from "../SupabaseCli";

export async function getProfile() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Not logged in");

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) throw error;

    return data;
}

export async function updateProfile(userId, profileData) {
    const { data, error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", userId);

    if (error) throw error;

    return data;
}

export async function saveProfile(profileData) {
    const { data, error } = await supabase
        .from("profiles")
        .upsert([profileData]);

    if (error) throw error;

    return data;
}