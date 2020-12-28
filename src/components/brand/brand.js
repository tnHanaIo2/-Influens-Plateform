import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Grid } from 'semantic-ui-react';
import _ from 'lodash'

import { db_brands } from '../../firebase'
import { setBrand } from "../../actions";

import './style.css'
import Spinner from '../spinner';
import { withRouter } from 'react-router-dom';

class Brand extends Component {
   
    componentDidMount() {

        const { setBrand } = this.props
        let ref = db_brands
        ref.on('value', brand => {
            let results = []
            results.push(brand.val())
            setBrand(results)
        })

    }

    renderBrandCard = () => {
        const { brand } = this.props
        let filteredBrand = {}
        let data = []
        if (brand && brand) {
            data = _.map(brand, (item, index) => {
                return _.map(item, (obj, indexBrand) => {
                     filteredBrand= obj
                     console.log("filteredBrand",filteredBrand)
                    return (

                        <Grid.Column key={indexBrand}>
                            <Card
                                image={obj.pic}
                                header={obj.name}
                                meta={obj.displayName}
                                description={obj.description}
                                onClick={(e) => this.showSales(e, obj.offerId) }
                            />
                        </Grid.Column>

                    )
                })

            })
        }
        return data
    }

    showSales = (e, offerId) => {
        e.stopPropagation()
        this.props.history.push(`/test/brand/${offerId}`)
    }

    render() {
        const { isLoading } = this.props
        return (
            isLoading ? <Spinner message='Chargement des marques' /> :
                <div className='wrapper__brand'>
                    <Grid columns={5} divided='vertically'>
                        <Grid.Row textAlign='justified'>
                            {this.renderBrandCard()}
                        </Grid.Row>
                    </Grid>
                </div>
        )
    }
}

const mapStateFromProps = state => ({
    brand: state.brand.brand,
    isLoading: state.brand.isLoading,
});

export default withRouter(connect(mapStateFromProps, { setBrand })(Brand))
