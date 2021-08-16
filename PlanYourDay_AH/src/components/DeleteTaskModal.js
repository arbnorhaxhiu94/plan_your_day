import React, {Component} from 'react'
import { View, Text, Button, StyleSheet, Modal } from 'react-native'
import { orange_color } from '../globals/colors'
import MyButton from './MyButton'

export default class DeleteTaskModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const styles = StyleSheet.create({
            modal: {
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0, 0.7)'
            },
            text: {
                color: this.props.color,
                marginBottom: 20,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
            },
            container: {
                width: '80%',
                paddingVertical: 20,
                backgroundColor: '#fff',
                borderRadius: 20
            }
        })

        return (
            <Modal 
                style={{flex: 1}}
                animationType={'fade'}
                transparent={true}
                visible={this.props.showModal}
                onRequestClose={() => this.props.hideDeleteModal()} 
            >
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Delete task ?</Text>
                        <View style={{flexDirection: 'row', width: '100%'}}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <MyButton 
                                    action={() => this.props.hideDeleteModal()}
                                    buttonText={'Cancel'}
                                    backgroundColor={'#fff'}
                                    borderColor={orange_color}
                                    textColor={orange_color} />
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <MyButton 
                                    action={() => this.props.deleteTask()}
                                    buttonText={'Delete'}
                                    backgroundColor={orange_color}
                                    textColor={'#fff'} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}