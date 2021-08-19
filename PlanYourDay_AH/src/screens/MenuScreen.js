import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { orange_color } from '../globals/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class MenuScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: false
        }
    }

    setNotifications = async() => {
        if (this.state.notifications) {
            this.setState({
                notifications: false
            })
            await AsyncStorage.setItem('notifications', 'false')
        } else {
            this.setState({
                notifications: true
            })
            await AsyncStorage.setItem('notifications', 'true')
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('notifications')
            .then((data) => {
                // alert(data)
                this.setState({
                    notifications: data == 'true' ? true : false
                })
            })
    }

    render() {

        const styles = StyleSheet.create({
            text: {
                color: this.props.color,
                fontSize: 14,
                textAlign: 'center'
            },
            itemContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 10
            },
            itemText: {
                fontSize: 16,
                color: '#555'
            }
        })

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header 
                    title={'Settings'} 
                    screen={'Settings'}
                    navigation={this.props.navigation} />
                <View style={{height: 20}} />
                <ScrollView 
                    style={{flex: 1,}}
                    showsVerticalScrollIndicator={false} >
                    <TouchableOpacity 
                        style={styles.itemContainer}
                        onPress={() => this.props.navigation.navigate('PrivacyPolicyScreen')} >
                        <Text style={styles.itemText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.itemContainer}
                        onPress={() => this.props.navigation.navigate('ContactUsScreen')} >
                        <Text style={styles.itemText}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.itemContainer}
                        onPress={() => this.setNotifications()} >
                        <Text style={styles.itemText}>Notifications</Text>
                        {this.state.notifications ? 
                        <FontAwesome name={'toggle-on'} size={30} color={orange_color} />
                        : 
                        <FontAwesome name={'toggle-off'} size={30} color={orange_color} />}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}