import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
    .map((ingKey) => {
        return [...Array(props.ingredients[ingKey])].map((_, index) => {
            return <BurgerIngredient key= {index + ingKey} type={ingKey} />
        })
    }).reduce((arr, curr) => {
        return arr.concat(curr)
    }, [])

    if(ingredients.length === 0) {
        ingredients = <p> Please Add Ingredients </p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger