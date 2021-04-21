import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Confirmation } from '../pages/Confirmation';
import { UserIdentification } from '../pages/UserIdentification';
import { WelCome } from '../pages/Welcome';
import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen 
            name='Welcome'
            component={WelCome}
        />

        <stackRoutes.Screen 
            name='UserIdentification'
            component={UserIdentification}
        />

        <stackRoutes.Screen 
            name='Confirmation'
            component={Confirmation}
        />
        
    </stackRoutes.Navigator>
)

export default AppRoutes;