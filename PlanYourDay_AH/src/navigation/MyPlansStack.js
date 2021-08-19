import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import MyPlanScreen from '../screens/MyPlanScreen';
import AddNewPlanScreen from '../screens/AddNewPlan';
import MenuScreen from '../screens/MenuScreen';
import ContactUs from '../screens/ContactUs';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();

function MyPlansStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainScreen" >
                    {props => <MainScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name="MyPlanScreen">
                    {props => <MyPlanScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name="AddNewPlanScreen">
                    {props => <AddNewPlanScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name="MenuScreen" >
                    {props => <MenuScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name="ContactUsScreen" >
                    {props => <ContactUs {...props} />}
                </Stack.Screen>
                <Stack.Screen name="PrivacyPolicyScreen" >
                    {props => <PrivacyPolicyScreen {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyPlansStack;
