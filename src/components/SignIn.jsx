import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import { userAuth } from '../context/AuthContext'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const { session, signInUser } = userAuth()
    const navigate = useNavigate()
    console.log(session)
    console.log(email, password)

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const result = await signInUser(email, password)
            console.log(result)
            if (!result.success) {
                setError(result.error?.message)
                return
            }

            navigate('/Dashboard')
        } catch (err) {
            setError('An error occurred: ');
        } finally {
            setLoading(false)
        }
    };

    return (
        <form className='SignIn_SignUp-container' onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            

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
                <button type="submit">Sign In</button>
                <p> Don't have an account? <Link to='/signUp'>Sign Up</Link></p>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </form>
    )
}
