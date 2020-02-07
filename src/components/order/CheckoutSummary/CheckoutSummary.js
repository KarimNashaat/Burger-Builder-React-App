import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import Classes from './CheckoutSummary.css'

const checkoutSummary = props => {
    return (
        <div className={Classes.CheckoutSummary}>
            <h1> Have a nice meal </h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.cancel}> Cancel </Button>
            <Button btnType='Success' clicked={props.continue}> Continue </Button> 
        </div>
    )
}

export default checkoutSummary