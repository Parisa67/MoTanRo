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
import { number } from 'prop-types';


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
      isModalVisible: false

    }
  }

  componentDidMount() {
    fetch(global.ServerUri + 'api/v1/products/detail/' + this.props.navigation.getParam('itemId'))
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
        console.log(this.state.originalPrice)
        console.log(this.state.payPrice)
      })

      .catch((error) => {
        console.error(error);
      });

  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };


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
              {/* ############################################## */}
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

                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <Icon name="close" type='AntDesign' style={styles.icons} />
                </TouchableOpacity>

                <View style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: 20
                }}>
                  <Text style={{ color: "white", fontSize: 24, marginBottom: 10, }}>مبلغ مورد نظر را وارد کنید</Text>
                  <TextInput placeholder="به تومان وارد کنید" placeholderTextColor={'gray'}
                    style={{
                      height: 50, autoFocus: true,
                      fontSize: 20, width: 200, padding: 7,
                      color: 'gray', type: 'number',
                      backgroundColor: 'transparent',
                      textAlign: "center", marginBottom: 15,
                      borderBottomColor: 'gray', borderBottomWidth: 2,
                    }} />
                  <TouchableOpacity onPress={this.toggleModal} >
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

            <FlatList showsHorizontalScrollIndicator={false} style={{ marginTop: 20, }}
              data={this.state.resellers} renderItem={({ item }) => {
                return (
                  <View style={{
                    backgroundColor: "#f0e5e7", width: 320
                    , marginBottom: 10, flexDirection: "column", borderRadius: 6, marginRight: 10, marginLeft: 10,
                  }}>
                    <TouchableOpacity>
                      <Text style={{ fontSize: 23, marginRight: 20, }}>فروشنده: </Text>
                      <Text style={{ fontSize: 20, marginRight: 47, }}> {item.resellerName}</Text>
                      <View style={{ flexDirection: "row-reverse", justifyContent: "flex-start" }}>
                        <Text style={{ fontSize: 20, marginRight: 50, }}>قیمت: </Text>
                        <Text style={{ fontSize: 20, marginRight: 50, color: 'red' }}> {item.price.originalPrice}</Text>
                      </View>
                      <View style={{ flexDirection: "row-reverse", justifyContent: "flex-start" }}>
                        <Text style={{ fontSize: 20, marginRight: 50, }}>با تخفیف: </Text>
                        <Text style={{ fontSize: 20, marginRight: 50, color: 'green' }}> {item.price.payPrice}</Text>
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

}
const styles = StyleSheet.create({
  icons: {
    fontSize: 29,
    color: "white",
    marginLeft: 310,
    marginTop: 20,

  }

});
export default DetailsScreen;