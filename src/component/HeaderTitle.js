import React, { Component } from 'react';

import { Header, Right, Icon, Left } from 'native-base';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Platform,
    Button,
    ActivityIndicator,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    FlatList, ImageBackground, AsyncStorage,
    Image

} from 'react-native';

class HeaderTitle extends Component {
    render() {
        return (
            < View style={
                {
                    flex: 1,
                    flexDirection: "row-reverse",
                    backgroundColor: '#d60644',
                    justifyContent: "space-between"
                }
            } >
                <View style={{ flexDirection: "row-reverse" }}>
                    <TouchableOpacity onPress={() => this.props.menu()}
                        style={{ alignSelf: 'center', paddingHorizontal: 14 }}>
                        <Icon type='Ionicons' name="menu"
                            style={{ fontSize: 34, color: 'white' }} onPress={() => this.props.menu()} />
                    </TouchableOpacity>
                    <Image
                        source={require('../Picture/mo.jpg')} style={{}}></Image>
                </View>
                <View style={{marginTop:10}}> 
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartScreen')} >
                        <Icon type='FontAwesome5' name="shopping-cart"
                        style={{ fontSize: 23,
                                paddingHorizontal: 14,
                                color: "white",
                                alignSelf: 'center', }} />
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}
export default HeaderTitle;