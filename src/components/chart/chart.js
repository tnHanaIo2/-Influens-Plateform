import React, { Component } from 'react'
import Chart from 'chart.js';

import './style.css'

export default class ChartSale extends Component {

    componentDidMount() {
        var ctx = document.getElementById('myChart');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Sales',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]
            },

            // Configuration options go here
            options: {}
        })
    }

    render() {
        return (
            <>
                <canvas id="myChart" ></canvas>
            </>
        )
    }
}
