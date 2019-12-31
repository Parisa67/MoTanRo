/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
* @format
 * @flow
 */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Drawer from 'react-native-drawer'
// import Icon from 'react-native-vector-icons/Fontisto';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon, Left } from 'native-base';
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

  TextInput,
  FlatList, ImageBackground, AsyncStorage,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import { TouchableOpacity } from 'react-native-gesture-handler';

class DrawerComponent extends Component {

  componentDidMount() {

  }

  render() {


    return (
      <View style={
        { flex: 1 }}>
        <StatusBar backgroundColor="#e80442" barStyle="light-content" />
        <View style={{ justifyContent: "center", alignItems: "center" }} >
          <Image source={require('../Picture/logo.jpg')} style={{ height: 60, width: 280, marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10, }}></Image>

        </View>
        <ScrollView>
          {/* onPress={this.props.navigation.navigate('HomeScreen')} */}

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}  >
            <View style={{
              marginBottom: 10,
              flexDirection: "row-reverse",
              borderBottomWidth: 1,
              borderBottomColor: '#ACABAB',
              backgroundColor: "#d60644"
            }}>
              <Icon name="login" type='MaterialCommunityIcons'
                style={{
                  marginTop: 10,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 27,
                  color: 'white',
                  width: 40,
                  height: 40,
                  marginRight: 15
                }} />
              <Text
                style={{
                  color: 'white',
                  fontSize: 17,
                  paddingTop: 15,
                  marginBottom: 10,
                }}>ورود/ثبت نام</Text>

            </View>
          </TouchableOpacity>
          < TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
            <View style={styles.View}>
              <Icon name="home" type='Ionicons' style={styles.icons} />
              <Text style={styles.texts}>خانه </Text>

            </View>
          </TouchableOpacity>


          < TouchableOpacity style={
            styles.touchos
          }
            onPress={
              () => this.props.navigation.navigate('ListKalawoman')
            } >
            <View style={styles.View}>
              <Icon type='Ionicons' name='ios-woman' style={styles.icons} />
              <Text style={styles.texts}>زنانه</Text>

            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListKalamanScreen')} >
            <View style={styles.View}>
              <Icon name="ios-man" style={styles.icons} />
              <Text style={styles.texts}> مردانه</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.props.navigation.navigate('TypeKids')}>
            <View style={styles.Views}>
              <Icon type='FontAwesome' name="child" style={styles.icons} />
              <Text style={styles.texts}> بچگانه</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity  >
            <View style={styles.Views}>
              <Icon type='FontAwesome5' name="shopping-cart"
                style={{
                  marginTop: 10,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 23,
                  color: '#cbcbcb',
                  width: 40,
                  height: 40,
                  marginRight: 15
                }} />
              <Text style={styles.texts}> سبد خرید</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity  >
            <View style={styles.Views}>
              <Icon type='MaterialCommunityIcons' name="account-card-details-outline" style={styles.icons} />
              <Text style={styles.texts}> پروفایل</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );

  }

}

const styles = StyleSheet.create({
  texts: {
    color: '#454545',
    fontSize: 17,
    paddingTop: 15,
    marginBottom: 10,



    height: 40
  },
  icons: {
    marginTop: 10,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 27,
    color: '#cbcbcb',
    width: 40,
    height: 40,
    marginRight: 15

  },
  View: {

    marginBottom: 3,
    flexDirection: "row-reverse",
    marginRight: 10,
    //  borderBottomWidth: 1,
    //  borderBottomColor: '#ACABAB'
  },
  Views: {

    marginBottom: 10,
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: '#ACABAB',


  }

});

export default DrawerComponent;
