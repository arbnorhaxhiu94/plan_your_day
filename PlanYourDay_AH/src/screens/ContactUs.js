import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Header from '../components/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { orange_color } from '../globals/colors'
import MyButton from '../components/MyButton'

export default class ContactUs extends Component {
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
            itemText: {
                fontSize: 16,
                color: '#555'
            },
            textinput: {
                width: '90%',
                alignSelf: 'center',
                marginVertical: 10,
                backgroundColor: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                elevation: 5,
                color: '#111',
                fontSize: 16
            }
        })

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header 
                    title={'Contact Us'} 
                    screen={'Contact Us'}
                    navigation={this.props.navigation} />
                <View style={{height: 20}} />
                <ScrollView 
                    style={{flex: 1, paddingVertical: 10}}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'} >
                    <TextInput 
                        style={styles.textinput}
                        placeholder={'Title'}
                        placeholderTextColor={'#aaa'}
                        maxLength={50}
                        onChangeText={(input) => this.handleChange('title', input) } />
                    <TextInput 
                        multiline
                        numberOfLines={10}
                        textAlignVertical={'top'}
                        style={styles.textinput}
                        placeholder={'Message'}
                        placeholderTextColor={'#aaa'}
                        maxLength={50}
                        onChangeText={(input) => this.handleChange('message', input) } />
                    <View style={{paddingVertical: 10}}>
                        <MyButton 
                            action={this.submit}
                            buttonText={'Send'}
                            backgroundColor={orange_color}
                            textColor={'#fff'} />
                    </View>
                    
                </ScrollView>
            </View>
        )
    }
}