import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

export default class MyButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const styles = StyleSheet.create({
            button: {
                alignSelf: 'center',
                width: '90%',
                borderRadius: 15,
                paddingVertical: 8,
                backgroundColor: this.props.backgroundColor
            },
            text: {
                color: this.props.textColor,
                fontSize: 16,
                textAlign: 'center'
            }
        })

        return (
            <View style={{
                ...styles.button, 
                elevation: 3, 
                borderColor: this.props.borderColor ? this.props.borderColor : this.props.backgroundColor,
                borderWidth: 1}}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.props.action()}>
                    <Text style={styles.text}>{this.props.buttonText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}