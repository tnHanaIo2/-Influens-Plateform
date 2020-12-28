import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import firebase, { db_purchase, db_influencers } from '../../firebase'


class SalesStatistic extends Component {
    componentDidMount() {
        const { match: { params: { offer_id } } } = this.props
        const ref = db_purchase.child(offer_id).on('value', value => {
            console.log(value.val())
        })


    }

    render() {
        return (
            <>

            </>
        )
    }
}

export default withRouter(SalesStatistic)
