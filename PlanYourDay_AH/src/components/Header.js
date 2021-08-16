import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const styles = StyleSheet.create({
            container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            title: {
                fontSize: 20,
                color: '#555',
                paddingLeft: 10,
                paddingVertical: 10
            },
            button: {
                paddingRight: 10
            },
            button1: {
                paddingLeft: 10
            },
            saveButton: {
                position: 'absolute',
                right: 10,
                alignSelf: 'center'
            }
        })

        return this.props.screen == 'Main' ? (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button}>
                        <IonIcons name='notifications-outline' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Entypo name='menu' size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View style={{...styles.container, justifyContent: 'flex-start'}}>
                <TouchableOpacity 
                    style={styles.button1}
                    onPress={() => this.props.navigation.goBack()} >
                    <MaterialIcons name='arrow-back-ios' size={25} />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                {this.props.editTask ?
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => this.props.saveChanges()} >
                    <Text>Save</Text>
                </TouchableOpacity> : null}
            </View>
        )
    }
}