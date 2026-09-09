import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import { userAuth } from '../context/AuthContext.jsx'
import {supabase} from '../SupabaseCli'
import { saveProfile } from '../services/profileServices.js'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const { session, signUpNewUser } = userAuth()
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(confirmPassword !== password) {
            setError('Password do not match!')
            return;
        }
        
        setLoading(true)
        setError('')
        try {
            const result = await signUpNewUser(email, password) // result: {success, data} or {success, error}

            if (result.success) {
                // Save user profile after successful sign-up
                console.log(result)
                const user = result.data.user;
                const newProfile = {
                    id: user.id,
                    email: user.email,
                    full_name: '',
                    username: ''
                };

                try {
                    await saveProfile(newProfile);
                    console.log('User profile saved successfully');
                } catch(error) {
                    console.error('Error saving user profile:', error);
                }

                navigate('/signIn')
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false)
        }
    };

    return (
        <form className='SignIn_SignUp-container' onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <p> Already have an account? <Link to='/signIn'>Sign In</Link></p>

            <div className='register-container'>
                <input 
                    type="email" 
                    placeholder="Email" 
                    name='' 
                    id='' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name='' 
                    id='' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    name='' 
                    id='' 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </form>
    )
}
