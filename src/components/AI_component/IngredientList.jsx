import { useState } from 'react'
import styles from '../Sub_component/Find_recipe.module.css'
export default function IngredientList(props) {
    const ingredientsListItems = props.ingredients.map((ingredient) => {
        return <li key={ingredient}>{ingredient}</li>
    })

    return (
        <section className={styles['ingredients-container']}>
            {<h2>Ingredients on hand:</h2>}
            <ul className={styles['ingredients-list']}>
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 3 && 
            <div  className={styles['get-recipe-container']}>
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}