import React, {Component} from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Header from '../components/Header'

export default class MyPlanCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item_id: null
        }
    }

    selectItem = (item) => {
        console.log(item)
        this.setState({
            item_id: item.date
        })

        this.props.selectItem(item)
    }

    render() {

        const styles = StyleSheet.create({
            flatlist: {
                paddingVertical: 10,
                width: '100%',
            },
            container: {
                width: 70,
                height: 80,
                paddingVertical: 5,
                borderRadius: 25,
                justifyContent: 'space-around',
                alignItems: 'center',
                marginHorizontal: 10
            },
            text1: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        })

        return (
            <FlatList 
                style={styles.flatlist}
                horizontal={true}
                keyExtractor={({item}) => Math.random()}
                showsHorizontalScrollIndicator={false}
                data={this.props.data}
                renderItem={({item}) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity 
                                onPress={() => this.selectItem(item)}
                                style={{
                                    ...styles.container,
                                    borderWidth: this.state.item_id == item.date ? 2 : 1, 
                                    borderColor: this.state.item_id == item.date ? 'orange' : '#ddd'
                                }}>
                                <Text 
                                    style={{
                                        ...styles.text1,
                                        color: this.state.item_id == item.date ? 'orange' : '#aaa'}}>{item.date.split(' ')[0]}</Text>
                                <Text style={{
                                        ...styles.text1,
                                        color: this.state.item_id == item.date ? 'orange' : '#555'}}>{item.date.split(' ')[2]}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }} />
        )
    }
}