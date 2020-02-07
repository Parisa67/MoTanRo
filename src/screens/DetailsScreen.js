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
  Alert ,
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
      sizeValue:'',
      size:'',
      
      colors: [],
      colorsName: [],
      colorId:0,
      color:'',
      colorValue:'',

      originalPrice: [],
      payPrice: [],
      isLoad: true,
      isModalVisible: false,
      user: {},

      modaloriginalPrice: 0,
      modalDiscountPrice: 0,
      modalDescriptionPrice:"",

      count:1,
      errorMessage:"",
      addPriceResult:{},
      addPriceIsSuccess:false,
      productId:parseInt(this.props.navigation.getParam('itemId')),
      isSeller:false,
      basketName:'',
      basketItems:[],
      
    
    }


  }
  
  _GetBasketStorage= async () =>
  {
    this.setState({basketItems:JSON.parse(await AsyncStorage.getItem(this.state.basketName))})
    // console.log("basketItems==>",await AsyncStorage.getItem(this.state.basketName));   
  }
       _GetStorage = async () => {
           this.setState({ user: JSON.parse(await AsyncStorage.getItem('userToken')) });
           this.setState({isSeller:this.state.user.isSeller,basketName:'basket'+this.state.user.id});
          // alert('detail'+JSON.stringify(this.state.basketItems));
   
        }

        async componentDidMount() {
            await this._GetStorage();
            await this._fechDetail();
            await this._GetBasketStorage();


       }
        toggleModal = () => {
         
          if (this.state.user !== null) 
          {
            if (this.state.isSeller) {
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


  async _fechDetail() {
// console.log("productId",this.state.productId)
      fetch(global.ServerUri + 'api/v1/products/detail/' + this.state.productId)
      .then((response) => response.json())
      .then((responseJson) => {
        const ImagesF = [];
        const payPriceF = [];
        const colorsNameF = [];//(****)
        const originalPriceF = [];
        responseJson.images.forEach(img => ImagesF.push(`${global.ServerUri}${img}`));
        responseJson.colors.forEach(color => colorsNameF.push(`${color.name}`));//(****)
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
          size:responseJson.sizes[0],
          
          colorsName : colorsNameF,//یک لیست از نام رنگها (****)
          colors : responseJson.colors,//لیست رنگ ها به صورت آبجکت شامل id,name,value
          colorValue : responseJson.colors[0].value,
          color : responseJson.colors[0].name,
          colorId : responseJson.colors[0].id,
          
          description : responseJson.description,
          name: responseJson.name,
          originalPrice: originalPriceF,
          payPrice: payPriceF,
          isLoad: false
        });
    
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
            
            <Text style={{ fontSize: 20, textAlign: "center", color: "red", marginBottom: 10,fontFamily:"BYekan+" }}>{this.state.minPrice.originalPrice ==0 ? 'ناموجود' : this.state.minPrice.originalPrice + 'تومان' }</Text>
            <Text style={{ fontSize: 20, textAlign: "center", color: "green", marginBottom: 10,fontFamily:"BYekan+" }}>{this.state.minPrice.originalPrice ==0 ? '' : 'با تخفیف :'+ this.state.minPrice.payPrice+' تومان'}</Text>

          </View>
          <View style={{ borderColor: "#c8cbce", borderRadius: 10, borderWidth: 1, maxHeight: 300, backgroundColor: "white", marginLeft: 20, marginRight: 20, }}>
            <ScrollView>
              <Text
                style={{ fontSize: 20, marginRight: 20, paddingTop: 10, color: "#c1c4c7" }}>
                {this.state.category}{" " + "->" + " "}{this.state.subCategory}{" " + "->" + " "}
                {this.state.productType}</Text>
              <Text style={{ fontSize: 23, marginRight: 20, marginTop: 10,fontFamily:"BYekan+" }}>{this.state.name}</Text>
              <Text style={{ marginRight: 20, fontSize: 20, marginTop: 20,fontFamily:"BYekan+" }}>توضیحات:</Text>
              <Text style={{ fontSize: 20, marginRight: 20,fontFamily:"BYekan+" }}>{this.state.description}</Text>
            </ScrollView>
          </View>

          <View style={{ width: '100%', flexDirection: "row-reverse", justifyContent: "space-evenly", marginBottom: 10 }}>
            <View style={{ flexDirection: "row-reverse", justifyContent: "flex-start", marginTop: 20, alignItems: "center", marginRight: 20, }}>
              <Text style={{ padding: 10, fontSize: 20,fontFamily:"BYekan+" }}>سایز</Text>
             

              <ModalDropdown options={this.state.sizes} defaultValue={this.state.size}
                defaultIndex={0}
                onSelect={(i,value)=>this.setState({size:value})}
                dropdownStyle={{ borderColor: "#c8cbce", borderWidth: 1, width: 80 }}
                dropdownTextStyle={{ fontSize: 20, textAlign: "center" }} textStyle={{
                  fontSize: 15, color: "#9a9b9c", borderColor: "#949697",
                  borderRadius: 5, backgroundColor: "white", padding: 4,fontFamily:"BYekan+", borderWidth: 1, width: 80
                }} />

            </View>

            <View style={{ flexDirection: "row-reverse", justifyContent: "flex-start", marginTop: 20, alignItems: "center", }}>
              <Text style={{ marginRight: 20, padding: 10, fontSize: 20,fontFamily:"BYekan+" }}>رنگ</Text>
              <ModalDropdown options={this.state.colorsName} defaultValue={this.state.color}
                defaultIndex={0} 
                //&****************************************************************************88888888888888888888888888888888888888888888888888888888
                onSelect={(i,val) => this.setState(
                  {
                    colorId:this.state.colors[i].id,
                    colorValue:this.state.colors[i].value,
                    color:val
                  })}
                dropdownStyle={{ borderColor: "#c8cbce", borderWidth: 1, width: 80 }}
                dropdownTextStyle={{ fontSize: 20, textAlign: "center" }}
                textStyle={{
                  fontSize: 15,
                  color: "#9a9b9c",
                  borderColor: "#949697",
                  borderRadius: 5,
                  backgroundColor: this.state.colorValue,
                  padding: 4,
                  borderWidth: 1,
                  width: 80,
                  fontFamily:"BYekan+"
                }} />

            </View>
          </View>
          
          <View style={{flexDirection:"row-reverse",
                        justifyContent:"center",
                        marginBottom:10,
                        width:'100%',
                        }}>
               <Text style={{ marginRight: 20, padding: 10, fontSize:15,fontFamily:"BYekan+" }}>تعداد</Text>           
            <View style={{flexDirection:'row', justifyContent:"center",borderWidth:1,borderColor: "#949697", borderRadius:10,width:140,}}>
            <TouchableOpacity style={{Color:"red",width:35}}  onPress={() => this.state.count==1?null:this.setState({count:this.state.count-1})}>
              <Text style={{fontSize:30,color:"red"}} > - </Text>
              </TouchableOpacity>
               
              <View  style={{justifyContent: 'center',width:20,marginHorizontal:15, alignItems: 'center'}}>
              <Text style={{fontSize:20,borderRadius:25}} > {this.state.count} </Text>

              </View>
              <TouchableOpacity style={{width:35}} onPress={() => this.setState({ count: this.state.count + 1 })}>

                  <Text style={{fontSize:30,color:"red"}}  > + </Text>
                  </TouchableOpacity>
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
            {(this.state.isSeller)&&(<TouchableOpacity onPress={this.toggleModal}>
              <Text style={{
                fontSize: 20,
                padding: 5,
                marginRight: 7,
                borderColor: "#c8cbce",
                borderRadius: 10,
                borderWidth: 1,
                width: "40%",
                textAlign: "center",
                fontFamily:"BYekan+"
              }}>افزودن قیمت</Text>
            </TouchableOpacity>)}
            <Modal isVisible={this.state.isModalVisible} animationIn={'slideInUp'}
              transparent={true} 
              // backdropOpacity={0}
               >
              <View style={{
                flex: 0,
                backgroundColor: "white",
                borderColor:"gray",
                borderWidth:1,
                borderRadius:10,
                height: 400,

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
                  <Text style={{ color: "gray", fontSize: 20, marginBottom: 10,fontFamily:"BYekan+" }}>مبلغ و تخفیف را به تومان وارد کنید</Text>
                  <TextInput 
                    placeholder="مبلغ"
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => this.setState({ modaloriginalPrice: parseInt(text,10) })}
                    value={this.state.modaloriginalPrice}
                    style={styles.textmodal} />
                  <TextInput
                    placeholder="تخفیف"
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => this.setState({ modalDiscountPrice: parseInt(text,10) })}
                    value={this.state.modalDiscountPrice}
                    style={styles.textmodal} />
                   <TextInput
                    placeholder="توضیحات"
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => this.setState({ modalDescriptionPrice:text})}
                    value={this.state.modalDescriptionPrice}
                    style={styles.textmodal} />
                  <TouchableOpacity onPress={this._incPrice} >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        paddingTop:5, 
                        backgroundColor: "gray",
                        height:40, width: 80,
                        borderRadius: 20, textAlign: "center",fontFamily:"BYekan+"
                      }}>ثبت</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>
            <Text>ناموجود</Text>
            <FlatList showsHorizontalScrollIndicator={false} style={{ marginTop: 20, }}
              data={this.state.resellers} renderItem={({ item }) => {
                return (
                   <View style={{
                    backgroundColor: "#f0e5e7", width: 320
                    , marginBottom: 10, flexDirection: "column", borderRadius: 6, marginRight: 10, marginLeft: 10,
                  }}>
                   
                  {(this.state.isSeller||(item.price!=null&&item.price.originalPrice!=null&&item.price.originalPrice!=0))&&(
                    <TouchableOpacity onPress={()=>this._AddCartScreen(item.resellerName,item.price.originalPrice,item.price.payPrice,item.id)}>
                      
                      <View style={{ flexDirection: "row-reverse", justifyContent: "space-around"}}>
                        <Text style={{ fontSize: 23,fontFamily:"BYekan+"  }}>فروشنده: </Text>
                        <Text style={{ fontSize: 20,fontFamily:"BYekan+" }}> {item.resellerName}</Text>
                      </View>
                      <View style={{ flexDirection: "row-reverse", justifyContent: "space-around",marginTop:5 }}>
                        <Text style={{ fontSize: 20,fontFamily:"BYekan+" }}>قیمت: </Text>
                        <Text style={{ fontSize: 20,  color: 'red',fontFamily:"BYekan+" }}> {item.price.originalPrice}</Text>
                      </View>
                      <View style={{ flexDirection: "row-reverse", justifyContent: "space-around" }}>
                        <Text style={{ fontSize: 20,fontFamily:"BYekan+" }}>با تخفیف: </Text>
                        <Text style={{ fontSize: 20,  color: 'green',fontFamily:"BYekan+" }}> {item.price.payPrice}</Text>
                      </View>
                      <View style={{ flexDirection: "row-reverse", justifyContent: "space-around" }}>
                        <Text style={{ fontSize: 20,fontFamily:"BYekan+" }}>توضیحات: </Text>
                        <Text style={{ fontSize: 20,fontFamily:"BYekan+" }}> {item.price.description}</Text>
                      </View>
                      <View style={{flexDirection:"row",justifyContent:"center",marginBottom:15}}>
                      {(this.state.user!=null)&&(this.state.user.id === item.id)&&(<TouchableOpacity onPress={this._delete} >
                        <Text style={styles.textdelete}>حذف </Text>
                      </TouchableOpacity>)}
                      </View>
                    </TouchableOpacity>
                  )}
                  
                  </View>)
              }}
              keyExtractor={(item, index) => "key" + index} />
          </View>
        </ScrollView>
      </View>
    )
  }
 

  _AddCartScreen = async (resName,originalPrice,payPrice,resId)=>{
    
    if (this.state.isSeller) {
      alert("به عنوان فروشنده نمی توانید خرید کنید!")}
     
    else {
      await this._GetBasketStorage();
        let products=[];
        if(this.state.basketItems!=null)
          products=this.state.basketItems;

        let product =new Object();
        product.id=this.state.productId;
        product.picture=this.state.imageDetails[0];
        product.name=this.state.name;

        product.colorId=this.state.colorId;
        product.color=this.state.color;

        product.size=this.state.size;
        product.conut=this.state.count;
        product.resName=resName;
        product.originalPrice=originalPrice;
        product.payPrice=payPrice;
        product.resId=resId;
        // alert(JSON.stringify(product));
        products.push(product);
        
        this.setState({
          basketItems: products
        });
        // alert(JSON.stringify(this.state.basketItems));
        alert(`${product.name} به سبد خرید شما اضافه شد.`);
        await AsyncStorage.setItem(this.state.basketName,JSON.stringify(this.state.basketItems));
        
        // products=[]
        
       } 
  }
  _delete= ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
     "ProductId":this.state.productId,
     "ShopUserId":this.state.user.id,});
    
     var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
     };

