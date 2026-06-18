import { useEffect, useState } from 'react'
import IngredientList from '../AI_component/IngredientList'
import AIRecipe from '../AI_component/AIRecipe'
import { getRecipeFromMistral } from '../AI_component/AI_recipe'
import styles from './Find_recipe.module.css'
export default function Find_recipe() {
    const [ingredients, setIngredient] = useState([])
    const [loading, setLoading] = useState(false)
    function addIngredient(formData) {
        const new_ingredient = formData.get('Ingredient')
        if (new_ingredient != "") {
            setIngredient(prevIngredient => [...prevIngredient, new_ingredient])
        }
        
    }

    const [recipe, setRecipe] = useState(null)

    async function getRecipe() {
        setLoading(true);
        const AIrecipe = await getRecipeFromMistral(ingredients);
        setLoading(false);
        setRecipe(AIrecipe);
    }
    // Cycle through to provide Loading animation
    const dotFrame = ["", ".", "..", "..."];
    const [dot, setDot] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setDot(i => (i + 1) % dotFrame.length);
        }, 500);
        return () => clearInterval(interval);
    }, []);


    return (
        <main className={styles['recipe-container']}>
            <form className={styles['add-ingredient-form']} action={addIngredient}>
                <input className={styles['input_food']} 
                    type="text" 
                    placeholder="e.g. oregano"
                    aria-label='Add ingredient'
                    name="Ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <section className={styles['ingredient-process']}>
                {ingredients.length > 0 && 
                <IngredientList 
                    getRecipe={getRecipe}
                    ingredients={ingredients}
                />}
                {loading && <h1>Loading{dotFrame[dot]}</h1>}
                {recipe && <AIRecipe recipe={recipe}/>}
            </section>
        </main>
    )
}   