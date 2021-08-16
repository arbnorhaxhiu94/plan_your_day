import React, {Component} from 'react'
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Touchable } from 'react-native'
import Header from '../components/Header'
import MyButton from '../components/MyButton'
import { orange_color } from '../globals/colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDateButton from '../components/SelectDateButton'
import ErrorMessage from '../components/ErrorMessage'
import { addNewPlan } from '../redux/reducers/AddNewPlanReducer'
import { connect } from 'react-redux'
import { getMyPlans } from '../redux/reducers/MyPlansReducer'

class AddNewPlanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            title_error: '',
            description: '',
            description_error: '',
            date: new Date(),
            date_1: null,
            date_error: '',
            showDatePicker: false
        }
    }

    addTask = async() => {
        // alert('Task added')
        if (this.state.date_1 == null) {
            this.setState({
                date_error: 'Please select a date.'
            })
            return
        }
        if (this.state.title.length == 0) {
            this.setState({
                title_error: 'Title is required.'
            })
            return
        } 
        if (this.state.description.length == 0) {
            this.setState({
                description_error: 'Description is required.'
            })
            return
        }

        let tasks = []
        
        for (let i = 0; i < this.props.data?.length; i++) {
            
            if (this.state.date_1 == this.props.data[i].date) {
                tasks = this.props.data[i].tasks
                tasks.push({
                    title: this.state.title,
                    description: this.state.description,
                    completed: false
                })
                break
            }
        }

        if (tasks.length == 0) {
            tasks.push({
                title: this.state.title,
                description: this.state.description,
                completed: false
            })
        }

        await this.props.addNewPlan(this.state.date_1, tasks)

        if (this.props.data) {
            // alert('New Plan Added')
            setTimeout(() => {
                this.props.navigation.goBack()
            }, 2000);
        }
    }

    handleChange = (field, input) => {
        if (field == 'title') {
            this.setState({
                title: input,
                title_error: ''
            })
        } else {
            this.setState({
                description: input,
                description_error: ''
            })
        }
    }

    onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        // alert(currentDate)
        let date_1 = currentDate.toString().split(' ')

        let date = date_1[0]+' '+date_1[1]+' '+date_1[2]+' '+date_1[3]
        // alert(date)
        this.setState({
            date_1: date,
            date: currentDate,
            showDatePicker: false,
            date_error: ''
        })
    }

    componentWillUnmount() {
        this.props.getMyPlans()
    }

    render() {

        const styles = StyleSheet.create({
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
            <ScrollView 
                keyboardShouldPersistTaps={'always'}
                style={{flex: 1, paddingVertical: 5, backgroundColor: '#fff'}} 
                showsVerticalScrollIndicator={false} >
                <Header 
                    title={'Add new plan'} 
                    screen={'Add New Plan'}
                    navigation={this.props.navigation} />
                <View style={{height: 20}} />
                <SelectDateButton 
                    backgroundColor={orange_color}
                    date={this.state.date.toLocaleDateString()}
                    showDatePicker={() => this.setState({showDatePicker: true})} />
                {this.state.date_error !== '' ? 
                    <ErrorMessage error_msg={this.state.date_error} color={orange_color} /> :null}
                <TextInput 
                    style={styles.textinput}
                    placeholder={'Title'}
                    placeholderTextColor={'#aaa'}
                    maxLength={50}
                    onChangeText={(input) => this.handleChange('title', input) } />
                {this.state.title_error !== '' ? 
                    <ErrorMessage error_msg={this.state.title_error} color={orange_color} /> :null}
                <TextInput 
                    style={styles.textinput}
                    multiline
                    numberOfLines={10}
                    placeholder={'Title'}
                    placeholderTextColor={'#aaa'}
                    textAlignVertical={'top'}
                    maxLength={300}
                    onChangeText={(input) => this.handleChange('description', input) } />
                {this.state.description_error !== '' ? 
                    <ErrorMessage error_msg={this.state.description_error} color={orange_color} /> :null}
                {this.state.showDatePicker ? 
                <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={'date'}
                    is24Hour={true}
                    minimumDate={new Date()}
                    display="default"
                    onChange={this.onDateChange}
                /> : null}
                <View style={{height: 30}} />
                <View style={{paddingVertical: 10}}>
                    <MyButton 
                        action={() => this.addTask()}
                        backgroundColor={orange_color}
                        buttonText={'Add Task'}
                        textColor={'#fff'} />
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.addNewPlanReducer.loading,
        data1: state.addNewPlanReducer.data,
        data: state.getMyPlansReducer.data,
        error: state.addNewPlanReducer.error,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        addNewPlan: (date, tasks) => dispatch(addNewPlan(date, tasks)),
        getMyPlans: () => dispatch(getMyPlans())
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (AddNewPlanScreen)