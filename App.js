// import React ,{Component} from 'react';
import React, {
    Component
} from 'react';
import {
    createDrawerNavigator
} from 'react-navigation-drawer';
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ListKalawomanScreen from './src/screens/ListKalawomanScreen';
import ListKalamanScreen from './src/screens/ListKalamanScreen';
import ListKalagirlScreen from './src/screens/ListKalagirlScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TypeKidsScreen from './src/screens/TypeKidsScreen';
import ProductScreen from './src/screens/ProductScreen';

import DrawerComponent from './src/component/DrawerComponent';
import HeaderTitle from './src/component/HeaderTitle';

const AppStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({
            navigation
        }) => ({
            headerTitle: < HeaderTitle menu={
                () => navigation.toggleDrawer()
            }
            />
        })
    },
    Detail: {
        screen: DetailsScreen,
        navigationOptions: ({
            navigation
        }) => ({
            headerTitle: < HeaderTitle
                menu={
                    () => navigation.toggleDrawer()
                }
            />
        })
    },
    Product: {
        screen: ProductScreen,
        navigationOptions: ({
            navigation
        }) => ({
            headerTitle: < HeaderTitle
                menu={
                    () => navigation.toggleDrawer()
                }
            />
        })
    },
    TypeKids: {
        screen: TypeKidsScreen,
        navigationOptions: ({
            navigation
        }) => ({
            headerTitle: < HeaderTitle menu={
                () => navigation.toggleDrawer()
            }
            />
        })
    },
    ListKalawoman: {
        screen: ListKalawomanScreen,
        navigationOptions: ({
            navigation
        }) => ({
            headerTitle: < HeaderTitle menu={
                () => navigation.toggleDrawer()
            }
            />
        })
    },
    ListKalamanScreen: {
        screen: ListKalamanScreen,
        navigationOptions: ({
            navigation
        }) => ({
            headerTitle: < HeaderTitle menu={
                () => navigation.toggleDrawer()
            }
            />
        })
    },
    ListKalagirlScreen: {
        screen: ListKalagirlScreen,
        navigationOptions: ({
            navigation
        }) => ({
            headerTitle: < HeaderTitle menu={
                () => navigation.toggleDrawer()
            }
            />
        })
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#d60644',
        },
        headerTintColor: '#fff',

    },
});
const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
});
const AppDrawer = createDrawerNavigator({

    Home: AppStack
}, {
    contentComponent: DrawerComponent,
    drawerPosition: "right",
    initialRouteName: 'Home'
});
const AppNavigator = createSwitchNavigator({
    // AuthLoading: AuthLoadingScreen,
    App: AppDrawer,
    Auth: AuthStack,
}
    //   , {

    //     initialRouteName: 'AuthLoading',
    //   }
);



const AppContainer = createAppContainer(AppNavigator);
global.ServerUri = "http://192.168.1.119:5000/";
export default App = () => {
    return (< AppContainer />)
}