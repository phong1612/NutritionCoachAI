import MainContent from "./MainContent"
import Header from "./Header"
import { useEffect, useState } from 'react'
export default function Dashboard() {
    const [activeButton, setActiveButton] = useState('Find Your Recipe')
    return (
        <>
            <Header activeButton={activeButton} setActiveButton={setActiveButton}/>
            <MainContent activeButton={activeButton}/>
        </>
    )
}