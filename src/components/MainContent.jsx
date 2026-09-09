import { useEffect, useState } from 'react'


import Find_recipe from '../features/FindYourRecipe/Find_recipe'
import Calorie from '../features/CalorieCalculator/Calorie_Calculator'
import ChatUI from '../features/AIAssistant/AIAssistant'
export default function MainContent(props) {
    let activeFeature=<Find_recipe/>
    switch(props.activeButton) {
        case "Calorie Calculator":
            activeFeature=<Calorie/>
            break
        // Incoming feature, not finished yet
        case "Voice Chat":
            activeFeature=<ChatUI/>
            break
        default:
            activeFeature=<Find_recipe/>
            break
    }
    
    return(
        <>
            {activeFeature}
        </>
    )
    
}



