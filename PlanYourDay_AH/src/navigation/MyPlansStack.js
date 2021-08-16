import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import MyPlanScreen from '../screens/MyPlanScreen';
import AddNewPlanScreen from '../screens/AddNewPlan';
import Header from '../components/Header';

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyPlansStack;
