import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

import firebase from "../../firebase";
import { clearUser } from "../../actions";
import { connect } from 'react-redux';

import HeaderTest from '../header'
import Footer from '../footer';
import Content from '../content';

import { db_purchase } from '../../firebase'
import { setPurchase } from "../../actions";
import Brand from '../brand';

class Home extends React.Component {
    state = {

    }
    componentDidMount() {
        const { setPurchase } = this.props
        const ref = db_purchase
        ref.on('value', purchase => {
            console.log('data', purchase)
            let results = []
            results.push(purchase.val())
            setPurchase(results)
        })
    }

    handleSignout = (event) => {
        event.preventDefault()

        firebase
            .auth()
            .signOut()
            .then(() => console.log("signed out!"));
        this.props.clearUser();
        localStorage.removeItem('user')
        window.location.reload()
    }

    render() {
        return (
            <>
                <Brand />
                <Footer />

            </>
        )
    }

}



export default connect(
    null,
    { clearUser, setPurchase }
)(Home)
