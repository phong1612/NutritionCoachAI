import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../SupabaseCli'
const AuthContext = createContext();

export function userAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
    const [session, setSession] = useState(undefined);

    // Sign up Function
    const signUpNewUser = async (email, password) => {
        const {data, error} = await supabase.auth.signUp( {
            email: email,
            password: password,
        });
    
        if(error) {
            console.error("There was a signing up error:", error)
            return {success: false, error};
        }
        return { success: true, data };
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, []);

    // Sign Out
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error) {
            console.error("There was an error signing out: ", error)
        }

    };

    // Sign In
    const signInUser = async (email, password) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.error("Sign in error occurred: ", error)
                return {success: false, error}
            }
            return {success: true, data}
        } catch(error) {
            console.error("An error occurred: ", error)
            return { success: false, error: err.message || "Unknown error" }
        }
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}
