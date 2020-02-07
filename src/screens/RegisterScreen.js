/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import { KeyboardAvoidingView } from 'react-native';
import React, { Component } from 'react';
import { Icon, Left } from 'native-base';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Switch,
    Button,
    ActivityIndicator,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    FlatList,
    ImageBackground,
    Image,
    AsyncStorage

} from 'react-native';
class RegisterScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mail: "",
            tel: "",
            user: "",
            company: "",
            password1: "",
            password2: "",
            check: "",
            errorMessage: "",
            showPass1: true,
            press1: false,
            showPass2: true,
            press2: false,
            switch1Value: false,

        };
    }
    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value })
        console.log('Switch 1 is: ' + value)
    }
    showPass1 = () => {
        if (this.state.showPass1 == true) {
            this.setState({ showPass1: false, press1: true });
            console.log('false');
        } else {
            this.setState({ showPass1: true, press1: false });
            console.log('true');

        }
    }
    showPass2 = () => {
        if (this.state.showPass2 == true) {
            this.setState({ showPass2: false, press2: true });
            console.log('false');
        } else {
            this.setState({ showPass2: true, press2: false });
            console.log('true');

        }
    }

    componentDidMount() {

    }

    render() {


        return (

            <KeyboardAvoidingView style={styles.container} enabled >
                <View style={styles.container}>
                    <ImageBackground source={require("../Picture/pic/loading/login.jpg")}
                        style={{ width: '100%', height: '100%' }}>
                        <ScrollView keyboardShouldPersistTaps={'always'} >
                        <View style={
                                { flex: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>

                                <Text style={{ fontSize: 25, color: 'black', marginTop: 40, marginBottom: 30,fontFamily:"BYekan+" }}> ثبت نام حساب کاربری </Text>

                                <View style={styles.viewin} >
                                    <TextInput placeholder="نام و نام خانوادگی"
                                        style={styles.textin}
                                        underLinColorAndroid={'transparent'}
                                        returnKeyType="next"
                                        onChangeText={(text) => this.setState({ user: text })}
                                        value={this.state.user} >
                                    </TextInput>
                                </View> 

                                <View style={styles.viewin} >
                                    <TextInput placeholder="کلمه عبور"
                                        style={styles.textin}
                                        underLinColorAndroid={'transparent'}
                                        returnKeyType="next"
                                        secureTextEntry={this.state.showPass1}
                                        onChangeText={(text) => this.setState({ password1: text })}
                                        value={this.state.password1} >
                                    </TextInput>

                                    <TouchableOpacity onPress={this.showPass1.bind(this)}
                                        style={{ position: "absolute", left: 8, top: 20 }}>
                                        <Icon name={this.state.press1 == false ? "eye-with-line" : "eye"}
                                            type="Entypo"
                                            style={{ fontSize: 24, color: "rgba(1,1,1,0.4)", }}/>
                                    </TouchableOpacity >
                                </View>

                                <View style={styles.viewin} >
                                    <TextInput placeholder="تکرار کلمه عبور "
                                        style={styles.textin}
                                        underLinColorAndroid={'transparent'}
                                        returnKeyType="next"
                                        secureTextEntry={this.state.showPass2}
                                        onChangeText={
                                            (text) => this.setState({ password2: text })
                                        }
                                        value={this.state.password2} >
                                    </TextInput>
                                    <TouchableOpacity onPress={this.showPass2.bind(this)}
                                        style={{ position: "absolute", left: 8, top: 20 }}>
                                        <Icon name={this.state.press2 == false ? "eye-with-line" : "eye"}
                                            type="Entypo"
                                            style={{ fontSize: 24, color: "rgba(1,1,1,0.4)", }}/>
                                    </TouchableOpacity >
                                </View>

                                 <View style={styles.viewin} >
                                    <TextInput placeholder="ایمیل"
                                        placeholderTextColor={'#676666'}
                                        style={styles.textin}
                                        underLinColorAndroid={'transparent'}
                                        returnKeyType="next"
                                        keyboardType="email-address"
                                        onChangeText={(text) => this.setState({ mail: text })}
                                        value={this.state.mail} >
                                    </TextInput>
                                </View>

                                <View style={styles.viewin} >
                                    <TextInput placeholder="تلفن"
                                        style={styles.textin}
                                        underLinColorAndroid={'transparent'}
                                        keyboardType="numeric"
                                        returnKeyType="next"
                                        onChangeText={(text) => this.setState({ tel: text })}
                                        value={this.state.tel} >
                                    </TextInput>
                                </View >

                                <View style={styles.viewin} >
                                    <TextInput placeholder="نام فروشگاه"
                                        style={styles.textin}
                                        underLinColorAndroid={'transparent'}
                                        returnKeyType="go"
                                        onChangeText={(text) => this.setState({ company: text })}
                                        value={this.state.company}>
                                    </TextInput>
                                </View >

                            </View>
                            <View style={{   display: "flex",
                                             flexDirection: "row-reverse",
                                             justifyContent: "center",
                                             alignItems: "center", }}>
                                <Text style={{ fontSize: 24, color: 'white',fontFamily:"BYekan+" }}> فروشنده هستم </Text>
                                 < Switch onValueChange={this.toggleSwitch1}
                                    value={this.state.switch1Value}/>
                            </View >

                            <View style={
                                { flex: 5, justifyContent: 'flex-start', alignItems: 'center', }}>
                                <TouchableOpacity style={styles.tuch}
                                    returnKeyType="go"
                                    ref={(input) => this.passwordInput = input}
                                    onPress={this._Register} >
                                    <Text style={{ color: 'black', fontSize: 20,fontFamily:"BYekan+" }}> ثبت نام </Text>
                                </TouchableOpacity >

                                <TouchableOpacity style={styles.tuch}
                                    onPress={() => this.props.navigation.navigate('App')}>
                                    <Text style={{ color: 'black', fontSize: 20,fontFamily:"BYekan+" }}> انصراف </Text>
                                     </TouchableOpacity >
                                      </View>
                             
                             </ScrollView >
                              </ImageBackground>
                               </View >
                                </KeyboardAvoidingView>


        );

    }
    _SetStorage = async (rslt) => {
      await AsyncStorage.setItem('userToken', JSON.stringify(rslt));
  
    }
    _Register = async () => {
        if (this.state.user === "" ||
            this.state.password1 === "" ||
            this.state.password2 === "" ||
            this.state.mail === "" ||
            this.state.tel === "") {
            alert("فیلدی نمیتواند خالی باشد.... ")
        } else if (this.state.password1 != this.state.password2) { alert("تایید کلمه عبور نامعتبر است!") } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "fullName": this.state.user,
                "email": this.state.mail,
                "password": this.state.password1,
                "confirmPassword": this.state.password2,
                "phone": this.state.tel,
                "company": this.state.company
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(global.ServerUri + "api/v1/register", requestOptions)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        result: responseJson,
                        isSuccess: responseJson.isSuccess,
                        errorMessage: responseJson.error
                    })

                    if (this.state.isSuccess == true) {
                        this._SetStorage(this.state.result)
                        this.props.navigation.navigate('App');
                    } else
                        alert(this.state.errorMessage);

                })
                .catch(error => console.log('error', error));
        };


    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',


    },
    tuch: {
        width: 300,
        marginTop: 10,
        borderRadius: 20,
        height: 50,
        backgroundColor: "rgba(255,255,255,0.7)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textin: {
        height: 50,
        width: 265,
        marginLeft: 35,
        paddingBottom: 1,
        fontSize: 20,
        backgroundColor: 'transparent',
        color: "white",
        fontFamily:"BYekan+"


    },
    viewin: {
        borderBottomColor: '#ffffff',
        marginBottom: 10,
        borderBottomWidth: 0.5,
    }
});

export default RegisterScreen;