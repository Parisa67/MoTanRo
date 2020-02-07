/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
* @format
 * @flow
 */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

class DrawerComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      loginOutIcon: "",
      loginOutText: "",
      display: "",
      isSeller:false,
    }
    this._GetStorage();

  }
  _GetStorage = async () => {
    this.setState({ user: await AsyncStorage.getItem('userToken') });
    // alert(this.state.user)    
    if (this.state.user === null) {
      this.setState({ loginOutIcon: 'login', loginOutText: 'ورود/ثبت نام', display: "none", isSeller :false })
    }
    else {
      this.setState({ loginOutIcon: 'logout', loginOutText: 'خروج', display: "flex", isSeller :this.state.user.isSeller  })
      
    }

  }

  componentDidMount() {

  }
  render() {


    return (
      <View style={
        { flex: 1 }}>
        <StatusBar backgroundColor="#e80442" barStyle="light-content" />
        <View style={{ justifyContent: "center", alignItems: "center", }} >
          <Image source={require('../Picture/logo.jpg')}
            style={{ height: 60, width: 280, marginTop: 20,marginBottom: 10, marginLeft: 10, marginRight: 10, }}></Image>

        </View>
        <ScrollView>
          {/* onPress={this.props.navigation.navigate('HomeScreen')} */}

         
          {(this.state.user !== null) && (<TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} >
            <View style={{ flexDirection: "row-reverse",borderTopWidth:1,borderTopColor:'#ACABAB',backgroundColor: "#d60644",marginTop:10,}}>
              <Icon type='MaterialCommunityIcons' name="account-card-details-outline"  style={{
                  marginTop: 10,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 27,
                  color: 'white',
                  width: 40,
                  height: 40,
                  marginRight: 15
                }}/>
              <Text style={{
                  color: 'white',
                  fontSize: 17,
                  paddingTop: 15,
                  marginBottom: 10,
                  fontFamily:"BYekan+",
                  
                }}> پروفایل</Text>
            </View>
          </TouchableOpacity>)}
          < TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
            <View style={{  marginBottom: 3,flexDirection: "row-reverse",borderTopWidth:1,borderTopColor:'#ACABAB'}}>
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


          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListKalaman')} >
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
          {((this.state.user !== null)&&!(this.state.isSeller))&&(
          <TouchableOpacity onPress={() =>(this.state.user !== null)? this.props.navigation.navigate('CartScreen'):alert('وارد حساب کاربری خود شوید...سبد خرید شما خالی است!!!')} >
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
                 <Text style={styles.texts}> سبد خرید {this.state.isSeller}</Text>
            </View>
          </TouchableOpacity>)}

          {/* style={[{ this.state.display }, backgroundColor:"red"]} */}
          <TouchableOpacity
            onPress={this._LoginOutPress}  >
            <View style={styles.Views}>
              <Icon name={this.state.loginOutIcon} type='MaterialCommunityIcons'
               style={styles.icons}/>
              <Text style={styles.texts}>{this.state.loginOutText}</Text>

            </View>
          </TouchableOpacity>
         


        </ScrollView>
      </View>
    );

  }
  _LoginOutPress = async () => {
    if (this.state.user === null) {
      this.props.navigation.navigate('Auth')
    }
    else {
      await AsyncStorage.removeItem('userToken')
      await AsyncStorage.removeItem(basketItems)
      this.setState({ user: null })
      this.setState({ loginOutIcon: 'login', loginOutText: 'ورود/ثبت نام', display: "none" })
      this.props.navigation.closeDrawer();
      this.props.navigation.navigate('Home')
    }

  }

}

const styles = StyleSheet.create({
  texts: {
    color: '#454545',
    fontSize: 17,
    paddingTop: 15,
    marginBottom: 10,
    fontFamily:"BYekan+",
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

    // marginBottom: 10,
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: '#ACABAB',


  },
 

  

});

export default DrawerComponent;
