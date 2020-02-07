import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Meat", type: "meat"},
    {label: "Cheese", type: "cheese"}  
]

const buildControls = props => {
    return (

        <div className={classes.BuildControls}>
            <p>
                <strong>Current Price: {props.price.toFixed(2)}</strong>
            </p>
            {controls.map((control) => {
                return <BuildControl key={control.label} label={control.label} type={control.type} />
            })}
            <button className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.purchaseModeHandler}
            > {props.isAuthanticated ? "Order" : "Sign Up"} </button>
        </div>
    )
}

export default buildControls