import React from 'react'
import Aux from '../../../hoc/Auxilliary'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    const ingredients = props.ingredients
    const listElements = Object.keys(ingredients).map((ing) => {
        return <li key={ing}> <span style={{ textTransform: 'capitalize' }}> {ing} </span> : {ingredients[ing]} </li>
    })

    return (
        <Aux>
            <h3>
                Your Order
            </h3>
            <p>
                Burger sandwich with:
            </p>
            <ul>
                {listElements}
            </ul>

            <h3> Total Price: {props.price.toFixed(2)}$</h3>
            <Button clicked={props.backDropClick} btnType={'Danger'}> Cancel </Button>
            <Button clicked={props.purchaseCompleted} btnType={'Success'}> Checkout </Button>
        </Aux>
    )
}

export default orderSummary