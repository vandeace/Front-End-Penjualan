import React, { Component } from 'react'
import Data from '../components/transaction'
import Header from '../components/header'

export default class Store extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Data/>
            </div>
        )
    }
}
