import AI_Chef from "../assets/logo.webp"
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from "../context/AuthContext"
export default function Header(props) {

    const handleButtonClick = (buttonName) => {
        props.setActiveButton(buttonName);
    };

    const { session, signOut } = userAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate('/signin')
    }
    return (
        <header>
            <div className="menu">
                <div className="menu-title">
                    <img src={AI_Chef} alt="AI_Chef" />
                    <h1>Nutrition Coach</h1>
                </div>
                
                <div className="avatar-wrapper">
                    <img src={AI_Chef} alt="Avatar" width="50px" tabIndex="0" />
                    <ul className="dropdown-menu">
                        <li><p>{session?.user?.email}</p></li>
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