/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
* @format
 * @flow
 */
import { Icon, Left } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
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
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  FlatList, ImageBackground,
  Image, AsyncStorage,

} from 'react-native';



class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    };
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: "",
      showPass: true,
      press: false,
      text: "",
      password: "",
      result: {},
      isSuccess: false,
    };


  }

  showPass = () => {
    if (this.state.showPass == true) {
      this.setState({ showPass: false, press: true });
     
    } else {
      this.setState({ showPass: true, press: false });
     

    }
  }

  componentDidMount() {
  }

  render() {


    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <View style={styles.container}>
          <ImageBackground
            source={require("../Picture/pic/loading/login.jpg")}
            style={{ width: '100%', height: '100%' }}>
            <View style={{ flex: 5, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10, }}>
              <Text style={{ fontSize: 25, color: 'black', marginTop: 30, marginBottom: 30 }}>ورود به حساب کاربری</Text>

              <View style={styles.viewin}>
                <TextInput placeholder="ایمیل یا شماره موبایل"
                  style={styles.textin}
                  underLinColorAndroid={'transparent'}
                  onChangeText={(text) => this.setState({ text: text })}
                  value={this.state.text} >

                </TextInput>
                <Icon name="user" type="Entypo"
                  style={{ position: "absolute", fontSize: 25, color: "rgba(1,1,1,0.4)", left: 8, top: 20 }} />
              </View>

              <View style={styles.viewin}>
                <TextInput
                  placeholder="کلمه عبور"
                  style={styles.textin}
                  underLinColorAndroid={'transparent'}
                  secureTextEntry={this.state.showPass}
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}>
                </TextInput>

                <Icon
                  name="ios-lock"
                  type="Ionicons"
                  style={{ position: "absolute", fontSize: 28, color: "rgba(1,1,1,0.4)", left: 8, top: 20 }} />

                <TouchableOpacity
                  onPress={this.showPass.bind(this)}
                  style={{ position: "absolute", right: 8, top: 20 }}>
                  <Icon name={this.state.press == false ? "eye-with-line" : "eye"}
                    type="Entypo"
                    style={{ fontSize: 28, color: "rgba(1,1,1,0.4)", }} />
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center', }}>

              <TouchableOpacity
                style={styles.tuch}
                onPress={this._signInAsync}>
                <Text style={{ color: 'black', fontSize: 20 }}
                  returnKeyType="next"
                  autocapitalize="none"
                  onSubmitEditing={() => this.passwordInput.focus()}>ورود</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tuch}
                returnKeyType="go"
                ref={(input) => this.passwordInput = input}
                onPress={this._Register}>
                <Text style={{ color: 'black', fontSize: 20 }}>ثبت نام</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tuch}
                onPress={() => this.props.navigation.navigate('App')}>
                <Text style={{ color: 'black', fontSize: 20 }}>انصراف</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 20, color: 'red', marginTop: 30 }}>کلمه عبور را فراموش کرده اید؟</Text>

            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );


  }

  _Register = () => {

    this.props.navigation.navigate('Register');

  };
  _SetStorage = async (rslt) => {
    await AsyncStorage.setItem('userToken', JSON.stringify(rslt));

  }
  _signInAsync = async () => {
    //const { navigation } = this.props;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "emailOrPhoneNumber": this.state.text,
        "password": this.state.password });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(global.ServerUri + "api/v1/login", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          result: responseJson,
          isSuccess: responseJson.isSuccess,
          errorMessage: responseJson.error
        })
        console.log(responseJson)
        if (this.state.isSuccess == true) {
          this._SetStorage(this.state.result)
          this.props.navigation.navigate('App');
        }
        else
          alert(this.state.errorMessage);

      })
      .catch(error => console.log('error', error));
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
    width: 230,
    marginHorizontal: 35,

    paddingBottom: 1,
    fontSize: 20,
    backgroundColor: 'transparent',

  },
  viewin:
  {
    borderBottomColor: '#ffffff',
    marginBottom: 10,
    borderBottomWidth: 0.5,
  }
});

export default LoginScreen;
