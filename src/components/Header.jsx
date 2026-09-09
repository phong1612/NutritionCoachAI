import AI_Chef from "../assets/logo.webp"
import { useEffect, useState } from "react"
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from "../context/AuthContext"
import { getProfile } from "../services/profileServices"
export default function Header(props) {
    const [userProfile, setUserProfile] = useState({
    avatar_url: 'https://placehold.net/avatar.png'
    });

    const handleButtonClick = (buttonName) => {
        props.setActiveButton(buttonName);
    };

    const { session, signOut } = userAuth()
    const navigate = useNavigate()

    useEffect(() => {
            const fetchUserProfile = async () => {
                try {
                    const profile = await getProfile();
                    console.log("Fetched user profile:", profile);
                    setUserProfile(profile);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            };
    
            fetchUserProfile();
        }, []);

    async function handleSignOut() {
        await signOut()
        navigate('/signin')
    }
    async function handleProfile(buttonName) {
        // props.setActiveButton(buttonName);
        navigate('/profile')
    }
    return (
        <header>
            <div className="menu">
                <div className="menu-title">
                    <img src={AI_Chef} alt="User_Profile" />
                    <h1>Nutrition Coach</h1>
                </div>
                
                <div className="avatar-wrapper">
                    <img src={userProfile.avatar_url} alt="Avatar" width="50px" tabIndex="0" />
                    <ul className="dropdown-menu">
                        <li><p>{session?.user?.email}</p></li>
                        <hr />
                        <li><button onClick={() => handleProfile('Profile')}>Profile</button></li>
                        <hr />
                        <li><button onClick={handleSignOut}>Sign Out</button></li>
                    </ul>
                </div>

            </div>
            <nav className="header-navigation">

                <button onClick={() => handleButtonClick('Calorie Calculator')}><p>Calorie Calculator</p></button>
                <button onClick={() => handleButtonClick('Find Your Recipe')}><p>Find Your Recipe</p></button>
                <button onClick={() => handleButtonClick('Voice Chat')}><p>AI Assistant</p></button>
            
            </nav>
        </header>
    )
}