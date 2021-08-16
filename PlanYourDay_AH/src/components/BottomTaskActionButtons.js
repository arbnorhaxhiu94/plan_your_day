import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { green_color, lightgreen_color, lightorange_color, orange_color } from '../globals/colors'

export default class BottomTaskActionButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const styles = StyleSheet.create({
            container: {
                paddingVertical: 10, 
                position: 'absolute', 
                width: '95%', 
                alignSelf: 'center',
                bottom: 0,
                flexDirection: 'row',
                borderTopWidth: 1,
                borderColor: '#ddd'
            },
            buttons: {
                borderRightWidth: 1,
                borderColor: '#ddd',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10
            },
            text: {
                color: this.props.completed ? green_color : orange_color,
                fontSize: 14,
                textAlign: 'center',
                paddingRight: 5
            },
            completedLabel: {
                position: 'absolute',
                right: 10,
                flexDirection: 'row',
                alignSelf: 'center',
                padding: 10,
                borderRadius: 10,
                backgroundColor: this.props.completed ? lightgreen_color : lightorange_color
            }
        })

        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.buttons} 
                    onPress={() => this.props.showDeleteModal()}>
                    <AntDesign name={'delete'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttons} 
                    onPress={() => this.props.editTask()}>
                    <Entypo name={'feather'} size={25} />
                </TouchableOpacity>
                <View style={{...styles.completedLabel}}>
                    <Text style={styles.text}>
                        {this.props.completed ? 'Completed' : 'Not completed'}
                    </Text>
                    {this.props.completed ?
                    <AntDesign 
                        name={'check'} 
                        size={25} 
                        color={green_color} /> : null}
                </View>
            </View>
        )
    }
}