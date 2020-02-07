import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import AuthContext from '../../context/authContext'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <AuthContext.Provider value={{
                    isAuthanticated: this.props.isAuthanticated,
                    logOut: this.props.logOut,
                    authRedirection: this.props.authRedirection
                }}>

                    <Toolbar menuClick={this.sideDrawerHandler} />
                    <SideDrawer show={this.state.showSideDrawer} close={this.sideDrawerHandler} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>

                </AuthContext.Provider>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthanticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.logOut()),
        authRedirection: () => dispatch(actions.authRedirect('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout)