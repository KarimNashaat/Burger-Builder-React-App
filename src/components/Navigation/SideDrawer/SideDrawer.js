import React from 'react'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Auxilliary'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer,classes.Close]
    
    if(props.show){
        attachedClasses = [classes.SideDrawer,classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.show} backDropClick={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>  
    )
}

export default sideDrawer