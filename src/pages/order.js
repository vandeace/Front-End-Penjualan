import React, { Component } from 'react'
import Data from '../components/order'
import Header from '../components/header'

export default class home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Data/>
            </div>
        )
    }
}
