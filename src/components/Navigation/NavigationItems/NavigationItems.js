import React, { useContext } from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
import AuthContext from '../../../context/authContext'

const navigationItems = props => {
    const authContext = useContext(AuthContext)

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' > Burger Builder </NavigationItem>
            {authContext.isAuthanticated ? <NavigationItem link='/orders'> Orders </NavigationItem> : null}
            {!authContext.isAuthanticated
                ? <NavigationItem link='/auth' clicked={authContext.authRedirection}> Authantication </NavigationItem>
                : <NavigationItem link='/logout' clicked={authContext.logOut}> Log out </NavigationItem>
            }

        </ul>
    )
}

export default navigationItems