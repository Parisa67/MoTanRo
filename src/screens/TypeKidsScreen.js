/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
* @format
 * @flow
 */


import React, { Component } from 'react';

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
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    FlatList, ImageBackground,
    Image

} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class TypeKidsScreen extends Component {

    constructor(props) {
        super(props)
    }




    componentDidMount() {

    }

    render() {


        return (
            <View style={{ flex: 1, backgroundColor: "#f0efef", justifyContent: "center", alignItems: "center" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.views}>
                        < TouchableOpacity onPress={
                            () => this.props.navigation.navigate('ListKalainfantScreen')} >
                            <Image source={require('../Picture//pic/loading/babi.jpg')}
                                style={styles.img}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.views}>
                        < TouchableOpacity onPress={
                            () => this.props.navigation.navigate('ListKalagirlScreen')}>
                            <Image source={require('../Picture//pic/loading/girl2.jpg')}
                                style={styles.img}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.views}>
                        < TouchableOpacity onPress={
                            () => this.props.navigation.navigate('ListKalaboyScreen')
                        } >
                            <Image source={require('../Picture//pic/loading/boy2.jpg')}
                                style={styles.img}></Image>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    img: {
        height: 330,
        width: 270,
        marginTop: 20,
        // marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    views: {
        marginBottom: 30,
        marginTop: 20
    }
});

export default TypeKidsScreen;
