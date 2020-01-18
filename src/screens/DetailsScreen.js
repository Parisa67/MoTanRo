import React, { Component } from 'react';
import { BackgroundCarouselDetails } from '../component/BackgroundCarouselDetails';
import Modal from "react-native-modal";
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon, Left } from 'native-base';
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



class DetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      productType: '',
      category: '',
      subCategory: '',
      resellers: [],
      minPrice: {},
      imageDetails: [],
      sizes: [],
      colors: [],
      originalPrice: [],
      payPrice: [],
      isLoad: true,
      isModalVisible: false,
      user: {},
      modaloriginalPrice: 0,
      modalDiscountPrice: 0,
      errorMessage:"",
      addPriceResult:{},
      addPriceIsSuccess:false,
      productId:parseInt(this.props.navigation.getParam('itemId')),
      isSell:false,
     
    
    }

    this._GetStorage();

  }
       _GetStorage = async () => {
           this.setState({ user: JSON.parse(await AsyncStorage.getItem('userToken')) });
           this.setState(this.state.isSell=this.state.user.isSeller);

        }
        componentDidMount() {
           this._fechDetail();

       }
        toggleModal = () => {
         
          if (this.state.user !== null) 
          {
            if (this.state.isSell) {
              this.toggleModal1();
            }
            else {
              alert("به عنوان خریدار نمی توانید قیمت اضافه کنید!")
               } 

          }
           else
           {alert("لطفا وارد حساب کاربری خود شوید...")
           }
          
          
         };
         toggleModal1 = () => {

           this.setState({ isModalVisible: !this.state.isModalVisible });
         };


  _fechDetail() {
    fetch(global.ServerUri + 'api/v1/products/detail/' + this.state.productId)
      .then((response) => response.json())
      .then((responseJson) => {
        const ImagesF = [];
        const ColorsF = [];
        const payPriceF = [];
        const originalPriceF = [];
        responseJson.images.forEach(img => ImagesF.push(`${global.ServerUri}${img}`));
        responseJson.colors.forEach(color => ColorsF.push(`${color.name}`));
        responseJson.resellers.forEach(orginal => originalPriceF.push(orginal.price.originalPrice));
        responseJson.resellers.forEach(pay => payPriceF.push(pay.price.payPrice));
        this.setState({
          imageDetails: ImagesF,
          minPrice: responseJson.minPrice,
          productType: responseJson.productType,
          category: responseJson.category,
          subCategory: responseJson.subCategory,
          resellers: responseJson.resellers,
          sizes: responseJson.sizes,
          description: responseJson.description,
          name: responseJson.name,
          colors: ColorsF,
          originalPrice: originalPriceF,
          payPrice: payPriceF,
          isLoad: false
        });
        console.log(this.state.originalPrice);
        console.log(this.state.payPrice);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoad)
      return (<ActivityIndicator />)

    return (
      <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
        <ScrollView>
          <View>
            <BackgroundCarouselDetails images={this.state.imageDetails} />
          </View>
          <View style={{ marginTop: -20 }}>
            <Text style={{ fontSize: 20, textAlign: "center", color: "red", marginBottom: 10, }}>{this.state.minPrice.originalPrice} تومان</Text>
            <Text style={{ fontSize: 20, textAlign: "center", color: "green", marginBottom: 10, }}>با تخفیف : {this.state.minPrice.payPrice} تومان</Text>

          </View>
          <View style={{ borderColor: "#c8cbce", borderRadius: 10, borderWidth: 1, maxHeight: 300, backgroundColor: "white", marginLeft: 20, marginRight: 20, }}>
            <ScrollView>
              <Text
                style={{ fontSize: 20, marginRight: 20, paddingTop: 10, color: "#c1c4c7" }}>
                {this.state.category}{" " + "->" + " "}{this.state.subCategory}{" " + "->" + " "}
                {this.state.productType}</Text>
              <Text style={{ fontSize: 23, marginRight: 20, marginTop: 10 }}>{this.state.name}</Text>
              <Text style={{ marginRight: 20, fontSize: 20, marginTop: 20, }}>توضیحات:</Text>
              <Text style={{ fontSize: 20, marginRight: 20, }}>{this.state.description}</Text>
            </ScrollView>
          </View>

          <View style={{ width: '100%', flexDirection: "row-reverse", justifyContent: "space-evenly", marginBottom: 10 }}>
            <View style={{ flexDirection: "row-reverse", justifyContent: "flex-start", marginTop: 20, alignItems: "center", marginRight: 20, }}>
              <Text style={{ padding: 10, fontSize: 20, }}>سایز</Text>
              {console.log(this.state.sizes)}

              <ModalDropdown options={this.state.sizes} defaultValue={this.state.sizes[0]}
                defaultIndex={0}
                dropdownStyle={{ borderColor: "#c8cbce", borderWidth: 1, width: 80 }}
                dropdownTextStyle={{ fontSize: 20, textAlign: "center" }} textStyle={{
                  fontSize: 15, color: "#9a9b9c", borderColor: "#949697",
                  borderRadius: 5, backgroundColor: "white", padding: 4, borderWidth: 1, width: 80
                }} />

            </View>

            <View style={{ flexDirection: "row-reverse", justifyContent: "flex-start", marginTop: 20, alignItems: "center", }}>
              <Text style={{ marginRight: 20, padding: 10, fontSize: 20, }}>رنگ</Text>
              {console.log(this.state.colors)}

              <ModalDropdown options={this.state.colors} defaultValue={this.state.colors[0]}
                defaultIndex={0}
                dropdownStyle={{ borderColor: "#c8cbce", borderWidth: 1, width: 80 }}
                dropdownTextStyle={{ fontSize: 20, textAlign: "center" }}
                textStyle={{
                  fontSize: 15,
                  color: "#9a9b9c",
                  borderColor: "#949697",
                  borderRadius: 5,
                  backgroundColor: "white",
                  padding: 4,
                  borderWidth: 1,
                  width: 80
                }} />

            </View>
          </View>
          <View style={{
            flexDirection: 'column',
            borderColor: "#c8cbce",
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: "#fff",
            marginLeft: 20,
            marginRight: 20,
            justifyContent: "center",
            padding: 10,
            alignItems: "flex-end"
          }} >
            {/* ############################################## */}
            <TouchableOpacity onPress={this.toggleModal}>
              <Text style={{
                fontSize: 20,
                padding: 5,
                marginRight: 7,
                borderColor: "#c8cbce",
                borderRadius: 10,
                borderWidth: 1,
                width: "40%",
                textAlign: "center",
              }}>افزودن قیمت</Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.isModalVisible} animationIn={'slideInUp'}
              transparent={true} backdropOpacity={0} >
              <View style={{
                flex: 0,
                backgroundColor: "rgba(33,33,33,0.9)",
                height: 300,

              }}>

                <TouchableOpacity onPress={() => this.toggleModal1()}>
                  <Icon name="close" type='AntDesign' style={styles.icons} />
                </TouchableOpacity>

                <View style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: 20
                }}>
                  <Text style={{ color: "white", fontSize: 24, marginBottom: 10, }}>*مبلغ و تخفیف را به تومان وارد کنید</Text>
                  <TextInput 
                    placeholder="مبلغ"
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => this.setState({ modaloriginalPrice: parseInt(text,10) })}
                    value={this.state.modaloriginalPrice}
                    style={{
                      height: 50, autoFocus: true,
                      fontSize: 20, width: 200, padding: 7,
                      color: 'white', type: 'number',
                      backgroundColor: 'transparent',
                      textAlign: "center", marginBottom: 15,
                      borderBottomColor: 'gray', borderBottomWidth: 2,
                    }} />
                  <TextInput
                    placeholder="تخفیف"
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => this.setState({ modalDiscountPrice: parseInt(text,10) })}
                    value={this.state.modalDiscountPrice}
                    style={{
                      height: 50, autoFocus: true,
                      fontSize: 20, width: 200, padding: 7,
                      color: 'white', type: 'number',
                      backgroundColor: 'transparent',
                      textAlign: "center", marginBottom: 15,
                      borderBottomColor: 'gray', borderBottomWidth: 2,
                    }} />
                  <TouchableOpacity onPress={this._incPrice} >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 24, padding: 5,
                        backgroundColor: "white",
                        height: 40, width: 70,
                        borderRadius: 20, textAlign: "center"
                      }}>ثبت</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>
            <View style={{
              backgroundColor: "#f0e5e7", width: 320
              , marginBottom: 10, flexDirection: "column", borderRadius: 6, marginRight: 10, marginLeft: 10,
            }}>

            </View>
            <FlatList showsHorizontalScrollIndicator={false} style={{ marginTop: 20, }}
              data={this.state.resellers} renderItem={({ item }) => {
                return (
                  <View style={{
                    backgroundColor: "#f0e5e7", width: 320
                    , marginBottom: 10, flexDirection: "column", borderRadius: 6, marginRight: 10, marginLeft: 10,
                  }}>
                    <TouchableOpacity>
                      
                      <View style={{ flexDirection: "row-reverse", justifyContent: "space-around"}}>
                        <Text style={{ fontSize: 23,  }}>فروشنده: </Text>
                        <Text style={{ fontSize: 20, }}> {item.resellerName}</Text>
                      </View>
                      <View style={{ flexDirection: "row-reverse", justifyContent: "space-around",marginTop:5 }}>
                        <Text style={{ fontSize: 20, }}>قیمت: </Text>
                        <Text style={{ fontSize: 20,  color: 'red' }}> {item.price.originalPrice}</Text>
                      </View>
                      <View style={{ flexDirection: "row-reverse", justifyContent: "space-around" }}>
                        <Text style={{ fontSize: 20, }}>با تخفیف: </Text>
                        <Text style={{ fontSize: 20,  color: 'green' }}> {item.price.payPrice}</Text>
                      </View>
                      <View style={{flexDirection:"row",justifyContent:"center",marginBottom:15}}>
                      {(this.state.user.id === item.id)&&(<TouchableOpacity >
                        <Text style={{color: "black",fontSize: 20, padding: 10,backgroundColor: "#f3d2e3",
                        height: 40, width: 200,marginTop:10,marginLeft:10,
                        borderRadius: 15, textAlign: "center"}}>حذف </Text>
                          {/* <Icon name="close" type='AntDesign' style={styles.icons2} /> */}
                      </TouchableOpacity>)}
                      </View>
                    </TouchableOpacity>
                  </View>)
              }}
              keyExtractor={(item, index) => "key" + index} />
          </View>
        </ScrollView>
      </View>
    )
  }
  _incPrice = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "ProductId":this.state.productId,
      "ShopUserId":this.state.user.id,
      "Price":this.state.modaloriginalPrice,
      "Discount":this.state.modalDiscountPrice
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(global.ServerUri+"api/v1/products/add-price", requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          addPriceResult: responseJson,
          addPriceIsSuccess: responseJson.isSuccess,
          errorMessage: responseJson.error
        })

        if (this.state.addPriceIsSuccess == true) {
         
          // this.props.navigation.navigate('App');
          this.toggleModal1();
          this._fechDetail();

        }
        else
          alert(this.state.errorMessage);

      })
      .catch(error => console.log('error', error));

  }

}
const styles = StyleSheet.create({
  icons: {
    fontSize: 29,
    color: "white",
    marginLeft: 310,
    marginTop: 20,

  },
  icons2: {
    fontSize: 29,
    color: "red",
    marginLeft: 30,
    marginTop: 20,

  },

});
export default DetailsScreen;