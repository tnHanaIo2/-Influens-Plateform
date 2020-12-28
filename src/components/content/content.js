import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Image } from 'semantic-ui-react'
import ChartSale from '../chart'
import _, { result } from 'lodash'

import DataTable from './data-table'
import IMG from './img.jpg'
import { db_purchase, db_influencers } from '../../firebase'
import Brand from '../brand'
import { setStatistic, setInfluencers, setBrand } from "../../actions";
import { withRouter } from 'react-router-dom'

class Content extends Component {

    componentDidMount() {
        const { setStatistic, setInfluencers, match: { params: { offerId } } } = this.props

        let obj = {}
        let result = []

        db_purchase.child('purchase').on('value', value => {
            console.log("values of puerchase",value.val())

            for (const key in value.val()) {
                if (value.val().hasOwnProperty(key)) {
                    var element = value.val()[key];
                    if (Number(offerId) === Number(element.offerId)) {
                        obj = { ...obj, influencer: element.influencer,image:element.pic, createdAt: element.createdAt, commission: element.commission, amount: element.amount, offerId: element.offerId }
                 console.log("objet vente", obj)
                        result.push(obj)
                    }
                }
            }
        })

        let newResult = []
        let newObj = {}
        for (var index of result) {
            if (index.influencer) {
                db_influencers.child(index.influencer).child('Profil').on('value', c => {
                    newObj = { ...index, influencer: c.val() }
                    newResult.push(newObj)
                    setStatistic(newResult)

                })
            }
        }

    }

    renderData = () => {
        const { statistic, match: { params: { offerId } } } = this.props
        let filteredData = []
        if (statistic && statistic) {
            filteredData = _.filter(statistic, (o) => {
                return o.influencer != null
            })

        }
        return filteredData

    }

    renderbrandData = () => {
        const { brand, match: { params: { offerId } } } = this.props
        let filteredData = []
        if (brand && brand) {
            filteredData = _.filter(brand, (o) => {
                return o.offerId != null
            })

        }
       // console.log('filteredData', filteredData)
        return filteredData

    }

    render() {
        const { brand,influencers, isLoading } = this.props


        return (
            <>
                <Container style={{ marginTop: '7em' }}>

                    <Grid>
                        <Grid.Column width={3}>
                        <Image src={IMG} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <div>
                                    <h4>Sales Number</h4>
                                    <span>{this.renderbrandData}</span>
                                </div>
                                <div>
                                    <h4>Sales Amount</h4>
                                    <span>1055,1$</span>
                                </div>

                            </div>
                        </Grid.Column>
                        <Grid.Column width={10} textAlign='left' floated >
                            <ChartSale />
                        </Grid.Column>

                        <DataTable
                            data={this.renderData() && this.renderData()}
                            isLoading={isLoading}
                        />
                    </Grid>


                </Container>
            </>
        )
    }
}

const mapStateFromProps = state => ({
    statistic: state.statistic.statistic,
    isLoading: state.purchase.isLoading,
});

export default withRouter(connect(
    mapStateFromProps,
    { setStatistic }
)(Content))
