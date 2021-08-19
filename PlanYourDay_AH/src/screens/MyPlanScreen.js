import React, {Component} from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, Button } from 'react-native'
import BottomTaskActionButtons from '../components/BottomTaskActionButtons'
import DeleteTaskModal from '../components/DeleteTaskModal'
import ErrorMessage from '../components/ErrorMessage'
import Header from '../components/Header'
import { orange_color } from '../globals/colors'
import firestore from '@react-native-firebase/firestore';
import { user_id } from '../globals/set_get_user_id'
import { connect } from 'react-redux'
import { getMyPlans } from '../redux/reducers/MyPlansReducer'
import { editPlan } from '../redux/reducers/EditPlanReducer'
import PushNotification from 'react-native-push-notification'

class MyPlanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: false,
            deleteModal: false,
            title: '',
            title_error: '',
            description: '',
            description_error: '',
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

    editTask = () => {
        this.setState({
            editable: this.state.editable ? false : true
        })
    }

    showDeleteModal = () => {
        this.setState({
            deleteModal: true
        })
    }

    hideDeleteModal = () => {
        this.setState({
            deleteModal: false
        })
    }

    deleteTask = async() => {
        let tasks = this.props.route?.params?.tasks

        // alert(tasks)
        // return
        if (tasks.length == 1) {
            firestore()
                .collection('plans')
                .doc(user_id+this.props?.route?.params?.date)
                .delete()
                .then(() => {
                    this.props.getMyPlans()
                    setTimeout(() => {
                        this.props.navigation.goBack()
                    }, 2000);
                    PushNotification.deleteChannel(this.props?.route?.params?.task?.title)
                    PushNotification.cancelLocalNotifications({id: this.props?.route?.params?.task?.title})
                    alert('Task deleted successfully.');
                })
                .catch((e) => alert(e))
        } else {
            let index = tasks.indexOf(this.props.route?.params?.task)
            tasks.splice(index, 1)
            await this.props.editPlan(this.props.route?.params?.date, tasks)
            if (this.props.success) {
                alert('Task deleted successfully.')
            } else if (this.props.error) {
                alert(this.props.error)
            }
            this.props.getMyPlans()
            setTimeout(() => {
                this.props.navigation.goBack()
            }, 2000);
        }
    }

    saveChanges = async() => {

        let tasks = this.props.route?.params?.tasks
        let index = tasks.indexOf(this.props.route?.params?.task)
        tasks[index] = {
            title: this.state.title !== '' ? this.state.title : this.props.route?.params?.task?.title,
            description: this.state.description !== '' ? this.state.description : this.props?.route?.params?.task?.description,
            completed: false,
        }

        console.log(tasks)
        await this.props.editPlan(this.props.route?.params?.date, tasks)
        if (this.props.success) {
            alert('Changes saved successfully.')
        } else if (this.props.error) {
            alert(this.props.error)
        }
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
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView 
                    keyboardShouldPersistTaps={'always'} >
                    <Header 
                        title={'Task details'} 
                        screen={'MyPlan'}
                        navigation={this.props.navigation}
                        editTask={this.state.editable}
                        saveChanges={this.saveChanges} />
                    {this.state.editable ? 
                    <ErrorMessage 
                        error_msg={'Edit task'}
                        color={orange_color} />
                    : null}
                    <TextInput 
                        style={styles.textinput}
                        editable={this.state.editable}
                        placeholder={'Title'}
                        placeholderTextColor={'#aaa'}
                        maxLength={50}
                        value={this.state.title !== '' ? this.state.title : this.props?.route?.params?.task?.title}
                        onChangeText={(input) => this.handleChange('title', input) } />
                    {this.state.title_error !== '' ? 
                        <ErrorMessage error_msg={this.state.title_error} color={orange_color} /> :null}
                    <TextInput 
                        style={styles.textinput}
                        editable={this.state.editable}
                        multiline
                        numberOfLines={10}
                        placeholder={'Title'}
                        placeholderTextColor={'#aaa'}
                        textAlignVertical={'top'}
                        maxLength={300}
                        value={this.state.description !== '' ? this.state.description : this.props?.route?.params?.task?.description}
                        onChangeText={(input) => this.handleChange('description', input) } />
                    {this.state.description_error !== '' ? 
                    <ErrorMessage error_msg={this.state.description_error} color={orange_color} /> :null}
                </ScrollView>
                <DeleteTaskModal 
                    showModal={this.state.deleteModal}
                    hideDeleteModal={this.hideDeleteModal}
                    deleteTask={this.deleteTask} />
                <BottomTaskActionButtons 
                    editTask={this.editTask}
                    showDeleteModal={this.showDeleteModal}
                    completed={this.props?.route?.params?.task?.completed} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.getMyPlansReducer.data,
        success: state.editPlanReducer.success,
        error: state.editPlanReducer.error,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        getMyPlans: () => dispatch(getMyPlans()),
        editPlan: (date, tasks) => dispatch(editPlan(date, tasks))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MyPlanScreen)