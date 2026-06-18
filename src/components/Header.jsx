import AI_Chef from "../assets/logo.webp"
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from "../context/AuthContext"
export default function Header(props) {

    const handleButtonClick = (buttonName) => {
        props.setActiveButton(buttonName);
    };

    const { signOut } = userAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/signin')
    }
    return (
        <header>
            <div className="title">
                <img src={AI_Chef} alt="AI_Chef" />
                <h1>Nutrition Coach</h1>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <nav className="header-navigation">

                <button onClick={() => handleButtonClick('Calorie Calculator')}><p>Calorie Calculator</p></button>
                <button onClick={() => handleButtonClick('Find Your Recipe')}><p>Find Your Recipe</p></button>
                <button onClick={() => handleButtonClick('Voice Chat')}><p>AI Assistant</p></button>
            
            </nav>
        </header>
    )
}