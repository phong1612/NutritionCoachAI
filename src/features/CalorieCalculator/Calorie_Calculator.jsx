import { useEffect, useState } from 'react'
import CalorieDisplay from './CalorieDisplay'
import Metrics_Option from './Metrics_Option'
import styles from './Calorie.module.css'
import male from '../../assets/male.png'
import female from '../../assets/female.png'
export default function Calorie() {
    const [workout, setWorkout] = useState(1.2)
    const [calculated, setCalculated] = useState(false)
    const [calorie, setCalorie] = useState(0)

    const [gender, setGender] = useState("Male")
    const [heightUnit, setHeight] = useState("cm")
    const [weightUnit, setWeight] = useState("kg")
    let options = [
        `Don't workout`,
        `Light workout`,
        `Moderate workout`,
        `Active`,
        `Intense`
    ]

    const weightOption = [
        { label: "kg", unit: "kg" },
        { label: "lbs", unit: "lbs" }
    ]

    const heightOption = [
        { label: "cm", unit: "cm" },
        { label: "inches", unit: "inches" }
    ]

    const genderOption = [
        { label: "Male", unit:'Male', image: male },
        { label: "Female", unit: 'Female', image: female }
    ]
    const fitnessOption = [
        { label: "Don't workout", unit: 1.2},
        { label: "Light workout", unit: 1.375},
        { label: "Moderate workout", unit: 1.55},
        { label: "Active", unit: 1.725},
        { label: "Intense", unit: 1.9},
    ]


    function handleInfo(formData) {
        const weight = formData.get("Weight") || 60
        const height = formData.get("Height") || 170
        const age = formData.get('Age') || 25

        if(gender == "Male") {
            let Calorie_men = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)) * workout
            setCalorie(Math.max(0, Calorie_men))
        }
        else if(gender == "Female") {
            let Calorie_women = (655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)) * workout
            setCalorie(Math.max(0, Calorie_women))
            
        }
        setCalculated(true)
    }

    return (
        <main className={styles['calculator-container']}>
            <div>
                <form action={handleInfo} className={styles['calorie-calculator']}>
                    <Metrics_Option
                    index={1}
                    question={"What is your body weight?"}
                    type={"number"}
                    placeholder={"60"}
                    unit={weightUnit}
                    name={"Weight"}
                    onSelect={setWeight}
                    options={weightOption}
                    />

                    <Metrics_Option
                    index={2}
                    question={"What is your gender?"}
                    type={"radio"}
                    options={genderOption}
                    selected={gender}
                    onSelect={setGender}
                    name={"Gender"}
                    />

                    <Metrics_Option
                    index={3}
                    question={"What is your age?"}
                    type={"number"}
                    placeholder={"25"}
                    name={"Age"}
                    unit={'years'}
                    />

                    <Metrics_Option
                    index={4}
                    question={"What is your height?"}
                    type={"number"}
                    placeholder={"170"}
                    unit={heightUnit}
                    onSelect={setHeight}
                    name={"Height"}
                    options={heightOption}
                    />

                    <Metrics_Option
                    index={5}
                    question={"How often do you exercise per week?"}
                    options={fitnessOption}
                    selected={workout}
                    onSelect={(val) => {
                        const option = fitnessOption.find(o => o.unit === val)
                        setWorkout(option.unit)
                    }}
                    size="large"
                    />

                    <button className={styles['submit-button']} type="submit">Calculate the daily calorie intake</button>
                </form>
                {calculated && <CalorieDisplay calorie={calorie} />}
            </div>
            <nav className={styles['disclaimer-container']}>
                <p className={styles['disclaimer']}>*Disclaimer: This calculator provides an estimate of your daily calorie needs based on the information you provide. Individual calorie requirements may vary based on factors such as metabolism, muscle mass, and overall health. For personalized advice, consider consulting with a registered dietitian or healthcare professional.</p>
            </nav>
        </main>
    )
}