import React, {Component} from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import PushNotification from 'react-native-push-notification'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { orange_color, yellow_color } from '../globals/colors'

export default class MyTasksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    selectItem = (item) => {
        console.log(item)

        let tasks = this.props.tasks
        let index = tasks.indexOf(item)
        tasks[index] = {
            ...item,
            completed: !item.completed,
        }
        PushNotification.deleteChannel(item.title)
        PushNotification.cancelLocalNotifications({id: item.title})

        console.log(tasks)
        this.props.editTask(tasks)
    }

    render() {

        const styles = StyleSheet.create({
            title: {
                fontSize: 20,
                // fontWeight: 'bold',
                color: '#555',
                paddingLeft: 10
            },
            flatlist: {
                paddingVertical: 10,
                width: '100%',
            },
            container: {
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
                backgroundColor: '#fff',
                elevation: 3
            },
            text1: {
                fontSize: 14,
                fontWeight: 'bold',
                paddingLeft: 10
            }
        })

        return (
            <View>
            <Text style={styles.title}>My tasks</Text>
            <FlatList 
                style={styles.flatlist}
                showsVerticalScrollIndicator={false}
                data={this.props.tasks}
                keyExtractor={() => Math.random()}
                renderItem={({item}) => {
                    return (
                        <View>
                            <TouchableOpacity 
                                onLongPress={() => this.selectItem(item)}
                                onPress={() => this.props.viewTask(item)}
                                style={{
                                    ...styles.container,
                                    // borderWidth: this.state.item_id == item.title ? 2 : 1, 
                                    // borderColor: this.state.item_id == item.title ? 'orange' : '#ddd'
                                }}>
                                {!item.completed ? 
                                <FontAwesome name={'circle-o'} size={25} color={yellow_color} />
                                :
                                <FontAwesome name={'check-circle'} size={25} color={orange_color} />}
                                <Text 
                                    style={{
                                        ...styles.text1,
                                        color: !item.completed ? 'orange' : '#aaa'}}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }} />
                </View>
        )
    }
}