import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class SelectDateButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const styles = StyleSheet.create({
            container: {
                alignSelf: 'center',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                borderRadius: 10,
                elevation: 5
            },
            button: {
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderRadius: 15,
                backgroundColor: this.props.backgroundColor
            },
            text: {
                fontSize: 16,
            }
        })

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Date: {this.props.date}</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.props.showDatePicker()}>
                    <AntDesign name='calendar' size={26} color={'#fff'} />
                </TouchableOpacity>
            </View>
        )
    }
}