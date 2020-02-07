import React from 'react'
import classes from './Order.css'

const order = props => {
    let order = <ul>
        {Object.keys(props.ingredients).map(ingKey => {
            return (<li style={{ textTransform: 'capitalize' }} key={ingKey}>
                {ingKey}: {props.ingredients[ingKey]}
            </li>)
        })}
    </ul>
    return (
        <div className={classes.Order}>
            <p> Ingredients: </p>
            {order}
            <p> Price <strong> {props.price} </strong> </p>
        </div>
    )
}
export default order