import React, {Component} from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default class ErrorMessage extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const styles = StyleSheet.create({
            text: {
                color: this.props.color,
                fontSize: 14,
                textAlign: 'center'
            }
        })

        return (
            <Text style={styles.text}>{this.props.error_msg}</Text>
        )
    }
}