import React, { Component } from 'react'
import Customer from '../components/customer'
import Header from '../components/header'

export default class home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Customer/>
            </div>
        )
    }
}
