import Header from "./components/Header"
import MainContent from "./components/MainContent"
import { useEffect, useState } from 'react'
export default function App() {
  const [activeButton, setActiveButton] = useState('Find Your Recipe')
  return (
    <>
      <Header activeButton={activeButton} setActiveButton={setActiveButton}/>
      <MainContent activeButton={activeButton}/>
    </>
  )
}

