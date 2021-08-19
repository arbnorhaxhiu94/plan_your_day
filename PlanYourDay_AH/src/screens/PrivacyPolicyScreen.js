import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Header from '../components/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { orange_color } from '../globals/colors'
import MyButton from '../components/MyButton'

export default class PrivacyPolicyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            message: ''
        }
    }

    handleChange = (field, input) => {
        if (field == 'title') {
            this.setState({
                title: input,
            })
        } else {
            this.setState({
                message: input,
            })
        }
    }

    submit = async() => {
        if (this.state.title.length < 5) {
            alert('Title must have at least 5 letters')
            return
        } else if (this.state.message.length < 10) {
            alert('Message must have at least 5 letters')
            return
        }
        alert('Thank you for contacting us.')
        setTimeout(() => {
            this.props.navigation.goBack()
        }, 2000);
        
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
            title: {
                alignSelf: 'center',
                width: '80%',
                fontSize: 32,
                color: orange_color,
                marginVertical: 20
            },
            description: {
                alignSelf: 'center',
                width: '80%',
                fontSize: 16,
                color: '#999'
            }
        })

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header 
                    title={'Privacy Policy'} 
                    screen={'Privacy Policy'}
                    navigation={this.props.navigation} />
                <View style={{height: 20}} />
                <ScrollView 
                    style={{flex: 1, paddingVertical: 10}}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'} >
                    <Text style={styles.title}>
                        Plan your day Privacy Policy
                    </Text>
                    <Text style={styles.description}>
                        We create apps with respect to users' privacy. This app does not collect any personal data or any information about users privacy. We only request permissions for internet to save data to the database and also permission for notifications to notify you when a task is due in 1 hour.
                    </Text>
                </ScrollView>
            </View>
        )
    }
}