fetch(global.ServerUri+"api/v1/products/remove-price", requestOptions)
  .then(response => response.json())
  .then((responseJson) => {
    if(responseJson.isSuccess){
      this._fechDetail();
    }
  })
  .catch(error => console.log('error', error));
  }

  _incPrice = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "ProductId":this.state.productId,
      "ShopUserId":this.state.user.id,
      "Price":this.state.modaloriginalPrice,
      "Discount":this.state.modalDiscountPrice,
      "description":this.state.modalDescriptionPrice,

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
    fontSize: 25,
    color: "black",
    marginLeft: 310,
    marginTop: 20,

  },
  icons2: {
    fontSize: 29,
    color: "red",
    marginLeft: 30,
    marginTop: 20,

  },
  textmodal:{
    height: 50,
    fontSize: 20,
    width: 200, 
    padding: 7,
    // type: 'number',
    backgroundColor: 'transparent',
    textAlign: "center", 
    marginBottom: 15,
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    fontFamily:"BYekan+"

  },
  textdelete:{
    color: "black",
    fontSize: 20, 
    padding: 10,
    backgroundColor: "#f3d2e3",
    height: 40, 
    width: 200,
    marginTop:10,
    marginLeft:10,
    borderRadius: 15,
    fontFamily:"BYekan+", 
    textAlign: "center"

  }

});
export default DetailsScreen;