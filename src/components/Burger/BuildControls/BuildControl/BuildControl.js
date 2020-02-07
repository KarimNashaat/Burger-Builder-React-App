import React, { useContext } from 'react'
import classes from './BuildControl.css'
import BuildContext from '../../../../context/buildContext' 

const buildControl = props => {
    const buildContext = useContext(BuildContext)

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}> {props.label} </div>
            
            <button className={classes.Less} 
            onClick={() => buildContext.removeIngredientHandler(props.type)}
            disabled={buildContext.disabledButtons[props.type]}> Less </button>

            <button className={classes.More} onClick={() => buildContext.addIngredientHandler(props.type)}> More </button>
        </div>
    )
}

export default buildControl