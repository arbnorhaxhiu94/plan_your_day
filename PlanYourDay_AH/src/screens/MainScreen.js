import React, {Component} from 'react'
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Header from '../components/Header'
import MyButton from '../components/MyButton'
import MyPlanCalendar from '../components/MyPlansCalendar'
import MyTasksList from '../components/MyTasksList'
import { orange_color } from '../globals/colors'
import { editPlan } from '../redux/reducers/EditPlanReducer'

class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timer: null,
            count: 0,
            tasks: null,
            date: null,
            interval: null
        }
    }

    selectItem = (item) => {
        this.setState({
            date: item.date,
            tasks: item.tasks
        })
    }

    viewTask = (item) => {
        this.props.navigation.navigate('MyPlanScreen', {
            tasks: this.state.tasks, 
            task: item, 
            date: this.state.date,
        })
    }

    editTask = (task) => {
        this.props.editPlan(this.state.date, task)
    }

    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                if (this.props.data) {
                    this.setState({
                        date: this.props.data[0]?.date,
                        tasks: this.props.data[0]?.tasks
                    })
                    clearInterval(this.state.interval)
                }
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    render() {

        const styles = StyleSheet.create({
            title: {
                fontSize: 20,
                color: '#555',
                paddingLeft: 10
            },
        })

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header 
                    title={'Plan your day'} 
                    screen={'Main'}
                    navigation={this.props.navigation}
                    goToMenu={() => this.props.navigation.navigate('MenuScreen')} />
                {this.props.loading ? 
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size={25} color={orange_color} />
                </View>
                : this.props.data?.length == 0 ?
                <View style={{flex: 1, paddingVertical: 20}}>
                    <ErrorMessage 
                        color={'orange'}
                        error_msg={'You have no plans.'} />
                </View>
                : this.props.data ?
                <View style={{marginTop: 15}}>
                    <Text style={styles.title}>Calendar</Text>
                    <MyPlanCalendar 
                        data={this.props.data}
                        selectItem={this.selectItem} />
                </View>
                : this.props.error ?
                <View style={{flex: 1}}>
                    <ErrorMessage 
                        color={'red'}
                        error_msg={this.props.error} />
                </View> : 
                <View style={{flex: 1}}>
                    <ErrorMessage 
                        color={'red'}
                        error_msg={'Something went wrong.'} />
                </View>}
                <View style={{flex: 5}}>
                    {this.props.loading1 || this.props.loading ? 
                    <ActivityIndicator size={25} color={orange_color} />
                    : this.props.data?.length !== 0 ?
                    <MyTasksList 
                        tasks={this.state.tasks}
                        viewTask={this.viewTask}
                        editTask={this.editTask} /> : null}
                </View>
                <View style={{paddingVertical: 20}}>
                    <MyButton 
                        action={() => this.props.navigation.navigate('AddNewPlanScreen')}
                        backgroundColor={orange_color}
                        buttonText={'Add a New Task'}
                        textColor={'#fff'} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.getMyPlansReducer.loading,
        data: state.getMyPlansReducer.data,
        error: state.getMyPlansReducer.error,

        loading1: state.editPlanReducer.loading
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        getMyPlans: () => dispatch(getMyPlans()),
        editPlan: (date, task) => dispatch(editPlan(date, task))
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MainScreen)