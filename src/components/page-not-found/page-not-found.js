import React from 'react'
import { Link } from 'react-router-dom'

import IMAGE from './images/bg3.jpeg'

import './style.css'

export default function PageNotFound() {


    return (
        <>
            <div class="container__page__not__found">
                <img class="ops" src={IMAGE} />
                <br />
                <h3 className='text__not__found'>
Influens Network - Paris

        <br /> Agence digitale des influenceurs.</h3>
                <br />
                <Link className='buton__for__not__found' to={'/test/home'}>Accueil</Link>
            </div>
        </>
    )
}
