import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {Component} from "react"
import { SafeAreaView, View, Text, StatusBar } from "react-native"
import { connect } from "react-redux"
import { setUserId } from "./src/globals/set_get_user_id"
import { myplanscalendar } from "./src/mockdata/myplanscalendar"
import MyPlansStack from "./src/navigation/MyPlansStack"
import { getMyPlans } from "./src/redux/reducers/MyPlansReducer"
import SplashScreen from 'react-native-splash-screen'

class App extends Component {
  constructor(props) {
    super(props)
  }

  setPlans = async() => {
    await AsyncStorage.setItem('my_plans', JSON.stringify(myplanscalendar))
    this.props.getMyPlans()
  }

  setUserID = async() => {
    let random_number = Math.random()*10
    let user_id = 'user_id_'+random_number.toString()
    console.log(user_id)

    let user = await AsyncStorage.getItem('user_id')
    if (!user) {
      console.log('User does not exist = '+user)
      await AsyncStorage.setItem('user_id', user_id)
        .then(() => {
          console.log('Setting user id')
          setUserId(user_id)
        })
        .catch((e) => console.log(e))
    } else {
      setUserId(user)
      console.log('User exists = '+user)
    }
  } 

  setNotifications = async() => {
    await AsyncStorage.getItem('notifications')
     .then(async(data) => {
      //  alert(data)
       if (data==null) {
        await AsyncStorage.setItem('notifications', 'true')
       }
     })
  }

  componentDidMount() {
    this.setUserID()
    this.setPlans()
    this.setNotifications()
    SplashScreen.hide()
  }

  render() {
    return(
      <SafeAreaView style={{flex:1, backgroundColor: '#fff', paddingHorizontal: 5}}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <MyPlansStack />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPlans: () => dispatch(getMyPlans())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)