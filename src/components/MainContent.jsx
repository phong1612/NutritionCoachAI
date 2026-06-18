import { useEffect, useState } from 'react'


import Find_recipe from './Sub_component/Find_recipe'
import Calorie from './Sub_component/Calorie_Calculator'
import VoiceChat from './Sub_component/VoiceChat'
export default function MainContent(props) {
    let activeFeature=<Find_recipe/>
    switch(props.activeButton) {
        case "Calorie Calculator":
            activeFeature=<Calorie/>
            break
        // Incoming feature, not finished yet
        case "Voice Chat":
            activeFeature=<VoiceChat/>
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



